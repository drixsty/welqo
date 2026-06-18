export interface PropertyPricingData {
  basePricePerNight: number;
  cleaningFee: number;
  touristTax: number;
}

export interface BookingQuote {
  nightsCount: number;
  nightlyRate: number;
  totalNights: number;
  cleaningFee: number;
  touristTax: number;
  totalGross: number;
  welqoCommission: number;
  totalNet: number;
}

export class BookingPricingService {
  private static readonly COMMISSION_RATE = 0.2;

  static calculate(
    pricing: PropertyPricingData,
    nightsCount: number,
    guestCount: number,
  ): BookingQuote {
    if (nightsCount <= 0) throw new Error("nightsCount must be > 0");

    const totalNights = pricing.basePricePerNight * nightsCount;
    const touristTax = pricing.touristTax * nightsCount * guestCount;
    const totalGross = totalNights + pricing.cleaningFee + touristTax;
    const welqoCommission = totalNights * this.COMMISSION_RATE;
    const totalNet =
      totalNights * (1 - this.COMMISSION_RATE) +
      pricing.cleaningFee +
      touristTax;

    return {
      nightsCount,
      nightlyRate: pricing.basePricePerNight,
      totalNights,
      cleaningFee: pricing.cleaningFee,
      touristTax,
      totalGross,
      welqoCommission,
      totalNet,
    };
  }

  static nightsCount(checkIn: Date, checkOut: Date): number {
    return Math.ceil(
      (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24),
    );
  }
}
