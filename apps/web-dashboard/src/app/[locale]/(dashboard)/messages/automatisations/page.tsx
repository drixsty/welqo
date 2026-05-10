"use client";

import React, { useState, useEffect } from "react";
import {
  Zap,
  Plus,
  Pencil,
  Trash2,
  Clock,
  AlertCircle,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { fetchApi } from "../../../../../lib/api";
import { useAuthGuard } from "../../../../../lib/useAuthGuard";
import { PageWrapper } from "../../../../../components/PageWrapper";
import { DetailPanel } from "../../../../../components/DetailPanel";
import { Button } from "@welqo/ui";
import { motion } from "framer-motion";

interface MessageTemplate {
  id: string;
  name: string;
  trigger: string;
  content: string;
  isEnabled: boolean;
  daysOffset: number;
}

const TRIGGER_LABELS: Record<string, string> = {
  BOOKING_CONFIRMED: "Réservation confirmée",
  CHECK_IN_REMINDER: "Rappel avant arrivée",
  CHECK_OUT_REMINDER: "Rappel avant départ",
  POST_STAY: "Après le séjour",
  BOOKING_CANCELLED: "Réservation annulée",
};

function Toggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onToggle(); }}
      className={[
        "relative w-9 h-5 rounded-full transition-colors duration-200 shrink-0",
        enabled ? "bg-primary" : "bg-slate-200 dark:bg-slate-700",
      ].join(" ")}
    >
      <span
        className={[
          "absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200",
          enabled ? "translate-x-4" : "translate-x-0.5",
        ].join(" ")}
      />
    </button>
  );
}

