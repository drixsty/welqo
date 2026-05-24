"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  PenTool,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { fetchApi } from "../../../../lib/api";
import { useAuthGuard } from "../../../../lib/useAuthGuard";
import { Button } from "@welqo/ui";
import { PageWrapper } from "../../../../components/PageWrapper";

interface Mandate {
  id: string;
  status: "DRAFT" | "PENDING_SIGNATURE" | "SIGNED" | "EXPIRED" | "CANCELLED";
  pdfPath: string | null;
  signatureId: string | null;
  signedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

const STATUS_CONFIG: Record<string, { label: string; cls: string; icon: any }> =
  {
    DRAFT: {
      label: "Brouillon",
      cls: "bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700",
      icon: FileText,
    },
    PENDING_SIGNATURE: {
      label: "En attente de signature",
      cls: "bg-amber-500/10 text-amber-600 border-amber-500/20",
      icon: PenTool,
    },
    SIGNED: {
      label: "Signé",
      cls: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
      icon: CheckCircle2,
    },
    EXPIRED: {
      label: "Expiré",
      cls: "bg-rose-500/10 text-rose-600 border-rose-500/20",
      icon: AlertCircle,
    },
  };

export default function MandatsPage() {
  useAuthGuard();
  const [mandates, setMandates] = useState<Mandate[]>([]);
  const [loading, setLoading] = useState(true);
  const [initiating, setInitiating] = useState(false);

  useEffect(() => {
    loadMandates();
  }, []);

  const loadMandates = async () => {
    try {
      setLoading(true);
      const data = await fetchApi<Mandate[]>("/owner/mandates");
      setMandates(data);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  };

  const handleInitiate = async () => {
    try {
      setInitiating(true);
      await fetchApi("/owner/mandates/initiate", { method: "POST" });
      await loadMandates();
    } catch (e: any) {
      alert("Erreur : " + e.message);
    } finally {
      setInitiating(false);
    }
  };

  if (loading && mandates.length === 0) {
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
              Mandats de gestion
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Contrats et signatures électroniques sécurisées
            </p>
          </div>
          <Button
            onClick={handleInitiate}
            isLoading={initiating}
            variant="primary"
            size="md"
            icon={PenTool}
          >
            Nouveau mandat
          </Button>
        </div>
        <div className="h-px bg-slate-100 dark:bg-slate-800/60" />

        {mandates.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 rounded-lg border border-dashed border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center">
            <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-lg flex items-center justify-center mb-4 border border-slate-200 dark:border-slate-700">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">
              Aucun document trouvé
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-5 max-w-xs">
              Initiez votre premier mandat de gestion pour commencer l'aventure
              Welqo.
            </p>
            <Button
              onClick={handleInitiate}
              isLoading={initiating}
              variant="outline"
              size="md"
            >
              Démarrer mon mandat
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            {mandates.map((m, i) => {
              const config = STATUS_CONFIG[m.status] || STATUS_CONFIG.DRAFT;
              const Icon = config.icon;
              return (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-4 py-3.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-9 h-9 rounded-md flex items-center justify-center shrink-0 border ${config.cls}`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-0.5">
                          <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                            Mandat #{m.id.slice(-6).toUpperCase()}
                          </h4>
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${config.cls}`}
                          >
                            {config.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Créé le{" "}
                            {new Date(m.createdAt).toLocaleDateString("fr-FR")}
                          </span>
                          {m.signedAt && (
                            <span className="flex items-center gap-1 text-emerald-600">
                              <CheckCircle2 className="w-3 h-3" /> Signé
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {m.status === "PENDING_SIGNATURE" && (
                        <Button
                          variant="primary"
                          size="sm"
                          href={`https://mock-signature.welqo.fr/sign/${m.signatureId}`}
                          target="_blank"
                          icon={ExternalLink}
                          iconPosition="right"
                        >
                          Signer
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        Voir PDF
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Info strip */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          <div className="flex items-start gap-3 p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-slate-900 dark:text-white mb-0.5">
                Sécurité Lex Persona
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Vos mandats sont gérés via{" "}
                <strong className="text-slate-700 dark:text-slate-300">
                  Lex Persona
                </strong>{" "}
                — signature électronique à valeur probante.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-slate-900 text-white rounded-lg border border-slate-800">
            <AlertCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-xs font-semibold mb-0.5">Assistance dédiée</p>
              <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                Nos City Managers vous accompagnent sur chaque clause
                contractuelle.
              </p>
              <Button
                variant="primary"
                size="md"
                icon={ArrowRight}
                iconPosition="right"
              >
                Contacter le support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
