import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { BookingService } from "./application/booking.service";
import { ConfirmBookingUseCase } from "./application/ConfirmBookingUseCase";
import { BookingController } from "./infrastructure/controllers/booking.controller";
import { CalendarController } from "./infrastructure/controllers/calendar/calendar.controller";
import { PrismaBookingRepository } from "./infrastructure/PrismaBookingRepository";
import { PrismaModule } from "../../common/prisma/prisma.module";
import { ChatAutomationModule } from "../chat-automation/chat-automation.module";
import { EmailModule } from "../email/email.module";
import { Beds24Client } from "@welqo/beds24-client";
import { BOOKING_REPOSITORY } from "./booking.tokens";

@Module({
  imports: [PrismaModule, ChatAutomationModule, EmailModule, ConfigModule],
  controllers: [BookingController, CalendarController],
  providers: [
    {
      provide: BOOKING_REPOSITORY,
      useClass: PrismaBookingRepository,
    },
    {
      provide: Beds24Client,
      useFactory: (config: ConfigService) =>
        new Beds24Client(config.get<string>("BEDS24_API_KEY") || ""),
      inject: [ConfigService],
    },
    ConfirmBookingUseCase,
    BookingService,
  ],
  exports: [BookingService],
})
export class BookingModule {}
