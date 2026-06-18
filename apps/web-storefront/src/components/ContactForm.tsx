"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useRef, useEffect, useMemo, useCallback } from "react";

function formatPhone(value: string): string {
  const hasPlus = value.trimStart().startsWith("+");
  const digits = value.replace(/\D/g, "");
  if (hasPlus) {
    const d = digits.slice(0, 11);
    let r = "+";
    if (d.length > 0) r += d.slice(0, 2);
    if (d.length > 2) r += " " + d[2];
    if (d.length > 3) r += " " + d.slice(3, 5);
    if (d.length > 5) r += " " + d.slice(5, 7);
    if (d.length > 7) r += " " + d.slice(7, 9);
    if (d.length > 9) r += " " + d.slice(9, 11);
    return r;
  }
  const d = digits.slice(0, 10);
  const groups: string[] = [];
  for (let i = 0; i < d.length; i += 2) groups.push(d.slice(i, i + 2));
  return groups.join(" ");
}
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { submitContactForm } from "@/app/actions/contact";

const CITIES_FR = [
  "Lille",
  "Roubaix",
  "Tourcoing",
  "Lens",
  "Arras",
  "Béthune",
  "Douai",
  "Autre",
];
const CITIES_EN = [
  "Lille",
  "Roubaix",
  "Tourcoing",
  "Lens",
  "Arras",
  "Béthune",
  "Douai",
  "Other",
];

