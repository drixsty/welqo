"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useLocale, useTranslations } from "next-intl";
import { subscribeToNewsletter } from "@/app/actions/newsletter";

type NewsletterState = { success: boolean; error: string };

const initialState: NewsletterState = { success: false, error: "" };

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-welqo-terracotta px-4 py-2.5 text-sm font-bold text-white disabled:opacity-60 hover:bg-welqo-terracotta-dark transition-colors"
    >
      {pending ? "..." : label}
    </button>
  );
}

export function NewsletterForm() {
  const t = useTranslations("Newsletter");
  const locale = useLocale();
  const [state, action] = useFormState<NewsletterState, FormData>(
    subscribeToNewsletter,
    initialState,
  );

  if (state.success) {
    return (
      <p className="text-emerald-400 text-sm font-medium">{t("success")}</p>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-2">
      <input type="hidden" name="locale" value={locale} />
      <div className="flex gap-2">
        <input
          name="email"
          type="email"
          required
          placeholder={t("placeholder")}
          className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-welqo-terracotta/50 focus:outline-none disabled:opacity-50 transition-colors dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500"
        />
        <SubmitButton label={t("cta")} />
      </div>
      {state.error && (
        <p className="text-xs text-red-400 font-medium">{state.error}</p>
      )}
    </form>
  );
}
