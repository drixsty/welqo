import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { StorageService } from '../storage/storage.service';
import { SignatureService } from '../signature/signature.service';
import { MandateStatus } from '@prisma/client';

@Injectable()
export class OwnerService {

  constructor(
    private prisma: PrismaService,
    private storage: StorageService,
    private signature: SignatureService,
  ) {}

  async getMandates(ownerId: string) {
    return this.prisma.mandate.findMany({
      where: { ownerId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async initiateMandate(ownerId: string) {
    const owner = await this.prisma.owner.findUnique({ where: { id: ownerId } });
    if (!owner) throw new NotFoundException('Owner not found');

    // 1. Create mandate in DB
    const mandate = await this.prisma.mandate.create({
      data: {
        ownerId,
        status: MandateStatus.DRAFT,
      },
    });

    // 2. Generate/Prepare PDF (Mocked: we just use a placeholder text)
    const mockPdfContent = `MANDAT DE GESTION WELQO\n\nPropriétaire: ${owner.firstName} ${owner.lastName}\nEmail: ${owner.email}\nDate: ${new Date().toLocaleDateString()}`;
    const fileName = `mandates/${ownerId}/${mandate.id}.txt`; // Using .txt for simplicity in mock

    // 3. Upload to MinIO
    await this.storage.uploadFile('private-docs', fileName, mockPdfContent, {
      'Content-Type': 'text/plain',
      'Owner-Id': ownerId,
    });

    // 4. Create Signature Request
    const sigRequest = await this.signature.createSignatureRequest(
      owner.email,
      fileName,
      `${owner.firstName} ${owner.lastName}`,
    );

    // 5. Update Mandate
    return this.prisma.mandate.update({
      where: { id: mandate.id },
      data: {
        status: MandateStatus.PENDING_SIGNATURE,
        pdfPath: fileName,
        signatureId: sigRequest.id,
      },
    });
  }
}
