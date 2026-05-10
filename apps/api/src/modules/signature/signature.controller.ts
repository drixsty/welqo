import { Controller, Post, Body, Headers, Logger, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PrismaService } from '../../common/prisma/prisma.service';
import { StorageService } from '../storage/storage.service';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@ApiTags('Signature Webhooks')
@Controller('webhooks/signature')
export class SignatureController {
  private readonly logger = new Logger(SignatureController.name);

  constructor(
    private prisma: PrismaService,
    private storage: StorageService,
    private config: ConfigService,
  ) {}

  @Post('yousign')
  @ApiOperation({ summary: 'Webhook endpoint for Yousign events' })
  async handleYousignWebhook(
    @Body() body: any,
    @Headers('x-yousign-signature') signature: string,
  ) {
    this.logger.log(`Received Yousign Webhook: ${body.event_name}`);

    // TODO: Verify signature using YOUSIGN_WEBHOOK_SECRET

    if (body.event_name === 'signature_request.done') {
      const requestId = body.data.id;
      
      const mandate = await this.prisma.mandate.findUnique({
        where: { signatureId: requestId },
      });

      if (!mandate) {
        this.logger.warn(`No mandate found for signature request ${requestId}`);
        return { status: 'ignored' };
      }

      // 1. Download signed document from Yousign
      try {
        const apiKey = this.config.get('YOUSIGN_API_KEY');
        const baseUrl = this.config.get('YOUSIGN_BASE_URL');
        
        // In Yousign v3, the signed document can be retrieved from the documents list
        const docRes = await axios.get(`${baseUrl}/signature_requests/${requestId}/documents`, {
          headers: { Authorization: `Bearer ${apiKey}` },
        });
        
        const docId = docRes.data[0].id; // Assuming first document
        
        const downloadRes = await axios.get(`${baseUrl}/signature_requests/${requestId}/documents/${docId}/download`, {
          headers: { Authorization: `Bearer ${apiKey}` },
          responseType: 'arraybuffer',
        });

        // 2. Upload signed version to MinIO
        const signedPath = mandate.pdfPath.replace('.txt', '_signed.pdf'); // Adapt extension if needed
        await this.storage.uploadFile('private-docs', signedPath, Buffer.from(downloadRes.data), {
          'Content-Type': 'application/pdf',
          'Status': 'SIGNED',
        });

        // 3. Update Mandate status
        await this.prisma.mandate.update({
          where: { id: mandate.id },
          data: {
            status: 'SIGNED',
            pdfPath: signedPath,
            signedAt: new Date(),
          },
        });

        this.logger.log(`Mandate ${mandate.id} successfully marked as SIGNED`);
      } catch (err) {
        this.logger.error(`Error processing signed document for request ${requestId}:`, err.message);
        throw new BadRequestException('Error processing signed document');
      }
    }

    return { status: 'ok' };
  }
}
