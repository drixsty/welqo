import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { BrevoClient } from "@getbrevo/brevo";
import { bookingConfirmationHtml } from "./templates/booking-confirmation";

export interface BookingConfirmationContext {
  to: string;
  guestFirstName: string;
  guestLastName: string;
  bookingId: string;
  propertyNameFr: string;
  checkIn: Date;
  checkOut: Date;
  nightsCount: number;
  totalAmount: number;
  cancellationToken: string | null;
}

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private brevo: BrevoClient | null = null;
  private readonly fromEmail: string;
  private readonly fromName: string;
  private readonly siteUrl: string;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>("BREVO_API_KEY");
    this.fromEmail =
      this.configService.get<string>("BREVO_SENDER_EMAIL") ?? "noreply@welqo.fr";
    this.fromName =
      this.configService.get<string>("BREVO_SENDER_NAME") ?? "Welqo";
    this.siteUrl =
      this.configService.get<string>("NEXT_PUBLIC_SITE_URL") ??
      "https://welqo.fr";

    if (apiKey) {
      this.brevo = new BrevoClient({ apiKey });
      this.logger.log("Email service initialized with Brevo");
    } else {
      this.logger.warn(
        "BREVO_API_KEY not set — emails will be logged to console only",
      );
    }
  }

  private async send(to: string, subject: string, html: string): Promise<void> {
    if (!this.brevo) {
      this.logger.log(`[EMAIL MOCK] To: ${to} | Subject: ${subject}`);
      return;
    }
    try {
      await this.brevo.transactionalEmails.sendTransacEmail({
        sender: { email: this.fromEmail, name: this.fromName },
        to: [{ email: to }],
        subject,
        htmlContent: html,
      });
      this.logger.log(`Email sent → ${to}`);
    } catch (err: any) {
      this.logger.error(`Failed to send email to ${to}: ${err.message}`);
    }
  }

  async addGuestToBrevo(params: {
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    bookingId: string;
  }): Promise<void> {
    if (!this.brevo) return;

    const listId = parseInt(
      this.configService.get<string>("BREVO_LIST_GUESTS") ?? "3",
    );

    try {
      await this.brevo.contacts.createContact({
        email: params.email,
        listIds: [listId],
        updateEnabled: true,
        attributes: {
          PRENOM: params.firstName,
          NOM: params.lastName,
          ...(params.phone ? { TELEPHONE: params.phone } : {}),
          BOOKING_ID: params.bookingId,
          SOURCE: "booking_api",
        },
      });
    } catch (err: any) {
      // Non-bloquant — ne pas faire échouer la réservation
      this.logger.warn(`Brevo contact sync failed: ${err.message}`);
    }
  }

  async sendBookingConfirmation(
    ctx: BookingConfirmationContext,
  ): Promise<void> {
    const fmt = (d: Date) =>
      new Date(d).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });

    const cancellationUrl = ctx.cancellationToken
      ? `${this.siteUrl}/reservation/annuler?token=${ctx.cancellationToken}`
      : null;

    await Promise.allSettled([
      this.send(
        ctx.to,
        `Confirmation de séjour — ${ctx.propertyNameFr}`,
        bookingConfirmationHtml(ctx, fmt, cancellationUrl),
      ),
      this.addGuestToBrevo({
        email: ctx.to,
        firstName: ctx.guestFirstName,
        lastName: ctx.guestLastName,
        bookingId: ctx.bookingId,
      }),
    ]);
  }
}

