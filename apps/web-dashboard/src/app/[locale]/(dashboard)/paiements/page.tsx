"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Download,
  Euro,
  TrendingUp,
  CalendarCheck,
  User,
  MapPin,
  CalendarDays,
  ChevronRight,
} from "lucide-react";
import { format, parseISO, differenceInDays } from "date-fns";
import { fr } from "date-fns/locale";
import { fetchApi } from "../../../../lib/api";
import { useAuthGuard } from "../../../../lib/useAuthGuard";
import { PageWrapper } from "../../../../components/PageWrapper";
import { DetailPanel } from "../../../../components/DetailPanel";
import { Button } from "@welqo/ui";

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
  property: { titleFr: string };
}

const STATUS_LABELS: Record<string, { label: string; cls: string }> = {
  CONFIRMED: {
    label: "Confirmé",
    cls: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  },
  COMPLETED: {
    label: "Terminé",
    cls: "bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700",
  },
  CANCELLED: {
    label: "Annulé",
    cls: "bg-rose-500/10 text-rose-600 border-rose-500/20",
  },
};

function exportCsv(rows: BookingRow[]) {
  const headers = [
    "Logement",
    "Voyageur",
    "Arrivée",
    "Départ",
    "Total TTC (€)",
    "Commission (€)",
    "Net (€)",
    "Statut",
  ];
  const lines = rows.map((r) =>
    [
      `"${r.property.titleFr}"`,
      `"${r.guestFirstName} ${r.guestLastName}"`,
      r.checkIn.slice(0, 10),
      r.checkOut.slice(0, 10),
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
}

export default function PaiementsPage() {
  useAuthGuard();
  const [rows, setRows] = useState<BookingRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<BookingRow | null>(null);

  useEffect(() => {
    fetchApi<BookingRow[]>("/stats/bookings")
      .then(setRows)
      .finally(() => setLoading(false));
  }, []);

  const active = rows.filter((r) => r.status !== "CANCELLED");
  const totalNet = active.reduce((s, r) => s + r.totalAmountNet, 0);
  const totalGross = active.reduce((s, r) => s + r.totalAmountGross, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const kpis = [
    { label: "Volume d'affaires", value: `${totalGross.toLocaleString("fr-FR")}€`, icon: Euro },
    {
      label: "Net propriétaire",
      value: `${totalNet.toLocaleString("fr-FR")}€`,
      icon: TrendingUp,
      primary: true,
    },
    { label: "Transactions actives", value: active.length, icon: CalendarCheck },
  ];

  const sc = selected ? (STATUS_LABELS[selected.status] ?? STATUS_LABELS.CONFIRMED) : null;
  const nights = selected
    ? differenceInDays(parseISO(selected.checkOut), parseISO(selected.checkIn))
    : 0;

  return (
    <PageWrapper>
      <div className="max-w-6xl mx-auto space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-semibold text-slate-900 dark:text-white tracking-tight">
              Mes transactions
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Suivi financier de vos revenus propriétaires
            </p>
          </div>
          <Button
            onClick={() => exportCsv(rows)}
            disabled={rows.length === 0}
            variant="outline"
            size="md"
            icon={Download}
            iconPosition="right"
          >
            Exporter CSV
          </Button>
        </div>
        <div className="h-px bg-slate-100 dark:bg-slate-800/60" />

        {/* KPI strip */}
        <div className="grid grid-cols-3 gap-3">
          {kpis.map((k, i) => (
            <motion.div
              key={k.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-1.5 rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                  <k.icon
                    className={`w-3.5 h-3.5 ${"primary" in k && k.primary ? "text-primary" : "text-slate-400"}`}
                  />
                </div>
              </div>
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-0.5">
                {k.label}
              </p>
              <p className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                {k.value}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Table */}
        {rows.length === 0 ? (
          <div className="flex items-center justify-center py-14 rounded-lg border border-dashed border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-400 font-medium">
            Aucune transaction enregistrée pour le moment
          </div>
        ) : (
          <div className="rounded-lg border border-slate-100 dark:border-slate-800 overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
                  {["Voyageur", "Logement", "Séjour", "Total TTC", "Net", "Statut", ""].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-slate-400"
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                {rows.map((row, i) => {
                  const s = STATUS_LABELS[row.status] ?? STATUS_LABELS.CONFIRMED;
                  const isActive = selected?.id === row.id;
                  return (
                    <motion.tr
                      key={row.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.015 }}
                      onClick={() => setSelected(isActive ? null : row)}
                      className={[
                        "group cursor-pointer transition-colors",
                        isActive
                          ? "bg-primary/[0.04] dark:bg-primary/[0.08]"
                          : "bg-white dark:bg-slate-900 hover:bg-primary/[0.025] dark:hover:bg-primary/[0.05]",
                      ].join(" ")}
                    >
                      <td className="px-4 py-3 relative">
                        {/* Left accent bar */}
                        <span
                          className={[
                            "absolute left-0 inset-y-[8px] w-[2.5px] rounded-r-full transition-all duration-200",
                            isActive
                              ? "bg-primary scale-y-100"
                              : "bg-primary/50 scale-y-0 group-hover:scale-y-100 origin-center",
                          ].join(" ")}
                        />
                        <p className="font-semibold text-slate-900 dark:text-white">
                          {row.guestFirstName} {row.guestLastName}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{row.guestEmail}</p>
                      </td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400 font-medium max-w-[160px] truncate">
                        {row.property.titleFr}
                      </td>
                      <td className="px-4 py-3 text-slate-500 dark:text-slate-400 whitespace-nowrap">
                        {new Date(row.checkIn).toLocaleDateString("fr-FR", {
                          day: "2-digit",
                          month: "short",
                        })}{" "}
                        →{" "}
                        {new Date(row.checkOut).toLocaleDateString("fr-FR", {
                          day: "2-digit",
                          month: "short",
                        })}
                      </td>
                      <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">
                        {row.totalAmountGross.toFixed(2)}€
                      </td>
                      <td className="px-4 py-3 font-bold text-primary">
                        {row.totalAmountNet.toFixed(2)}€
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${s.cls}`}>
                          {s.label}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <ChevronRight
                          className={`w-3.5 h-3.5 transition-colors ${isActive ? "text-primary" : "text-slate-300 group-hover:text-primary/50"}`}
                        />
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail panel */}
      <DetailPanel
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title={selected ? `${selected.guestFirstName} ${selected.guestLastName}` : ""}
        subtitle={selected?.property.titleFr}
        footer={
          selected && (
            <Button variant="outline" size="md" className="w-full" icon={Download} iconPosition="right"
              onClick={() => exportCsv([selected])}>
              Exporter cette transaction
            </Button>
          )
        }
      >
        {selected && sc && (
          <div className="p-5 space-y-5">
            {/* Status */}
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${sc.cls}`}>
              {sc.label}
            </span>

            {/* Guest card */}
            <div className="flex items-center gap-3 p-3.5 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-100 dark:border-slate-800">
              <div className="w-9 h-9 bg-primary/10 border border-primary/20 text-primary rounded-md flex items-center justify-center font-bold text-sm shrink-0">
                {selected.guestFirstName[0]}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                  {selected.guestFirstName} {selected.guestLastName}
                </p>
                <p className="text-[11px] text-slate-400 truncate">{selected.guestEmail}</p>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-[10px] font-medium text-slate-400 mb-0.5">Logement</p>
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    {selected.property.titleFr}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CalendarDays className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-[10px] font-medium text-slate-400 mb-1">Séjour</p>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200">
                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">
                      {format(parseISO(selected.checkIn), "dd MMM", { locale: fr })}
                    </span>
                    <span className="text-slate-300">→</span>
                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">
                      {format(parseISO(selected.checkOut), "dd MMM", { locale: fr })}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">
                    {nights} nuit{nights > 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              {/* Financial breakdown */}
              <div className="flex items-start gap-3">
                <Euro className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="text-[10px] font-medium text-slate-400 mb-2">Détail financier</p>
                  <div className="space-y-1.5 p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-100 dark:border-slate-800">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-500">Total TTC</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {selected.totalAmountGross.toFixed(2)} €
                      </span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-500">Commission Welqo</span>
                      <span className="font-semibold text-slate-500">
                        − {selected.welqoCommission.toFixed(2)} €
                      </span>
                    </div>
                    <div className="h-px bg-slate-200 dark:bg-slate-700 my-1" />
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        Net propriétaire
                      </span>
                      <span className="font-bold text-primary">
                        {selected.totalAmountNet.toFixed(2)} €
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <User className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-[10px] font-medium text-slate-400 mb-0.5">Durée</p>
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    {selected.nightsCount} nuit{selected.nightsCount > 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            </div>

            {/* Reference */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              <p className="text-[10px] text-slate-400">
                Référence :{" "}
                <span className="font-mono font-semibold text-slate-600 dark:text-slate-400">
                  #{selected.id.slice(-8).toUpperCase()}
                </span>
              </p>
            </div>
          </div>
        )}
      </DetailPanel>
    </PageWrapper>
  );
}