export function ContactForm({ locale }: { locale: string }) {
  const t = useTranslations("ContactForm");

  const schema = useMemo(
    () =>
      z.object({
        name: z.string().min(2, t("errorName")),
        email: z.string().email(t("errorEmail")),
        phone: z
          .string()
          .refine(
            (v) =>
              /^(?:(?:\+33|0033)\s?[1-9](?:\s?\d{2}){4}|0[1-9](?:\s?\d{2}){4})$/.test(
                v,
              ),
            t("errorPhone"),
          ),
        city: z.string().min(1, t("errorCity")),
        message: z.string().optional(),
        consent: z.boolean().optional(),
      }),
    [t],
  );

  type FormValues = z.infer<typeof schema>;

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [submittedName, setSubmittedName] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [submittedPhone, setSubmittedPhone] = useState("");
  const [isCityOpen, setIsCityOpen] = useState(false);
  const cityDropdownRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const handlePhoneChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = formatPhone(e.target.value);
      setValue("phone", formatted, { shouldValidate: true });
    },
    [setValue],
  );

  const selectedCity = watch("city");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        cityDropdownRef.current &&
        !cityDropdownRef.current.contains(event.target as Node)
      ) {
        setIsCityOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onSubmit = async (data: FormValues) => {
    setStatus("loading");
    try {
      const res = await submitContactForm(data);
      if (!res.success) throw new Error();
      setSubmittedName(data.name);
      setSubmittedEmail(data.email);
      setSubmittedPhone(data.phone.replace(/\s/g, ""));
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    const calendlyBaseUrl =
      process.env.NEXT_PUBLIC_CALENDLY_URL ||
      "https://calendly.com/welqo/15min";
    const calendlyParams = new URLSearchParams({
      hide_landing_page_details: "1",
      hide_gdpr_banner: "1",
      name: submittedName,
      email: submittedEmail,
      a1: submittedPhone,
    });
    const calendlyUrl = `${calendlyBaseUrl}?${calendlyParams.toString()}`;

    return (
      <div className="flex flex-col items-center justify-center gap-4 py-6 text-center w-full">
        <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center">
          <svg
            className="w-6 h-6 text-emerald-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-white">{t("messageSent")}</h3>
        <p className="text-slate-400 text-xs max-w-sm font-medium leading-relaxed">
          {t("messageSentDesc")}
        </p>

        <p className="text-slate-300 text-xs font-bold leading-relaxed mt-4 border-t border-white/5 pt-4">
          {t("bookCallSubtitle")}
        </p>

        {/* Calendly Iframe widget in place */}
        <div className="w-full h-[550px] rounded-xl overflow-hidden bg-slate-900 border border-white/5 relative mt-4 shadow-inner">
          <iframe
            src={calendlyUrl}
            width="100%"
            height="100%"
            frameBorder="0"
            className="w-full h-full bg-slate-900"
          />
        </div>

        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setSubmittedName("");
            setSubmittedEmail("");
            setSubmittedPhone("");
          }}
          className="mt-4 px-5 py-2.5 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-lg font-bold text-xs transition-all cursor-pointer inline-flex items-center gap-1.5"
        >
          🔄{" "}
          {locale === "en"
            ? "Send another message"
            : "Envoyer un autre message"}
        </button>
      </div>
    );
  }

  const inputClass =
    "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm font-medium placeholder:text-slate-500 focus:outline-none focus:border-welqo-terracotta/50 focus:bg-white/8 transition-colors";
  const errorClass = "mt-1 text-[11px] text-red-400 font-medium";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <input
            {...register("name")}
            placeholder={t("namePlaceholder")}
            className={inputClass}
            autoComplete="given-name"
          />
          {errors.name && <p className={errorClass}>{errors.name.message}</p>}
        </div>
        <div>
          <input
            {...register("email")}
            placeholder={t("emailPlaceholder")}
            type="email"
            className={inputClass}
            autoComplete="email"
          />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <input
          {...register("phone")}
          onChange={handlePhoneChange}
          placeholder={t("phonePlaceholder")}
          type="tel"
          inputMode="tel"
          className={inputClass}
          autoComplete="tel"
        />
        {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
      </div>

      <div className="relative animate-fade-in" ref={cityDropdownRef}>
        <input type="hidden" {...register("city")} />
        <button
          type="button"
          onClick={() => setIsCityOpen(!isCityOpen)}
          className={`${inputClass} flex items-center justify-between text-left pr-10 cursor-pointer ${
            isCityOpen
              ? "border-welqo-terracotta/50 ring-1 ring-welqo-terracotta/20 bg-white/10"
              : ""
          }`}
        >
          <span
            className={
              selectedCity ? "text-white font-semibold" : "text-slate-500"
            }
          >
            {selectedCity || t("cityPlaceholder")}
          </span>
          <div
            className={`absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-transform duration-200 ${
              isCityOpen ? "rotate-180" : ""
            }`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </button>

        <AnimatePresence>
          {isCityOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.12, ease: "easeOut" }}
              className="absolute left-0 right-0 mt-2 bg-slate-950/95 backdrop-blur-2xl border border-white/10 rounded-lg shadow-2xl overflow-hidden z-50 p-1 max-h-60 overflow-y-auto"
            >
              {(locale !== "en" ? CITIES_FR : CITIES_EN).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => {
                    setValue("city", c, { shouldValidate: true });
                    setIsCityOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 rounded-md text-sm font-bold transition-colors ${
                    selectedCity === c
                      ? "bg-welqo-terracotta text-white"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {c}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {errors.city && <p className={errorClass}>{errors.city.message}</p>}

      <div>
        <textarea
          {...register("message")}
          placeholder={t("messagePlaceholder")}
          rows={3}
          className={`${inputClass} resize-none`}
        />
      </div>

      <label className="flex items-start gap-2.5 cursor-pointer group">
        <input
          {...register("consent")}
          type="checkbox"
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/20 bg-white/5 text-welqo-terracotta accent-welqo-terracotta cursor-pointer"
        />
        <span className="text-[11px] text-slate-500 group-hover:text-slate-400 leading-relaxed transition-colors">
          {t("consentLabel")}
        </span>
      </label>

      {status === "error" && (
        <p className="text-sm text-red-400 font-medium text-center">
          {t("errorOccurred")}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-4 bg-welqo-terracotta hover:bg-welqo-terracotta-dark disabled:opacity-60 text-white rounded-lg font-bold text-sm transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 shadow-xl shadow-welqo-terracotta/20"
      >
        {status === "loading" ? (
          <>
            <svg
              className="w-4 h-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            {t("sending")}
          </>
        ) : (
          <>{t("submitButton")}</>
        )}
      </button>

      <p className="text-center text-[11px] text-slate-500 font-medium">
        {t("disclaimer")}
      </p>
    </form>
  );
}
