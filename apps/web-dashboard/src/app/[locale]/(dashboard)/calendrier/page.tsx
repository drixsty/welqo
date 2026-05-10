"use client";

import React, { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { fr } from "date-fns/locale";
import { eachDayOfInterval, parseISO } from "date-fns";
import { motion } from "framer-motion";
import {
  Calendar as CalendarIcon,
  Info,
  User,
  AlertCircle,
} from "lucide-react";
import { fetchApi } from "../../../../lib/api";
import { useAuthGuard } from "../../../../lib/useAuthGuard";

interface CalendarEvent {
  id: string;
  checkIn: string;
  checkOut: string;
  guestFirstName: string;
  guestLastName: string;
  property: { titleFr: string };
}

function expandToDays(events: CalendarEvent[]): Date[] {
  const days: Date[] = [];
  for (const ev of events) {
    try {
      const interval = eachDayOfInterval({
        start: parseISO(ev.checkIn),
        end: parseISO(ev.checkOut),
      });
      days.push(...interval);
    } catch {
      // invalid date — skip
    }
  }
  return days;
}

function getEventsForDay(events: CalendarEvent[], day: Date): CalendarEvent[] {
  const d = day.toISOString().slice(0, 10);
  return events.filter((ev) => {
    const start = ev.checkIn.slice(0, 10);
    const end = ev.checkOut.slice(0, 10);
    return d >= start && d <= end;
  });
}

export default function CalendarPage() {
  useAuthGuard();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [month, setMonth] = useState<Date>(new Date());
  const [selected, setSelected] = useState<Date | undefined>();

  useEffect(() => {
    fetchApi<CalendarEvent[]>("/stats/calendar")
      .then(setEvents)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const bookedDays = expandToDays(events);
  const selectedEvents = selected ? getEventsForDay(events, selected) : [];

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">
      <header>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
          Calendrier des Réservations
        </h1>
        <p className="text-slate-500 text-sm font-medium">
          Suivi en temps réel des flux de voyageurs et des disponibilités.
        </p>
      </header>

      {error && (
        <div className="mb-8 p-5 bg-red-50 dark:bg-red-950/30 rounded-2xl border border-red-100 dark:border-red-900 flex items-center gap-4 text-red-600">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p className="font-bold text-sm">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm"
          >
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="w-10 h-10 border-4 border-welqo-terracotta border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <>
                <style>{`
                  .rdp { --rdp-cell-size: 52px; --rdp-accent-color: #E67E22; --rdp-background-color: #fdf2e9; margin: 0; }
                  .rdp-day_selected { background-color: #2C3E50 !important; color: white !important; border-radius: 8px; }
                  .rdp-day_booked { background-color: #fdf2e9; color: #E67E22; font-weight: 800; border-radius: 8px; }
                  .dark .rdp-day_booked { background-color: rgba(230,126,34,0.15); color: #E67E22; }
                  .rdp-button:hover:not([disabled]):not(.rdp-day_selected) { background-color: #f8fafc; border-radius: 8px; }
                  .rdp-head_cell { font-weight: 800; text-transform: uppercase; font-size: 0.7rem; color: #94a3b8; padding-bottom: 16px; }
                  .rdp-caption_label { font-weight: 800; font-size: 1rem; text-transform: capitalize; }
                `}</style>
                <DayPicker
                  mode="single"
                  selected={selected}
                  onSelect={setSelected}
                  month={month}
                  onMonthChange={setMonth}
                  locale={fr}
                  modifiers={{ booked: bookedDays }}
                  modifiersClassNames={{ booked: "rdp-day_booked" }}
                  className="mx-auto"
                />
              </>
            )}
          </motion.div>

          {/* Selected day detail */}
          {selected && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-6 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800"
            >
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">
                Détail du{" "}
                {selected.toLocaleDateString("fr-FR", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </p>
              {selectedEvents.length === 0 ? (
                <p className="text-slate-400 font-medium text-sm">
                  Aucune réservation ce jour.
                </p>
              ) : (
                <div className="space-y-3">
                  {selectedEvents.map((ev) => (
                    <div
                      key={ev.id}
                      className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg"
                    >
                      <div className="w-10 h-10 bg-welqo-anthracite rounded-lg flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white text-sm">
                          {ev.guestFirstName} {ev.guestLastName}
                        </p>
                        <p className="text-slate-500 text-xs font-medium">
                          {ev.property.titleFr} · {ev.id.slice(0, 8)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stats */}
          <div className="space-y-6">
            {/* Stats */}
            <div className="p-6 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-5">
                Indicateurs clés
              </p>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-slate-50 dark:border-slate-800">
                  <span className="text-slate-500 font-medium text-sm">
                    Réservations
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {events.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium text-sm">
                    Nuits réservées
                  </span>
                  <span className="font-bold text-welqo-terracotta">
                    {bookedDays.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="p-6 bg-slate-900 text-white rounded-lg shadow-xl shadow-slate-950/20 border border-slate-800">
              <h2 className="text-sm font-bold mb-5 flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-welqo-terracotta" />
                Légende
              </h2>
              <div className="space-y-4 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-3.5 h-3.5 bg-welqo-terracotta rounded" />
                  <span className="font-medium">Réservé</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3.5 h-3.5 bg-slate-700 rounded" />
                  <span className="font-medium text-slate-400">
                    Indisponible / Bloqué
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3.5 h-3.5 bg-slate-900 border border-welqo-terracotta rounded" />
                  <span className="font-medium">Aujourd'hui</span>
                </div>
              </div>
            </div>

            {/* Action */}
            <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-lg">
              <h3 className="text-slate-900 dark:text-white font-bold mb-3 flex items-center gap-2 text-sm">
                <Info className="w-4 h-4 text-welqo-terracotta" />
                Gestion Bed24
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed mb-6 font-medium">
                Synchronisation bidirectionnelle active toutes les 10 min.
              </p>
              <button className="w-full py-3 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg font-bold text-sm hover:bg-slate-800 transition-colors">
                Bloquer des dates
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
