import { Controller, Get, Post, Body, Param, Put, UseGuards } from "@nestjs/common";
import { ChatAutomationService } from "./chat-automation.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller("automation/templates")
@UseGuards(JwtAuthGuard)
export class ChatAutomationController {
  constructor(private readonly automationService: ChatAutomationService) {}

  @Get()
  async getTemplates() {
    return this.automationService.getTemplates();
  }

  @Post()
  async createTemplate(@Body() data: any) {
    return this.automationService.createTemplate(data);
  }

  @Put(":id")
  async updateTemplate(@Param("id") id: string, @Body() data: any) {
    return this.automationService.updateTemplate(id, data);
  }

  // Manual trigger for testing
  @Post("test/:bookingId")
  async testAutomation(@Param("bookingId") bookingId: string) {
    await this.automationService.scheduleAutomationForBooking(bookingId);
    return { message: "Automation scheduled for booking " + bookingId };
  }
}
