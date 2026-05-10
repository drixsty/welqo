import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { BookingService } from "../../../application/booking.service";
import { JwtAuthGuard } from "../../../../auth/guards/jwt-auth.guard";

@Controller("calendar")
@UseGuards(JwtAuthGuard)
export class CalendarController {
  constructor(private readonly bookingService: BookingService) {}

  @Get("bookings")
  async getBookings(
    @Query("start") start: string,
    @Query("end") end: string,
  ) {
    return this.bookingService.getCalendarBookings(start, end);
  }
}
