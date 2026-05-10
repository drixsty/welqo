import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { PrismaService } from "../../common/prisma/prisma.service";
import { MessageTrigger } from "@prisma/client";
import { addDays } from "date-fns";

@Injectable()
export class ChatAutomationService {
  private readonly logger = new Logger(ChatAutomationService.name);

  constructor(private prisma: PrismaService) {}

  // ─── TEMPLATE MANAGEMENT ──────────────────────────────────────────────────

  async getTemplates() {
    return this.prisma.messageTemplate.findMany();
  }

  async createTemplate(data: any) {
    return this.prisma.messageTemplate.create({ data });
  }

  async updateTemplate(id: string, data: any) {
    return this.prisma.messageTemplate.update({ where: { id }, data });
  }

  // ─── AUTOMATION ENGINE ─────────────────────────────────────────────────────

  /**
   * Called when a booking is confirmed to schedule future messages
   */
  async scheduleAutomationForBooking(bookingId: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: { property: true },
    });

    if (!booking) return;

    const templates = await this.prisma.messageTemplate.findMany({
      where: { isEnabled: true },
    });

    for (const template of templates) {
      let scheduledFor: Date;

      switch (template.trigger) {
        case MessageTrigger.BOOKING_CONFIRMED:
          scheduledFor = new Date(); // Immediate or slightly delayed
          break;
        case MessageTrigger.BEFORE_CHECKIN:
          scheduledFor = addDays(booking.checkIn, -template.daysOffset);
          break;
        case MessageTrigger.AFTER_CHECKOUT:
          scheduledFor = addDays(booking.checkOut, template.daysOffset);
          break;
        default:
          continue;
      }

      await this.prisma.automationJob.create({
        data: {
          bookingId,
          templateId: template.id,
          scheduledFor,
          status: "PENDING",
        },
      });
    }
  }

  /**
   * Background processor: runs every minute to send scheduled messages
   */
  @Cron(CronExpression.EVERY_MINUTE)
  async processAutomationJobs() {
    const now = new Date();

    const jobs = await this.prisma.automationJob.findMany({
      where: {
        status: "PENDING",
        scheduledFor: { lte: now },
      },
      include: {
        template: true,
        booking: {
          include: { property: true },
        },
      },
      take: 10,
    });

    if (jobs.length === 0) return;

    this.logger.log(`Processing ${jobs.length} automation jobs`);

    for (const job of jobs) {
      try {
        await this.executeJob(job);
      } catch (err: any) {
        this.logger.error(`Failed to process job ${job.id}: ${err.message}`);
        await this.prisma.automationJob.update({
          where: { id: job.id },
          data: { status: "FAILED", errorMessage: err.message },
        });
      }
    }
  }

  private async executeJob(job: any) {
    const content = this.replaceVariables(job.template.content, job.booking);

    // 1. Create a message in the conversation
    // We assume the conversation exists (created at booking time)
    let conversation = await this.prisma.conversation.findUnique({
      where: { bookingId: job.booking.id },
    });

    if (!conversation) {
      // Create conversation if it doesn't exist
      conversation = await this.prisma.conversation.create({
        data: {
          bookingId: job.booking.id,
          propertyId: job.booking.propertyId,
          guestEmail: job.booking.guestEmail,
        },
      });
    }

    await this.prisma.message.create({
      data: {
        conversationId: conversation.id,
        senderType: "SYSTEM",
        content,
      },
    });

    // 2. Mark job as processed
    await this.prisma.automationJob.update({
      where: { id: job.id },
      data: {
        status: "OK",
        processedAt: new Date(),
      },
    });

    this.logger.log(`Job ${job.id} sent to ${job.booking.guestEmail}`);
  }

  private replaceVariables(content: string, booking: any): string {
    const variables: Record<string, string> = {
      guest_name: `${booking.guestFirstName} ${booking.guestLastName}`,
      property_name: booking.property.titleFr,
      check_in_date: booking.checkIn.toLocaleDateString("fr-FR"),
      check_out_date: booking.checkOut.toLocaleDateString("fr-FR"),
    };

    return content.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return variables[key] || match;
    });
  }
}
