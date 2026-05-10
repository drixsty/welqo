import { Module } from "@nestjs/common";
import { BookingService } from "./application/booking.service";
import { BookingController } from "./infrastructure/controllers/booking.controller";
import { PrismaModule } from "../../common/prisma/prisma.module";
import { ChatAutomationModule } from "../chat-automation/chat-automation.module";
import { EmailModule } from "../email/email.module";
import { CalendarController } from './infrastructure/controllers/calendar/calendar.controller';

@Module({
  imports: [PrismaModule, ChatAutomationModule, EmailModule],
  controllers: [BookingController, CalendarController],
  providers: [BookingService],
  exports: [BookingService],
})
export class BookingModule {}
