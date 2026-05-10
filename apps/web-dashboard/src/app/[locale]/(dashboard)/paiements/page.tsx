"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Download,
  AlertCircle,
  TrendingUp,
  Euro,
  CalendarCheck,
  ArrowLeft,
} from "lucide-react";
import { fetchApi } from "../../../../lib/api";
import { useAuthGuard } from "../../../../lib/useAuthGuard";

interface BookingRow {
  id: string;
  status: "CONFIRMED" | "COMPLETED" | "CANCELLED";
  guestFirstName: string;
  guestLastName: string;
  guestEmail: string;
  checkIn: string;
  checkOut: string;
  nightsCount: number;
  totalAmountGross: number;
  totalAmountNet: number;
  welqoCommission: number;
  confirmedAt: string | null;
  property: { titleFr: string };
  payment: {
    status: string;
    paidAt: string | null;
    stripePaymentIntentId: string | null;
  } | null;
}

const STATUS_LABELS: Record<string, { label: string; cls: string }> = {
  CONFIRMED: {
    label: "Confirmé",
    cls: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20",
  },
  COMPLETED: {
    label: "Terminé",
    cls: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700",
  },
  CANCELLED: {
    label: "Annulé",
    cls: "bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400 border-rose-100 dark:border-rose-900/50",
  },
};

