"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  addDays,
  parseISO,
  differenceInDays,
  isSameDay,
  isSameMonth,
} from "date-fns";
import { fr } from "date-fns/locale";
import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  MapPin,
  MessageCircle,
  Home,
  Moon,
  TrendingUp,
} from "lucide-react";
import { fetchApi } from "../../../../lib/api";
import { useAuthGuard } from "../../../../lib/useAuthGuard";
import { PageWrapper } from "../../../../components/PageWrapper";
import { DetailPanel } from "../../../../components/DetailPanel";
import { Button } from "@welqo/ui";

// ── Types ──────────────────────────────────────────────────────────────────────

interface Booking {
  id: string;
  guestFirstName: string;
  guestLastName: string;
  guestEmail?: string;
  checkIn: string;
  checkOut: string;
  status: "CONFIRMED" | "PENDING" | "CANCELLED" | string;
  totalAmountGross?: number;
  totalAmountNet?: number;
  property: { id?: string; titleFr: string; city?: string };
}

interface PropertyRow {
  key: string;
  titleFr: string;
  city?: string;
  bookings: Booking[];
}

// ── Constants ──────────────────────────────────────────────────────────────────

const W_PROP = 188; // px — property label column
const W_DAY = 42; // px — one day column
const HDR_H = 56; // px — date header row height
const ROW_H = 68; // px — property row height
const BAR_H = 38; // px — booking bar height
const BAR_V = (ROW_H - BAR_H) / 2; // 15px — vertical centering
const INSET = 4; // px — bar left/right inset at true start/end

// ── Booking colors (hash-stable per booking id) ───────────────────────────────

const PALETTE = [
  {
    pill: "#f4724a",
    bg: "rgba(244,114,74,0.14)",
    hover: "rgba(244,114,74,0.22)",
    text: "#c44e2a",
  },
  {
    pill: "#7c3aed",
    bg: "rgba(124,58,237,0.12)",
    hover: "rgba(124,58,237,0.20)",
    text: "#6d28d9",
  },
  {
    pill: "#0ea5e9",
    bg: "rgba(14,165,233,0.12)",
    hover: "rgba(14,165,233,0.20)",
    text: "#0284c7",
  },
  {
    pill: "#10b981",
    bg: "rgba(16,185,129,0.12)",
    hover: "rgba(16,185,129,0.20)",
    text: "#059669",
  },
  {
    pill: "#f59e0b",
    bg: "rgba(245,158,11,0.14)",
    hover: "rgba(245,158,11,0.22)",
    text: "#d97706",
  },
  {
    pill: "#ec4899",
    bg: "rgba(236,72,153,0.12)",
    hover: "rgba(236,72,153,0.20)",
    text: "#db2777",
  },
];

function getColor(id: string) {
  let h = 0;
  for (let i = 0; i < id.length; i++)
    h = (h * 31 + id.charCodeAt(i)) & 0xffffffff;
  return PALETTE[Math.abs(h) % PALETTE.length];
}

// ── Status config ──────────────────────────────────────────────────────────────

function statusConfig(status: string) {
  if (status === "CONFIRMED")
    return {
      label: "Confirmé",
      cls: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    };
  if (status === "PENDING")
    return {
      label: "En attente",
      cls: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    };
  if (status === "CANCELLED")
    return {
      label: "Annulé",
      cls: "bg-rose-500/10 text-rose-600 border-rose-500/20",
    };
  return { label: status, cls: "bg-slate-100 text-slate-500 border-slate-200" };
}

// ── Build property rows: stable list + current-month bookings ─────────────────

