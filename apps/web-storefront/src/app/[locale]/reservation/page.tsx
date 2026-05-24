import React from "react";
import { getQuote } from "../../../lib/api";
import { ReservationTunnel } from "../../../components/ReservationTunnel";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Réservation | Welqo",
  description: "Réservez votre séjour en Hauts-de-France avec Welqo.",
};

interface ReservationPageProps {
  params: { locale: string };
  searchParams: {
    propertyId?: string;
    checkIn?: string;
    checkOut?: string;
    guests?: string;
  };
}

export default async function ReservationPage({
  params: { locale },
  searchParams,
}: ReservationPageProps) {
  redirect(locale === "fr" ? "/" : "/en");

  const { propertyId, checkIn, checkOut, guests } = searchParams;

  if (!propertyId || !checkIn || !checkOut || !guests) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Informations manquantes</h1>
          <p className="text-slate-500">
            Veuillez sélectionner vos dates depuis la page du logement.
          </p>
        </div>
      </div>
    );
  }

  try {
    const quote = await getQuote({
      propertyId,
      checkIn,
      checkOut,
      guests: parseInt(guests),
    });

    return (
      <main className="min-h-screen bg-white dark:bg-slate-950 pt-16">
        <ReservationTunnel quote={quote} locale={locale} />
      </main>
    );
  } catch (err) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            Erreur lors du calcul du devis
          </h1>
          <p className="text-slate-500">
            Une erreur est survenue. Veuillez réessayer plus tard.
          </p>
        </div>
      </div>
    );
  }
}