function exportCsv(rows: BookingRow[]) {
  const headers = [
    "ID",
    "Logement",
    "Voyageur",
    "Email",
    "Arrivée",
    "Départ",
    "Nuits",
    "Total TTC (€)",
    "Commission Welqo (€)",
    "Net Propriétaire (€)",
    "Statut",
  ];
  const lines = rows.map((r) =>
    [
      r.id,
      `"${r.property.titleFr}"`,
      `"${r.guestFirstName} ${r.guestLastName}"`,
      r.guestEmail,
      r.checkIn.slice(0, 10),
      r.checkOut.slice(0, 10),
      r.nightsCount,
      r.totalAmountGross.toFixed(2),
      r.welqoCommission.toFixed(2),
      r.totalAmountNet.toFixed(2),
      r.status,
    ].join(","),
  );

  const csv = [headers.join(","), ...lines].join("\n");
  const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `welqo_paiements_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function PaiementsPage() {
  const router = useRouter();
  useAuthGuard();
  const [rows, setRows] = useState<BookingRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApi<BookingRow[]>("/stats/bookings")
      .then(setRows)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [router]);

  const totalNet = rows
    .filter((r) => r.status !== "CANCELLED")
    .reduce((s, r) => s + r.totalAmountNet, 0);
  const totalGross = rows
    .filter((r) => r.status !== "CANCELLED")
    .reduce((s, r) => s + r.totalAmountGross, 0);
  const confirmed = rows.filter(
    (r) => r.status === "CONFIRMED" || r.status === "COMPLETED",
  ).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-welqo-terracotta border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <div className="p-6 bg-red-50 dark:bg-red-950/30 rounded-3xl border border-red-100 dark:border-red-900 flex items-center gap-4 text-red-600 max-w-md">
          <AlertCircle className="w-8 h-8 shrink-0" />
          <p className="font-bold">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white text-[10px] font-bold uppercase tracking-widest mb-4 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Retour
          </button>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Historique financier
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {rows.length} réservation{rows.length !== 1 ? "s" : ""} au total
          </p>
        </div>
        <button
          onClick={() => exportCsv(rows)}
          disabled={rows.length === 0}
          className="flex items-center gap-3 px-6 py-3 bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 rounded-lg font-bold text-sm transition-all hover:bg-slate-800 dark:hover:bg-white disabled:opacity-40 shadow-sm"
        >
          <Download className="w-4 h-4" />
          Exporter CSV
        </button>
      </div>

      {/* KPI Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          {
            label: "Volume d'affaires",
            value: `${totalGross.toLocaleString("fr-FR", { maximumFractionDigits: 0 })} €`,
            icon: Euro,
            color: "text-slate-900 dark:text-white",
            bg: "bg-slate-100 dark:bg-slate-800",
          },
          {
            label: "Net propriétaire",
            value: `${totalNet.toLocaleString("fr-FR", { maximumFractionDigits: 0 })} €`,
            icon: TrendingUp,
            color: "text-welqo-terracotta",
            bg: "bg-welqo-terracotta/10",
          },
          {
            label: "Réservations actives",
            value: confirmed,
            icon: CalendarCheck,
            color: "text-slate-600 dark:text-slate-400",
            bg: "bg-slate-50 dark:bg-slate-800/50",
          },
        ].map((kpi) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800"
          >
            <div
              className={`w-10 h-10 ${kpi.bg} ${kpi.color} rounded-lg flex items-center justify-center mb-4`}
            >
              <kpi.icon className="w-5 h-5" />
            </div>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">
              {kpi.label}
            </p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              {kpi.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Table */}
      {rows.length === 0 ? (
        <div className="p-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 text-center">
          <p className="text-slate-400 font-medium">
            Aucune réservation enregistrée
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  {[
                    "Voyageur",
                    "Logement",
                    "Séjour",
                    "Total TTC",
                    "Commission",
                    "Net",
                    "Statut",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-6 py-5 text-left text-[11px] font-black uppercase tracking-widest text-slate-400"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {rows.map((row, i) => {
                  const s =
                    STATUS_LABELS[row.status] ?? STATUS_LABELS.CONFIRMED;
                  return (
                    <motion.tr
                      key={row.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <td className="px-6 py-5">
                        <p className="font-bold text-slate-900 dark:text-white">
                          {row.guestFirstName} {row.guestLastName}
                        </p>
                        <p className="text-slate-400 text-xs mt-0.5">
                          {row.guestEmail}
                        </p>
                      </td>
                      <td className="px-6 py-5 font-medium text-slate-700 dark:text-slate-300">
                        {row.property.titleFr}
                      </td>
                      <td className="px-6 py-5 text-slate-600 dark:text-slate-400 whitespace-nowrap">
                        {new Date(row.checkIn).toLocaleDateString("fr-FR", {
                          day: "2-digit",
                          month: "short",
                        })}
                        {" — "}
                        {new Date(row.checkOut).toLocaleDateString("fr-FR", {
                          day: "2-digit",
                          month: "short",
                        })}
                        <span className="text-slate-400 text-xs ml-1">
                          ({row.nightsCount}n)
                        </span>
                      </td>
                      <td className="px-6 py-5 font-black text-slate-900 dark:text-white">
                        {row.totalAmountGross.toFixed(2)} €
                      </td>
                      <td className="px-6 py-5 text-slate-500">
                        {row.welqoCommission.toFixed(2)} €
                      </td>
                      <td className="px-6 py-5 font-black text-emerald-600">
                        {row.totalAmountNet.toFixed(2)} €
                      </td>
                      <td className="px-6 py-5">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-bold border ${s.cls}`}
                        >
                          {s.label}
                        </span>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden divide-y divide-slate-100 dark:divide-slate-800">
            {rows.map((row) => {
              const s = STATUS_LABELS[row.status] ?? STATUS_LABELS.CONFIRMED;
              return (
                <div key={row.id} className="p-5 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-black text-slate-900 dark:text-white">
                        {row.guestFirstName} {row.guestLastName}
                      </p>
                      <p className="text-slate-500 text-sm">
                        {row.property.titleFr}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-black ${s.cls}`}
                    >
                      {s.label}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">
                      {new Date(row.checkIn).toLocaleDateString("fr-FR", {
                        day: "2-digit",
                        month: "short",
                      })}
                      {" — "}
                      {new Date(row.checkOut).toLocaleDateString("fr-FR", {
                        day: "2-digit",
                        month: "short",
                      })}
                    </span>
                    <div className="text-right">
                      <p className="font-black text-slate-900 dark:text-white">
                        {row.totalAmountGross.toFixed(2)} €
                      </p>
                      <p className="text-emerald-600 text-xs font-bold">
                        Net : {row.totalAmountNet.toFixed(2)} €
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