// knownProperties is a stable map accumulated across all loaded months (key → PropertyRow without bookings)
function buildPropertyRows(
  knownProps: Map<string, Omit<PropertyRow, "bookings">>,
  bookings: Booking[],
): PropertyRow[] {
  // Seed rows from everything we've ever seen
  const rows = new Map<string, PropertyRow>();
  for (const [key, p] of knownProps) {
    rows.set(key, { ...p, bookings: [] });
  }
  // Attach current-month bookings (also registers any new property)
  for (const b of bookings) {
    const key = b.property.id ?? b.property.titleFr;
    if (!key) continue;
    if (!rows.has(key)) {
      rows.set(key, {
        key,
        titleFr: b.property.titleFr ?? key,
        city: b.property.city,
        bookings: [],
      });
    }
    rows.get(key)!.bookings.push(b);
  }
  return Array.from(rows.values()).sort((a, b) =>
    (a.titleFr ?? "").localeCompare(b.titleFr ?? ""),
  );
}

// ── Initials avatar ────────────────────────────────────────────────────────────

function Initials({
  first,
  last,
  color,
}: {
  first: string;
  last: string;
  color: ReturnType<typeof getColor>;
}) {
  return (
    <span
      className="w-6 h-6 rounded-md flex items-center justify-center text-[9px] font-bold shrink-0 leading-none"
      style={{ background: color.pill, color: "#fff" }}
    >
      {first[0]}
      {last[0]}
    </span>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function CalendrierPage() {
  const { locale } = useAuthGuard();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Booking | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  // Accumulates every property ever seen across month navigations
  const knownProps = useRef<Map<string, Omit<PropertyRow, "bookings">>>(
    new Map(),
  );

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const today = new Date();

  // Build days array (full month)
  const days: Date[] = [];
  let cur = monthStart;
  while (cur <= monthEnd) {
    days.push(cur);
    cur = addDays(cur, 1);
  }

  const totalGridW = days.length * W_DAY;
  const totalWidth = W_PROP + totalGridW;
  const todayOffset = isSameMonth(today, currentMonth)
    ? differenceInDays(today, monthStart)
    : -1;

  const loadBookings = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchApi<Booking[]>(
        `/calendar/bookings?start=${format(monthStart, "yyyy-MM-dd")}&end=${format(monthEnd, "yyyy-MM-dd")}`,
      );
      // Register every property we see so the list stays stable across months
      for (const b of data) {
        const key = b.property.id ?? b.property.titleFr;
        if (key && !knownProps.current.has(key)) {
          knownProps.current.set(key, {
            key,
            titleFr: b.property.titleFr ?? key,
            city: b.property.city,
          });
        }
      }
      setBookings(data);
    } catch {
      /* silent */
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMonth]);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  // Auto-scroll to today when month changes
  useEffect(() => {
    if (!scrollRef.current || todayOffset < 0) return;
    const target = Math.max(0, W_PROP + todayOffset * W_DAY - 120);
    scrollRef.current.scrollLeft = target;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMonth]);

  const propertyRows = buildPropertyRows(knownProps.current, bookings);
  const confirmedCount = bookings.filter(
    (b) => b.status === "CONFIRMED",
  ).length;

  const sc = selected ? statusConfig(selected.status) : null;
  const nights = selected
    ? differenceInDays(parseISO(selected.checkOut), parseISO(selected.checkIn))
    : 0;

  return (
    <PageWrapper>
      {/* Outer layout fills available height */}
      <div className="flex flex-col" style={{ height: "calc(100vh - 112px)" }}>
        {/* ── Page header ───────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 shrink-0">
          <div>
            <h1 className="text-xl font-semibold text-slate-900 dark:text-white tracking-tight capitalize">
              {format(currentMonth, "MMMM yyyy", { locale: fr })}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {loading
                ? "Chargement…"
                : `${confirmedCount} réservation${confirmedCount !== 1 ? "s" : ""} confirmée${confirmedCount !== 1 ? "s" : ""}  ·  ${propertyRows.length} logement${propertyRows.length !== 1 ? "s" : ""}`}
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Legend */}
            <div className="hidden sm:flex items-center gap-3 mr-1 text-[11px] text-slate-400 font-medium">
              <span className="flex items-center gap-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-sm inline-block"
                  style={{
                    background: PALETTE[0].bg,
                    outline: `1.5px solid ${PALETTE[0].pill}40`,
                  }}
                />
                Confirmé
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-amber-400/25 inline-block border border-amber-400/30" />
                En attente
              </span>
            </div>

            {/* Navigation */}
            <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
              <button
                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                className="px-2.5 h-8 flex items-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-800 transition-colors border-r border-slate-200 dark:border-slate-700"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setCurrentMonth(new Date())}
                className="px-3 h-8 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Aujourd'hui
              </button>
              <button
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                className="px-2.5 h-8 flex items-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-800 transition-colors border-l border-slate-200 dark:border-slate-700"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Timeline container (fills remaining height) ─────────────────── */}
        <div className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-900 shadow-sm min-h-0">
          <div
            ref={scrollRef}
            className="h-full overflow-auto"
            style={{ scrollbarWidth: "thin" }}
          >
            <div style={{ minWidth: totalWidth, position: "relative" }}>
              {/* ── Date header (sticky top) ─────────────────────────────── */}
              <div
                className="flex sticky top-0 z-30 border-b border-slate-200 dark:border-slate-700"
                style={{ height: HDR_H }}
              >
                {/* Corner cell — sticky left + top */}
                <div
                  className="sticky left-0 z-40 flex items-end gap-1.5 px-4 pb-2.5 shrink-0 border-r-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950"
                  style={{
                    width: W_PROP,
                    boxShadow: "2px 0 8px rgba(0,0,0,0.06)",
                  }}
                >
                  <Home className="w-3.5 h-3.5 text-slate-400 mb-0.5" />
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 tracking-wide">
                    Logements
                  </span>
                </div>

                {/* Day columns */}
                {days.map((day, i) => {
                  const isToday = isSameDay(day, today);
                  const isWeekend = day.getDay() === 0 || day.getDay() === 6;
                  const dayOfWeek = format(day, "EEEEE", {
                    locale: fr,
                  }).toUpperCase();

                  return (
                    <div
                      key={i}
                      className={[
                        "flex flex-col items-center justify-end pb-2 shrink-0 border-r border-slate-100 dark:border-slate-800 last:border-r-0 relative select-none",
                        isToday
                          ? "bg-primary/[0.06] dark:bg-primary/[0.10]"
                          : isWeekend
                            ? "bg-slate-50/70 dark:bg-slate-950/50"
                            : "bg-white dark:bg-slate-900",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      style={{ width: W_DAY }}
                    >
                      <span
                        className={[
                          "text-[9px] font-semibold leading-none mb-1",
                          isToday
                            ? "text-primary/70"
                            : isWeekend
                              ? "text-slate-400"
                              : "text-slate-300 dark:text-slate-600",
                        ].join(" ")}
                      >
                        {dayOfWeek}
                      </span>
                      <span
                        className={[
                          "w-6 h-6 flex items-center justify-center text-xs font-bold rounded-full leading-none transition-colors",
                          isToday
                            ? "bg-primary text-white shadow-sm"
                            : isWeekend
                              ? "text-slate-500 dark:text-slate-400"
                              : "text-slate-600 dark:text-slate-300",
                        ].join(" ")}
                      >
                        {format(day, "d")}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* ── Property rows ─────────────────────────────────────────── */}
              {loading ? (
                <div className="flex items-center justify-center py-20 gap-3">
                  <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs text-slate-400">
                    Chargement du planning…
                  </span>
                </div>
              ) : propertyRows.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
                  <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center border border-slate-200 dark:border-slate-700">
                    <CalendarDays className="w-5 h-5 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800 dark:text-white mb-0.5">
                      Aucune réservation ce mois
                    </p>
                    <p className="text-xs text-slate-400">
                      Naviguez vers un autre mois.
                    </p>
                  </div>
                </div>
              ) : (
                propertyRows.map((prop) => (
                  <div
                    key={prop.key}
                    className="flex group border-b border-slate-100 dark:border-slate-800/80 last:border-0"
                    style={{ height: ROW_H }}
                  >
                    {/* ── Property label (sticky left) ───────────────────── */}
                    <div
                      className="sticky left-0 z-20 shrink-0 flex flex-col justify-center px-4 border-r-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 transition-colors group-hover:bg-slate-100/80 dark:group-hover:bg-slate-900/80"
                      style={{
                        width: W_PROP,
                        boxShadow: "2px 0 8px rgba(0,0,0,0.05)",
                      }}
                    >
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-100 truncate leading-snug">
                        {prop.titleFr}
                      </p>
                      {prop.city && (
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate mt-0.5 flex items-center gap-1">
                          <MapPin className="w-2.5 h-2.5 shrink-0" />
                          {prop.city}
                        </p>
                      )}
                    </div>

                    {/* ── Day cells + booking bars ──────────────────────── */}
                    <div
                      className="relative bg-white dark:bg-slate-900"
                      style={{ width: totalGridW, height: ROW_H }}
                    >
                      {/* Day backgrounds */}
                      <div className="absolute inset-0 flex pointer-events-none">
                        {days.map((day, di) => {
                          const isToday = isSameDay(day, today);
                          const isWeekend =
                            day.getDay() === 0 || day.getDay() === 6;
                          return (
                            <div
                              key={di}
                              className={[
                                "h-full border-r border-slate-100/80 dark:border-slate-800/60 last:border-r-0 shrink-0",
                                isToday
                                  ? "bg-primary/[0.035] dark:bg-primary/[0.06]"
                                  : isWeekend
                                    ? "bg-slate-50/50 dark:bg-slate-950/30"
                                    : "",
                              ]
                                .filter(Boolean)
                                .join(" ")}
                              style={{ width: W_DAY }}
                            />
                          );
                        })}
                      </div>

                      {/* Today vertical line */}
                      {todayOffset >= 0 && (
                        <div
                          className="absolute top-0 bottom-0 pointer-events-none z-10"
                          style={{
                            left: todayOffset * W_DAY + W_DAY / 2 - 1,
                            width: 2,
                            background: "var(--primary)",
                            opacity: 0.25,
                          }}
                        />
                      )}

                      {/* Booking bars */}
                      {prop.bookings.map((booking) => {
                        const ci = parseISO(booking.checkIn);
                        const co = parseISO(booking.checkOut);

                        const ciDiff = differenceInDays(ci, monthStart);
                        const coDiff = differenceInDays(co, monthStart);

                        const startIdx = Math.max(0, ciDiff);
                        const endIdx = Math.min(days.length - 1, coDiff);

                        if (startIdx > days.length - 1 || endIdx < 0)
                          return null;

                        const isBarStart = ciDiff >= 0;
                        const isBarEnd = coDiff < days.length;
                        const barNights = differenceInDays(co, ci);
                        const barSpan = (endIdx - startIdx + 1) * W_DAY;

                        const isActive = booking.status !== "CANCELLED";
                        const color = isActive ? getColor(booking.id) : null;

                        const leftPx =
                          startIdx * W_DAY + (isBarStart ? INSET : 0);
                        const rightPx =
                          (days.length - 1 - endIdx) * W_DAY +
                          (isBarEnd ? INSET : 0);

                        return (
                          <button
                            key={booking.id}
                            onClick={() => setSelected(booking)}
                            title={`${booking.guestFirstName} ${booking.guestLastName} · ${barNights}n`}
                            style={{
                              position: "absolute",
                              top: BAR_V,
                              left: leftPx,
                              right: rightPx,
                              height: BAR_H,
                              zIndex: 15,
                              background:
                                isActive && color
                                  ? color.bg
                                  : "rgba(148,163,184,0.12)",
                              borderRadius: `${isBarStart ? 8 : 0}px ${isBarEnd ? 8 : 0}px ${isBarEnd ? 8 : 0}px ${isBarStart ? 8 : 0}px`,
                              borderLeft:
                                isBarStart && color
                                  ? `3px solid ${color.pill}`
                                  : "none",
                              cursor: "pointer",
                              transition: "background 120ms",
                            }}
                            onMouseEnter={(e) => {
                              if (color)
                                (
                                  e.currentTarget as HTMLElement
                                ).style.background = color.hover;
                            }}
                            onMouseLeave={(e) => {
                              if (color)
                                (
                                  e.currentTarget as HTMLElement
                                ).style.background = color.bg;
                            }}
                            className="flex items-center gap-1.5 px-2 overflow-hidden"
                          >
                            {isBarStart && isActive && color && (
                              <>
                                <Initials
                                  first={booking.guestFirstName}
                                  last={booking.guestLastName}
                                  color={color}
                                />
                                <span
                                  className="text-[11px] font-semibold truncate"
                                  style={{ color: color.text }}
                                >
                                  {booking.guestFirstName}{" "}
                                  {booking.guestLastName[0]}.
                                </span>
                                {barSpan >= W_DAY * 4 && (
                                  <span
                                    className="ml-auto shrink-0 text-[10px] font-medium flex items-center gap-0.5"
                                    style={{ color: color.text, opacity: 0.65 }}
                                  >
                                    <Moon className="w-2.5 h-2.5" />
                                    {barNights}
                                  </span>
                                )}
                              </>
                            )}
                            {isBarStart && !isActive && (
                              <span className="text-[10px] font-medium text-slate-400 truncate">
                                {booking.guestFirstName}{" "}
                                {booking.guestLastName[0]}.
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Detail panel ──────────────────────────────────────────────────────── */}
      <DetailPanel
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title={
          selected ? `${selected.guestFirstName} ${selected.guestLastName}` : ""
        }
        subtitle={selected?.property.titleFr}
        footer={
          selected && (
            <>
              <Button
                href={`/${locale}/messages`}
                variant="secondary"
                size="md"
                className="w-full"
                icon={MessageCircle}
              >
                Voir les messages
              </Button>
              <Button
                href={`/${locale}/logements`}
                variant="ghost"
                size="md"
                className="w-full"
                icon={ChevronRight}
                iconPosition="right"
              >
                Voir le logement
              </Button>
            </>
          )
        }
      >
        {selected && sc && (
          <div className="p-5 space-y-5">
            {/* Status */}
            <span
              className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold border ${sc.cls}`}
            >
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
                {selected.guestEmail && (
                  <p className="text-[11px] text-slate-400 truncate">
                    {selected.guestEmail}
                  </p>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-[10px] font-medium text-slate-400 mb-0.5">
                    Logement
                  </p>
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    {selected.property.titleFr}
                  </p>
                  {selected.property.city && (
                    <p className="text-[10px] text-slate-400">
                      {selected.property.city}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CalendarDays className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-[10px] font-medium text-slate-400 mb-1">
                    Séjour
                  </p>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200">
                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">
                      {format(parseISO(selected.checkIn), "dd MMM", {
                        locale: fr,
                      })}
                    </span>
                    <span className="text-slate-300">→</span>
                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">
                      {format(parseISO(selected.checkOut), "dd MMM", {
                        locale: fr,
                      })}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                    <Moon className="w-3 h-3" />
                    {nights} nuit{nights > 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              {(selected.totalAmountGross != null ||
                selected.totalAmountNet != null) && (
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <p className="text-[10px] font-medium text-slate-400 mb-2">
                      Financier
                    </p>
                    <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-100 dark:border-slate-800 space-y-1.5">
                      {selected.totalAmountGross != null && (
                        <div className="flex justify-between text-[11px]">
                          <span className="text-slate-500">Total TTC</span>
                          <span className="font-semibold text-slate-800 dark:text-slate-200">
                            {selected.totalAmountGross.toFixed(2)} €
                          </span>
                        </div>
                      )}
                      {selected.totalAmountNet != null && (
                        <>
                          <div className="h-px bg-slate-200 dark:bg-slate-700" />
                          <div className="flex justify-between text-xs">
                            <span className="font-semibold text-slate-700 dark:text-slate-300">
                              Net propriétaire
                            </span>
                            <span className="font-bold text-primary">
                              {selected.totalAmountNet.toFixed(2)} €
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

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
