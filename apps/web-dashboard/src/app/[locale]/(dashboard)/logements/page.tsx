"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Home,
  MapPin,
  Users,
  AlertCircle,
  ExternalLink,
  BedDouble,
} from "lucide-react";
import { fetchApi } from "../../../../lib/api";
import { useAuthGuard } from "../../../../lib/useAuthGuard";
import { Button } from "@welqo/ui";
import { PageWrapper } from "../../../../components/PageWrapper";

interface Property {
  id: string;
  slug: string;
  titleFr: string;
  city: string;
  country: string;
  maxGuests: number;
  bedrooms: number;
  basePricePerNight: number;
  status: "ACTIVE" | "INACTIVE" | "MAINTENANCE";
  photos: { url: string; isCover: boolean }[];
}

const STATUS_LABELS: Record<string, { label: string; cls: string }> = {
  ACTIVE: {
    label: "Actif",
    cls: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  },
  INACTIVE: {
    label: "Inactif",
    cls: "bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700",
  },
  MAINTENANCE: {
    label: "Maintenance",
    cls: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  },
};

export default function LogementsPage() {
  const { locale } = useAuthGuard();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApi<Property[]>("/owner/properties")
      .then(setProperties)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <PageWrapper>
      <div className="max-w-6xl mx-auto space-y-5">
        {/* Header */}
        <div>
          <h1 className="text-xl font-semibold text-slate-900 dark:text-white tracking-tight">
            Mes logements
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {properties.length} bien{properties.length !== 1 ? "s" : ""} sous
            gestion Welqo
          </p>
        </div>
        <div className="h-px bg-slate-100 dark:bg-slate-800/60" />

        {error && (
          <div className="flex items-center gap-3 px-4 py-3 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-100 dark:border-red-900 text-red-600 text-xs font-medium">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        {!error && properties.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 rounded-lg border border-dashed border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center">
            <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-lg flex items-center justify-center mb-4 border border-slate-200 dark:border-slate-700">
              <Home className="w-5 h-5" />
            </div>
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">
              Aucun logement configuré
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs">
              Contactez votre city manager Welqo pour ajouter vos biens à la
              plateforme.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {properties.map((p, i) => {
            const cover =
              p.photos?.find((ph) => ph.isCover)?.url ?? p.photos?.[0]?.url;
            const status = STATUS_LABELS[p.status] ?? STATUS_LABELS.INACTIVE;
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg overflow-hidden group">
                  {/* Image */}
                  <div className="relative h-44 bg-slate-100 dark:bg-slate-950 overflow-hidden">
                    {cover ? (
                      <img
                        src={cover}
                        alt={p.titleFr}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-slate-300">
                        <Home className="w-10 h-10" />
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <span
                        className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border shadow-sm ${status.cls}`}
                      >
                        {status.label}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-0.5 line-clamp-1">
                      {p.titleFr}
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mb-4">
                      <MapPin className="w-3 h-3 text-primary" /> {p.city},
                      France
                    </p>

                    <div className="flex items-center gap-4 text-[11px] text-slate-500 dark:text-slate-400 mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                      <span className="flex items-center gap-1.5 font-medium">
                        <Users className="w-3.5 h-3.5" /> {p.maxGuests} pers.
                      </span>
                      <span className="flex items-center gap-1.5 font-medium">
                        <BedDouble className="w-3.5 h-3.5" /> {p.bedrooms} ch.
                      </span>
                      <span className="ml-auto text-base font-bold text-slate-900 dark:text-white">
                        {p.basePricePerNight}€
                        <span className="text-[10px] text-slate-400 font-medium ml-0.5">
                          /nuit
                        </span>
                      </span>
                    </div>

                    <Button
                      href={`/${locale}/logements/${p.slug}`}
                      variant="secondary"
                      size="md"
                      className="w-full"
                      icon={ExternalLink}
                      iconPosition="right"
                    >
                      Voir le bien
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </PageWrapper>
  );
}
