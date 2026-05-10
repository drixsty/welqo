"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import { Button, LuxuryCard } from "@welqo/ui";

interface Mandate {
  id: string;
  status: "DRAFT" | "PENDING_SIGNATURE" | "SIGNED" | "EXPIRED" | "CANCELLED";
  pdfPath: string | null;
  signatureId: string | null;
  createdAt: string;
  updatedAt: string;
}

const STATUS_CONFIG: Record<string, { label: string; cls: string; icon: any }> = {
  DRAFT: {
    label: "Brouillon",
    cls: "bg-slate-100 text-slate-600 border-slate-200",
    icon: FileText,
  },
  PENDING_SIGNATURE: {
    label: "En attente de signature",
    cls: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20",
    icon: PenTool,
  },
  SIGNED: {
    label: "Signé",
    cls: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
    icon: CheckCircle2,
  },
  EXPIRED: {
    label: "Expiré",
    cls: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20",
    icon: AlertCircle,
  },
};

export default function MandatsPage() {
  const router = useRouter();
  useAuthGuard();
  const [mandates, setMandates] = useState<Mandate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initiating, setInitiating] = useState(false);

  useEffect(() => {
    loadMandates();
  }, []);

  const loadMandates = async () => {
    try {
      setLoading(true);
      const data = await fetchApi<Mandate[]>("/owner/mandates");
      setMandates(data);
    } catch (e: any) {
      setError(e.message);
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
      alert("Erreur lors de l'initiation : " + e.message);
    } finally {
      setInitiating(false);
    }
  };

  if (loading && mandates.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-welqo-terracotta border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-serif text-welqo-anthracite dark:text-white tracking-tight">
            Mandats de gestion
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Gérez vos contrats et signatures électroniques
          </p>
        </div>
        <Button
          onClick={handleInitiate}
          isLoading={initiating}
          variant="primary"
          icon={PenTool}
        >
          Nouveau mandat
        </Button>
      </div>

      {mandates.length === 0 ? (
        <LuxuryCard className="p-16 text-center">
          <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="w-8 h-8 text-slate-300" />
          </div>
          <h3 className="text-xl font-bold text-welqo-anthracite dark:text-white mb-2">
            Aucun mandat trouvé
          </h3>
          <p className="text-slate-500 max-w-sm mx-auto mb-8">
            Vous n'avez pas encore de mandat de gestion actif. Initiez-en un pour commencer l'aventure Welqo.
          </p>
          <Button onClick={handleInitiate} isLoading={initiating} variant="outline">
            Initier mon premier mandat
          </Button>
        </LuxuryCard>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {mandates.map((m, i) => {
            const config = STATUS_CONFIG[m.status] || STATUS_CONFIG.DRAFT;
            const Icon = config.icon;
            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <LuxuryCard className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl ${config.cls.split(' ')[0]} flex items-center justify-center shrink-0`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="font-bold text-welqo-anthracite dark:text-white">
                            Mandat #{m.id.slice(-6).toUpperCase()}
                          </h4>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${config.cls}`}>
                            {config.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-slate-400">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Créé le {new Date(m.createdAt).toLocaleDateString('fr-FR')}
                          </span>
                          {m.signedAt && (
                            <span className="flex items-center gap-1 text-emerald-600">
                              <CheckCircle2 className="w-3 h-3" />
                              Signé le {new Date(m.signedAt).toLocaleDateString('fr-FR')}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {m.status === 'PENDING_SIGNATURE' && (
                        <Button
                          variant="primary"
                          size="sm"
                          href={`https://mock-signature.welqo.fr/sign/${m.signatureId}`}
                          target="_blank"
                          icon={ExternalLink}
                          iconPosition="right"
                        >
                          Signer maintenant
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        Voir le PDF
                      </Button>
                    </div>
                  </div>
                </LuxuryCard>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10">
        <div className="p-8 bg-welqo-cream/30 dark:bg-welqo-anthracite/20 rounded-3xl border border-welqo-terracotta/10">
          <h4 className="font-serif text-xl text-welqo-anthracite dark:text-white mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-welqo-terracotta" />
            Pourquoi signer ?
          </h4>
          <p className="text-sm text-slate-500 leading-relaxed">
            Le mandat de gestion est le document légal nous autorisant à gérer votre bien en votre nom. 
            Il couvre l'assurance, la perception des loyers et l'entretien. 
            Tout est géré via <strong>Lex Persona</strong> pour une sécurité maximale.
          </p>
        </div>
        <div className="p-8 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-200 dark:border-slate-800">
          <h4 className="font-serif text-xl text-welqo-anthracite dark:text-white mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-slate-400" />
            Besoin d'aide ?
          </h4>
          <p className="text-sm text-slate-500 leading-relaxed mb-6">
            Si vous avez des questions sur les clauses du contrat, nos City Managers sont là pour vous éclairer.
          </p>
          <Button variant="ghost" size="sm" className="text-welqo-terracotta">
            Contacter Marc-Antoine (Lens) <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