export default function AutomatisationsPage() {
  useAuthGuard();
  const [templates, setTemplates] = useState<MessageTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<MessageTemplate | null>(null);

  useEffect(() => { loadTemplates(); }, []);

  async function loadTemplates() {
    try {
      setLoading(true);
      const data = await fetchApi<MessageTemplate[]>("/automation/templates");
      setTemplates(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function toggleTemplate(template: MessageTemplate) {
    try {
      await fetchApi(`/automation/templates/${template.id}`, {
        method: "PUT",
        body: JSON.stringify({ isEnabled: !template.isEnabled }),
      });
      const updated = { ...template, isEnabled: !template.isEnabled };
      setTemplates((prev) => prev.map((t) => (t.id === template.id ? updated : t)));
      if (selected?.id === template.id) setSelected(updated);
    } catch (err: any) {
      alert("Erreur : " + err.message);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <PageWrapper>
      <div className="max-w-5xl mx-auto space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-semibold text-slate-900 dark:text-white tracking-tight">
              Automatisations
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Messages automatiques envoyés à vos voyageurs
            </p>
          </div>
          <Button variant="primary" size="sm" icon={Plus}>
            Nouveau template
          </Button>
        </div>
        <div className="h-px bg-slate-100 dark:bg-slate-800/60" />

        {error && (
          <div className="flex items-center gap-2.5 px-4 py-3 bg-red-50 dark:bg-red-950/20 text-red-600 rounded-lg border border-red-100 dark:border-red-900 text-xs font-medium">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        {/* Stats strip */}
        {templates.length > 0 && (
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Templates total", value: templates.length },
              { label: "Actifs", value: templates.filter((t) => t.isEnabled).length, primary: true },
              { label: "Inactifs", value: templates.filter((t) => !t.isEnabled).length },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg px-4 py-3"
              >
                <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-0.5">
                  {s.label}
                </p>
                <p className={`text-xl font-bold tracking-tight ${"primary" in s && s.primary ? "text-primary" : "text-slate-900 dark:text-white"}`}>
                  {s.value}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Template list */}
        {templates.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 rounded-lg border border-dashed border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center">
            <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center mb-4 border border-slate-200 dark:border-slate-700">
              <Zap className="w-5 h-5 text-slate-400" />
            </div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white mb-1">
              Aucun automatisme configuré
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mb-5">
              Créez votre premier message automatique pour améliorer l'expérience voyageur.
            </p>
            <Button variant="outline" size="sm" icon={Plus}>
              Créer un template
            </Button>
          </div>
        ) : (
          <div className="rounded-lg border border-slate-100 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900">
            {templates.map((template, i) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => setSelected(template)}
                className={[
                  "flex items-center gap-4 px-4 py-3.5 cursor-pointer border-b border-slate-100 dark:border-slate-800 last:border-0 transition-colors",
                  "hover:bg-slate-50 dark:hover:bg-slate-800/50",
                  !template.isEnabled ? "opacity-60" : "",
                ].join(" ")}
              >
                {/* Icon */}
                <div
                  className={[
                    "w-8 h-8 rounded-md flex items-center justify-center shrink-0 border",
                    template.isEnabled
                      ? "bg-primary/10 text-primary border-primary/20"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700",
                  ].join(" ")}
                >
                  <Zap className="w-3.5 h-3.5" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                      {template.name}
                    </p>
                    <span className="text-[9px] font-semibold text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded shrink-0">
                      {TRIGGER_LABELS[template.trigger] ?? template.trigger}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate italic">
                    "{template.content}"
                  </p>
                </div>

                {/* Delay badge */}
                <div className="flex items-center gap-1 text-[10px] font-medium text-slate-400 shrink-0 hidden sm:flex">
                  <Clock className="w-3 h-3" />
                  {template.daysOffset === 0 ? "Immédiat" : `J+${template.daysOffset}`}
                </div>

                {/* Toggle */}
                <Toggle enabled={template.isEnabled} onToggle={() => toggleTemplate(template)} />
              </motion.div>
            ))}
          </div>
        )}

        {/* Info block */}
        <div className="flex items-start gap-3 px-4 py-3.5 bg-slate-900 text-white rounded-lg">
          <div className="w-7 h-7 bg-primary/20 rounded-md flex items-center justify-center shrink-0 mt-0.5">
            <Zap className="w-3.5 h-3.5 text-primary" />
          </div>
          <div>
            <p className="text-xs font-semibold mb-0.5">Variables dynamiques disponibles</p>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Personnalisez vos messages avec{" "}
              <code className="text-primary font-mono">{"{{guest_name}}"}</code>,{" "}
              <code className="text-primary font-mono">{"{{property_name}}"}</code>,{" "}
              <code className="text-primary font-mono">{"{{check_in_date}}"}</code> et plus encore.
            </p>
          </div>
        </div>
      </div>

      {/* Detail panel */}
      <DetailPanel
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.name ?? ""}
        subtitle={selected ? TRIGGER_LABELS[selected.trigger] ?? selected.trigger : undefined}
        footer={
          selected && (
            <>
              <Button variant="primary" size="sm" className="w-full" icon={Pencil}>
                Modifier le template
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                icon={Trash2}
              >
                Supprimer
              </Button>
            </>
          )
        }
      >
        {selected && (
          <div className="p-5 space-y-5">
            {/* Status */}
            <div className="flex items-center justify-between">
              <span
                className={[
                  "px-2 py-0.5 rounded text-[10px] font-bold border",
                  selected.isEnabled
                    ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                    : "bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-800 dark:border-slate-700",
                ].join(" ")}
              >
                {selected.isEnabled ? "Actif" : "Inactif"}
              </span>
              <button
                onClick={() => toggleTemplate(selected)}
                className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors"
              >
                {selected.isEnabled ? (
                  <ToggleRight className="w-4 h-4 text-primary" />
                ) : (
                  <ToggleLeft className="w-4 h-4" />
                )}
                {selected.isEnabled ? "Désactiver" : "Activer"}
              </button>
            </div>

            {/* Trigger */}
            <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-100 dark:border-slate-800">
              <Zap className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-[10px] font-medium text-slate-400 mb-0.5">Déclencheur</p>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  {TRIGGER_LABELS[selected.trigger] ?? selected.trigger}
                </p>
              </div>
            </div>

            {/* Timing */}
            <div className="flex items-start gap-3">
              <Clock className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-[10px] font-medium text-slate-400 mb-0.5">Envoi</p>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  {selected.daysOffset === 0
                    ? "Envoyé immédiatement"
                    : `Envoyé ${selected.daysOffset} jour${selected.daysOffset > 1 ? "s" : ""} après le déclencheur`}
                </p>
              </div>
            </div>

            {/* Content preview */}
            <div>
              <p className="text-[10px] font-medium text-slate-400 mb-2">Contenu du message</p>
              <div className="p-3.5 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-100 dark:border-slate-800">
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  "{selected.content}"
                </p>
              </div>
            </div>

            {/* Reference */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              <p className="text-[10px] text-slate-400">
                ID:{" "}
                <span className="font-mono font-semibold text-slate-600 dark:text-slate-400">
                  {selected.id.slice(-8).toUpperCase()}
                </span>
              </p>
            </div>
          </div>
        )}
      </DetailPanel>
    </PageWrapper>
  );
}
