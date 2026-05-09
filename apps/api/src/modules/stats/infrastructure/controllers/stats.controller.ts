import { Controller, Get, UseGuards, Req, Version } from "@nestjs/common";
import { StatsService } from "../../application/stats.service";
import { JwtAuthGuard } from "../../../auth/guards/jwt-auth.guard";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";

@ApiTags("Stats")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("stats")
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get("overview")
  @Version("1")
  @ApiOperation({ summary: "Get dashboard overview for the logged-in owner" })
  async getOverview(@Req() req: any) {
    return this.statsService.getOverview(req.user.id);
  }

  @Get("bookings")
  @Version("1")
  @ApiOperation({ summary: "Get full bookings history with payments for the logged-in owner" })
  async getBookingsHistory(@Req() req: any) {
    return this.statsService.getBookingsHistory(req.user.id);
  }

  @Get("calendar")
  @Version("1")
  @ApiOperation({ summary: "Get calendar events for the logged-in owner" })
  async getCalendar(@Req() req: any) {
    return this.statsService.getCalendarEvents(req.user.id);
  }
}
