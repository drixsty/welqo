import { Module } from "@nestjs/common";
import { BookingService } from "./application/booking.service";
import { BookingController } from "./infrastructure/controllers/booking.controller";
import { PrismaModule } from "../../common/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [BookingController],
  providers: [BookingService],
  exports: [BookingService],
})
export class BookingModule {}
