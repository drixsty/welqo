import {
  Controller,
  Post,
  Body,
  Req,
  Headers,
  BadRequestException,
  Get,
  Query,
} from "@nestjs/common";
import { BookingService } from "../../application/booking.service";
import { CreateBookingDto, CancelBookingDto } from "@welqo/types";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("Bookings")
@Controller("bookings")
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post("checkout")
  @ApiOperation({ summary: "Create a Stripe Checkout session" })
  @ApiResponse({ status: 201, description: "Session created" })
  async createCheckout(
    @Body() dto: CreateBookingDto & { nightsCount: number },
  ) {
    return this.bookingService.createCheckoutSession(dto);
  }

  @Get("availability")
  async checkAvailability(
    @Query("propertyId") propertyId: string,
    @Query("checkIn") checkIn: string,
    @Query("checkOut") checkOut: string,
  ) {
    const available = await this.bookingService.isAvailable(
      propertyId,
      new Date(checkIn),
      new Date(checkOut),
    );
    return { available };
  }

  @Get("quote")
  async getQuote(
    @Query("propertyId") propertyId: string,
    @Query("checkIn") checkIn: string,
    @Query("checkOut") checkOut: string,
    @Query("guests") guests: number,
  ) {
    return this.bookingService.calculateQuote(
      propertyId,
      checkIn,
      checkOut,
      Number(guests),
    );
  }

  @Get("confirmation")
  @ApiOperation({ summary: "Get public booking info by Stripe session ID" })
  async getConfirmation(@Query("session_id") sessionId: string) {
    if (!sessionId) throw new BadRequestException("session_id is required");
    return this.bookingService.getBookingBySessionId(sessionId);
  }

  @Post("cancel")
  @ApiOperation({ summary: "Cancel a booking via cancellation token (public)" })
  @ApiResponse({ status: 200, description: "Booking cancelled" })
  async cancelBooking(@Body() dto: CancelBookingDto) {
    return this.bookingService.cancelByToken(dto.cancellationToken);
  }

  @Post("webhook/stripe")
  @ApiOperation({ summary: "Handle Stripe webhooks" })
  async stripeWebhook(
    @Req() req: any,
    @Headers("stripe-signature") signature: string,
  ) {
    if (!signature) {
      throw new BadRequestException("Missing stripe-signature header");
    }
    // Stripe webhooks require the raw body
    return this.bookingService.handleStripeWebhook(req.rawBody, signature);
  }
}
