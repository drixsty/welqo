import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import FormData from 'form-data';
import { StorageService } from '../storage/storage.service';

export interface SignatureRequest {
  id: string;
  url: string;
  status: 'PENDING' | 'SIGNED' | 'CANCELLED';
}

@Injectable()
export class SignatureService {
  private readonly logger = new Logger(SignatureService.name);
  private client: AxiosInstance;

  constructor(
    private configService: ConfigService,
    private storageService: StorageService,
  ) {
    const apiKey = this.configService.get<string>('YOUSIGN_API_KEY');
    const baseUrl = this.configService.get<string>('YOUSIGN_BASE_URL', 'https://api-sandbox.yousign.app/v3');

    this.client = axios.create({
      baseURL: baseUrl,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });
  }

  async createSignatureRequest(
    ownerEmail: string,
    documentPath: string,
    ownerName: string = 'Propriétaire',
  ): Promise<SignatureRequest> {
    try {
      // 1. Create Signature Request
      const requestRes = await this.client.post('/signature_requests', {
        name: `Mandat de gestion Welqo - ${ownerName}`,
        delivery_mode: 'none', // We'll manage the link ourselves
        timezone: 'Europe/Paris',
      });
      const requestId = requestRes.data.id;

      // 2. Upload Document
      const fileBuffer = await this.storageService.getFileBuffer('private-docs', documentPath);
      const formData = new FormData();
      formData.append('file', fileBuffer, { filename: 'mandat.pdf', contentType: 'application/pdf' });
      formData.append('nature', 'signable_document');
      formData.append('parse_anchors', 'true'); // Allow using anchors like {{signer1.signature}}

      await this.client.post(`/signature_requests/${requestId}/documents`, formData, {
        headers: formData.getHeaders(),
      });

      // 3. Add Signer
      const signerRes = await this.client.post(`/signature_requests/${requestId}/signers`, {
        info: {
          first_name: ownerName.split(' ')[0] || 'Prénom',
          last_name: ownerName.split(' ')[1] || 'Nom',
          email: ownerEmail,
          locale: 'fr',
        },
        signature_authentication_mode: 'no_otp', // Simplest for MVP
        signature_label: 'Lu et approuvé',
      });

      // 4. Activate Signature Request
      await this.client.post(`/signature_requests/${requestId}/activate`);

      return {
        id: requestId,
        url: signerRes.data.signature_link,
        status: 'PENDING',
      };
    } catch (error: any) {
      this.logger.error('Error creating Yousign request:', error.response?.data || error.message || error);
      
      // Fallback to mock for development if API key is invalid
      if (this.configService.get('NODE_ENV') === 'development') {
        this.logger.warn('Falling back to MOCK signature for development');
        const mockId = `mock_${Math.random().toString(36).substring(7)}`;
        return {
          id: mockId,
          url: `https://mock-signature.welqo.fr/sign/${mockId}`,
          status: 'PENDING',
        };
      }
      throw error;
    }
  }

  async getSignatureStatus(signatureId: string): Promise<'PENDING' | 'SIGNED' | 'CANCELLED'> {
    try {
      if (signatureId.startsWith('mock_')) return 'PENDING';
      
      const res = await this.client.get(`/signature_requests/${signatureId}`);
      const status = res.data.status;

      if (status === 'done') return 'SIGNED';
      if (status === 'declined' || status === 'expired') return 'CANCELLED';
      return 'PENDING';
    } catch (error: any) {
      this.logger.error('Error getting Yousign status:', error.response?.data || error.message || error);
      return 'PENDING';
    }
  }
}
