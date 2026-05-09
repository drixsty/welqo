"use client";

import React, { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { fr } from "date-fns/locale";
import { eachDayOfInterval, parseISO } from "date-fns";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, Info, User, AlertCircle } from "lucide-react";
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
    const end   = ev.checkOut.slice(0, 10);
    return d >= start && d <= end;
  });
}

export default function CalendarPage() {
  useAuthGuard();
  const [events, setEvents]     = useState<CalendarEvent[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);
  const [month, setMonth]       = useState<Date>(new Date());
  const [selected, setSelected] = useState<Date | undefined>();

  useEffect(() => {
    fetchApi<CalendarEvent[]>("/stats/calendar")
      .then(setEvents)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const bookedDays     = expandToDays(events);
  const selectedEvents = selected ? getEventsForDay(events, selected) : [];

  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-12">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
          Calendrier des Réservations
        </h1>
        <p className="text-slate-500 font-bold text-lg">
          Visualisez et gérez les disponibilités de votre bien.
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
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-2xl shadow-blue-500/5"
          >
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <>
                <style>{`
                  .rdp { --rdp-cell-size: 52px; --rdp-accent-color: #2563eb; --rdp-background-color: #dbeafe; margin: 0; }
                  .rdp-day_selected { background-color: #0f172a !important; color: white !important; border-radius: 12px; }
                  .rdp-day_booked { background-color: #eff6ff; color: #1d4ed8; font-weight: 900; border-radius: 12px; }
                  .dark .rdp-day_booked { background-color: rgba(37,99,235,0.2); color: #93c5fd; }
                  .rdp-button:hover:not([disabled]):not(.rdp-day_selected) { background-color: #f1f5f9; border-radius: 12px; }
                  .rdp-head_cell { font-weight: 900; text-transform: uppercase; font-size: 0.7rem; color: #64748b; padding-bottom: 16px; }
                  .rdp-caption_label { font-weight: 900; font-size: 1.1rem; text-transform: capitalize; }
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
              className="mt-6 p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800"
            >
              <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
                {selected.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
              </p>
              {selectedEvents.length === 0 ? (
                <p className="text-slate-400 font-medium text-sm">Aucune réservation ce jour.</p>
              ) : (
                <div className="space-y-3">
                  {selectedEvents.map((ev) => (
                    <div key={ev.id} className="flex items-center gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
                      <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-black text-slate-900 dark:text-white text-sm">
                          {ev.guestFirstName} {ev.guestLastName}
                        </p>
                        <p className="text-slate-500 text-xs font-medium">
                          {ev.property.titleFr} ·{" "}
                          {new Date(ev.checkIn).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" })}
                          {" → "}
                          {new Date(ev.checkOut).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" })}
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
          <div className="p-6 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800">
            <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Ce mois</p>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-400 font-medium text-sm">Réservations</span>
                <span className="font-black text-slate-900 dark:text-white">{events.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-400 font-medium text-sm">Nuits réservées</span>
                <span className="font-black text-blue-600">{bookedDays.length}</span>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="p-6 bg-slate-900 text-white rounded-[2rem] border border-slate-800">
            <h2 className="text-base font-black mb-4 flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-blue-500" />
              Légende
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-blue-600 rounded-lg" />
                <span className="font-bold">Réservé</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-slate-700 rounded-lg" />
                <span className="font-bold text-slate-400">Bloqué</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-slate-900 border-2 border-blue-500 rounded-lg" />
                <span className="font-bold">Aujourd'hui</span>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-[2rem]">
            <h3 className="text-blue-900 dark:text-blue-400 font-black mb-3 flex items-center gap-2 text-sm">
              <Info className="w-4 h-4" />
              Sync automatique
            </h3>
            <p className="text-blue-800 dark:text-blue-300 font-medium text-sm leading-relaxed mb-6">
              Les réservations sont synchronisées avec Beds24 toutes les 10 minutes.
            </p>
            <button className="w-full py-3 bg-blue-600 text-white rounded-xl font-black text-sm shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-colors">
              Bloquer des dates
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
