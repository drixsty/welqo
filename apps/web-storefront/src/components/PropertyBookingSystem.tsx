"use client";

import React, { useState, useEffect } from "react";
import { BookingWidget } from "./BookingWidget";
import { MobileBookingBar } from "./MobileBookingBar";
import { ReservationTunnel } from "./ReservationTunnel";
import { Property, BookingQuote } from "@welqo/types";

interface PropertyBookingSystemProps {
  property: Property;
  basePrice: number;
  cleaningFee: number;
  touristTax: number;
  maxGuests: number;
  rating: number;
  reviewsCount: number;
  locale: string;
}

export const PropertyBookingSystem = ({
  property,
  basePrice,
  cleaningFee,
  touristTax,
  maxGuests,
  rating,
  reviewsCount,
  locale,
}: PropertyBookingSystemProps) => {
  const [isMobileBarVisible, setIsMobileBarVisible] = useState(false);
  const [showTunnel, setShowTunnel] = useState(false);
  const [selectedData, setSelectedData] = useState<{
    range: any;
    guests: number;
  } | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Show mobile bar when scrolled down 400px
      setIsMobileBarVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBook = (data: { range: any; guests: number }) => {
    setSelectedData(data);
    setShowTunnel(true);
  };

  // Mock quote for the tunnel (in real app, this comes from API based on selected dates)
  const mockQuote: BookingQuote = {
    propertyId: property.id,
    checkIn:
      selectedData?.range?.from?.toISOString() || new Date().toISOString(),
    checkOut:
      selectedData?.range?.to?.toISOString() || new Date().toISOString(),
    guests: selectedData?.guests || 1,
    nightsCount: 3,
    priceBreakdown: {
      nightlyRate: basePrice,
      totalNights: basePrice * 3,
      cleaningFee: cleaningFee,
      touristTax: touristTax * 3,
      totalGross: basePrice * 3 + cleaningFee + touristTax * 3,
    },
    securityDeposit: 500,
  };

  return (
    <>
      <BookingWidget
        propertyId={property.id}
        basePrice={basePrice}
        cleaningFee={cleaningFee}
        touristTax={touristTax}
        maxGuests={maxGuests}
        onBook={handleBook}
      />

      <MobileBookingBar
        price={basePrice}
        rating={rating}
        reviewsCount={reviewsCount}
        isVisible={isMobileBarVisible}
        onBook={() => setShowTunnel(true)}
      />

      {showTunnel && (
        <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
            onClick={() => setShowTunnel(false)}
          />
          <div className="relative w-full max-w-4xl max-h-[92vh] sm:max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-950 rounded-t-[2rem] sm:rounded-[2.5rem] shadow-2xl">
            <ReservationTunnel quote={mockQuote} locale={locale} />
            <button
              onClick={() => setShowTunnel(false)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
