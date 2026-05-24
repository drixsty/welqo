import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../common/prisma/prisma.service";

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async getConversations(ownerId: string) {
    const properties = await this.prisma.property.findMany({
      where: { ownerId },
      select: { id: true },
    });
    const propertyIds = properties.map((p) => p.id);

    return this.prisma.conversation.findMany({
      where: { propertyId: { in: propertyIds } },
      include: {
        property: { select: { titleFr: true } },
        booking: { select: { checkIn: true, checkOut: true, status: true } },
        messages: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
      orderBy: { lastMessageAt: "desc" },
    });
  }

  async getMessages(conversationId: string) {
    return this.prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: "asc" },
    });
  }

  async saveMessage(
    conversationId: string,
    content: string,
    senderType: "OWNER" | "GUEST" | "SYSTEM",
    senderId?: string,
  ) {
    const message = await this.prisma.message.create({
      data: {
        conversationId,
        content,
        senderType,
        senderId,
      },
    });

    await this.prisma.conversation.update({
      where: { id: conversationId },
      data: { lastMessageAt: new Date() },
    });

    return message;
  }

  async createConversation(
    propertyId: string,
    guestEmail: string,
    bookingId?: string,
  ) {
    return this.prisma.conversation.upsert({
      where: { bookingId: bookingId || "none" }, // Simple logic for demo
      update: {},
      create: {
        propertyId,
        guestEmail,
        bookingId,
      },
    });
  }
}
