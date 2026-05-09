import {
  Controller,
  Post,
  Body,
  Req,
  Headers,
  BadRequestException,
} from "@nestjs/common";
import { BookingService } from "../../application/booking.service";
import { CreateCheckoutDto } from "../../application/dto/create-checkout.dto";
import { CancelBookingDto } from "../../application/dto/cancel-booking.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("Bookings")
@Controller("bookings")
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post("checkout")
  @ApiOperation({ summary: "Create a Stripe Checkout session" })
  @ApiResponse({ status: 201, description: "Session created" })
  async createCheckout(@Body() dto: CreateCheckoutDto) {
    return this.bookingService.createCheckoutSession(dto);
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
