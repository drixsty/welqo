"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

const schema = z.object({
  name: z.string().min(2, "Prénom requis (2 caractères min.)"),
  phone: z.string().min(10, "Numéro de téléphone requis"),
  city: z.string().min(1, "Ville requise"),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const CITIES_FR = ["Lille", "Roubaix", "Tourcoing", "Lens", "Arras", "Béthune", "Douai", "Autre"];
const CITIES_EN = ["Lille", "Roubaix", "Tourcoing", "Lens", "Arras", "Béthune", "Douai", "Other"];

export function ContactForm({ locale }: { locale: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const isFr = locale !== "en";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
        <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center">
          <svg className="w-7 h-7 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white">
          {isFr ? "Message envoyé !" : "Message sent!"}
        </h3>
        <p className="text-slate-400 text-sm max-w-sm font-medium">
          {isFr
            ? "Nous vous recontactons sous 24h pour organiser la visite gratuite de votre bien."
            : "We'll get back to you within 24h to schedule a free visit of your property."}
        </p>
      </div>
    );
  }

  const inputClass = "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm font-medium placeholder:text-slate-500 focus:outline-none focus:border-welqo-terracotta/50 focus:bg-white/8 transition-colors";
  const errorClass = "mt-1 text-[11px] text-red-400 font-medium";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <input
            {...register("name")}
            placeholder={isFr ? "Votre prénom *" : "Your first name *"}
            className={inputClass}
            autoComplete="given-name"
          />
          {errors.name && <p className={errorClass}>{errors.name.message}</p>}
        </div>
        <div>
          <input
            {...register("phone")}
            placeholder={isFr ? "Téléphone *" : "Phone *"}
            type="tel"
            className={inputClass}
            autoComplete="tel"
          />
          {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <select {...register("city")} className={`${inputClass} appearance-none`} defaultValue="">
          <option value="" disabled className="bg-slate-900 text-slate-400">
            {isFr ? "Votre ville *" : "Your city *"}
          </option>
          {(isFr ? CITIES_FR : CITIES_EN).map((c) => (
            <option key={c} value={c} className="bg-slate-900 text-white">{c}</option>
          ))}
        </select>
        {errors.city && <p className={errorClass}>{errors.city.message}</p>}
      </div>

      <div>
        <textarea
          {...register("message")}
          placeholder={isFr ? "Décrivez votre bien (optionnel)" : "Describe your property (optional)"}
          rows={3}
          className={`${inputClass} resize-none`}
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-400 font-medium text-center">
          {isFr
            ? "Une erreur est survenue. Réessayez ou écrivez-nous à contact@welqo.fr"
            : "An error occurred. Try again or write to contact@welqo.fr"}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-4 bg-welqo-terracotta hover:bg-welqo-terracotta-dark disabled:opacity-60 text-white rounded-lg font-bold text-sm transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 shadow-xl shadow-welqo-terracotta/20"
      >
        {status === "loading" ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            {isFr ? "Envoi en cours..." : "Sending..."}
          </>
        ) : (
          <>
            {isFr ? "Demander mon devis gratuit →" : "Request my free quote →"}
          </>
        )}
      </button>

      <p className="text-center text-[11px] text-slate-500 font-medium">
        {isFr
          ? "Visite sur place offerte · Réponse garantie sous 24h · Sans engagement"
          : "Free on-site visit · Response guaranteed within 24h · No commitment"}
      </p>
    </form>
  );
}
