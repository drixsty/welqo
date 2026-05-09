"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Home, MapPin, Users, Star, AlertCircle, ExternalLink } from "lucide-react";
import { fetchApi } from "../../../../lib/api";
import { useAuthGuard } from "../../../../lib/useAuthGuard";

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
  ACTIVE:      { label: "Actif",         cls: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
  INACTIVE:    { label: "Inactif",        cls: "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400" },
  MAINTENANCE: { label: "Maintenance",    cls: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
};

export default function LogementsPage() {
  const { locale } = useAuthGuard();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState<string | null>(null);

  useEffect(() => {
    fetchApi<Property[]>("/owner/properties")
      .then(setProperties)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Mes Logements
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            {properties.length} bien{properties.length !== 1 ? "s" : ""} géré{properties.length !== 1 ? "s" : ""} par Welqo
          </p>
        </div>
      </header>

      {error && (
        <div className="p-5 bg-red-50 dark:bg-red-950/30 rounded-2xl border border-red-100 dark:border-red-900 flex items-center gap-4 text-red-600">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p className="font-bold text-sm">{error}</p>
        </div>
      )}

      {!error && properties.length === 0 && (
        <div className="p-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 text-center">
          <div className="w-16 h-16 bg-blue-600/10 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Home className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white mb-2">
            Aucun logement configuré
          </h2>
          <p className="text-slate-400 font-medium text-sm">
            Contactez Welqo pour ajouter vos biens à la plateforme.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {properties.map((p, i) => {
          const cover  = p.photos?.find((ph) => ph.isCover)?.url ?? p.photos?.[0]?.url;
          const status = STATUS_LABELS[p.status] ?? STATUS_LABELS.INACTIVE;
          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl transition-all group"
            >
              {/* Image */}
              <div className="relative h-48 bg-slate-100 dark:bg-slate-800 overflow-hidden">
                {cover ? (
                  <img src={cover} alt={p.titleFr} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Home className="w-12 h-12 text-slate-300" />
                  </div>
                )}
                <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-black ${status.cls}`}>
                  {status.label}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-black text-slate-900 dark:text-white text-lg mb-1 line-clamp-1">{p.titleFr}</h3>
                <p className="text-slate-400 text-sm font-medium flex items-center gap-1 mb-4">
                  <MapPin className="w-3.5 h-3.5" /> {p.city}, {p.country}
                </p>

                <div className="flex items-center gap-4 text-sm text-slate-500 mb-6">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" /> {p.maxGuests} pers.
                  </span>
                  <span className="flex items-center gap-1">
                    <Home className="w-3.5 h-3.5" /> {p.bedrooms} ch.
                  </span>
                  <span className="ml-auto font-black text-slate-900 dark:text-white">
                    {p.basePricePerNight}€<span className="text-slate-400 font-medium">/nuit</span>
                  </span>
                </div>

                <a
                  href={`/${locale}/logements/${p.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-700 dark:text-slate-300 rounded-xl font-bold text-sm transition-all group/btn"
                >
                  Voir la fiche <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
