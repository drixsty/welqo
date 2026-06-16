import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { reader } from "../../../lib/reader";
import {
  DocumentRenderer,
  DocumentRendererProps,
} from "@keystatic/core/renderer";

const BASE_URL = "https://welqo.fr";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const page = await reader.collections.pages.read("mentions-legales");
  if (!page) return {};

  const title = locale !== "en" ? page.titleFr : page.titleEn;
  const description = locale !== "en" ? page.descriptionFr : page.descriptionEn;

  return {
    title,
    description,
    robots: { index: false },
  };
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getTextFromReactNode(node: any): string {
  if (!node) return "";
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getTextFromReactNode).join("");
  if (node.props && node.props.children)
    return getTextFromReactNode(node.props.children);
  return "";
}

export default async function MentionsLegalesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const page = await reader.collections.pages.read("mentions-legales");
  if (!page) notFound();

  const t = await getTranslations({ locale, namespace: "MentionsLegales" });
  const base = `/${locale}`;

  const title = locale !== "en" ? page.titleFr : page.titleEn;
  const description = locale !== "en" ? page.descriptionFr : page.descriptionEn;
  const contentNodes = await (locale !== "en"
    ? page.contentFr()
    : page.contentEn());

  // Dynamically generate the TOC from H2 headings
  const toc = contentNodes
    .filter((node: any) => node.type === "heading" && node.level === 2)
    .map((node: any) => {
      const text = node.children.map((c: any) => c.text || "").join("");
      return {
        id: slugify(text),
        text,
      };
    });

  const renderers: DocumentRendererProps["renderers"] = {
    block: {
      heading: ({ level, children }) => {
        const textContent = getTextFromReactNode(children);
        const id = slugify(textContent);
        const Heading = `h${level}` as any;
        return (
          <Heading id={id} className="scroll-mt-28">
            {children}
          </Heading>
        );
      },
    },
  };

  return (
    <main className="min-h-screen bg-white dark:bg-black overflow-hidden selection:bg-welqo-terracotta/20">
      {/* Header cinématique */}
      <div className="relative py-24 px-4 bg-slate-950">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(212,85,55,0.15),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_20%_80%,rgba(15,23,42,0.5),transparent)]" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <Link
            href={base}
            className="group inline-flex items-center gap-2 text-slate-400 font-bold text-[10px] tracking-[0.2em] hover:text-white transition-colors mb-12"
          >
            <svg
              className="w-4 h-4 transition-transform group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            {t("backHome")}
          </Link>

          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-[0.95] mb-8">
            {locale !== "en" ? "Mentions" : "Legal"}
            <br />
            <span className="text-welqo-terracotta">
              {locale !== "en" ? "légales." : "notice."}
            </span>
          </h1>

          <div className="flex items-center gap-4 text-slate-500">
            <span className="text-[10px] font-bold tracking-widest px-3 py-1 bg-white/5 border border-white/10 rounded-full">
              {t("transparency")}
            </span>
            <span className="text-[10px] font-bold tracking-widest">
              Dernière mise à jour : {new Date(page.updatedAt).getFullYear()}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Sommaire — Desktop only */}
          {toc.length > 0 && (
            <aside className="hidden lg:block lg:col-span-4 sticky top-12 h-fit">
              <div className="p-8 rounded-3xl border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-sm">
                <p className="text-[10px] font-black tracking-[0.2em] text-slate-400 mb-8">
                  {t("summary")}
                </p>
                <nav className="space-y-5">
                  {toc.map((section, i) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="block text-xs font-bold text-slate-500 hover:text-welqo-terracotta transition-colors"
                    >
                      <span className="text-slate-300 dark:text-slate-700 mr-3">
                        0{i + 1}
                      </span>
                      {section.text}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          )}

          {/* Contenu principal */}
          <div
            className={`${toc.length > 0 ? "lg:col-span-8" : "lg:col-span-12"} space-y-24`}
          >
            <div className="prose prose-slate dark:prose-invert max-w-none prose-p:text-[15px] prose-p:leading-relaxed prose-p:text-slate-500 dark:prose-p:text-slate-400 prose-headings:text-slate-900 dark:prose-headings:text-white prose-h2:text-3xl prose-h2:font-bold prose-h2:tracking-tighter prose-h2:mb-8 prose-h2:mt-16 first:prose-h2:mt-0">
              <DocumentRenderer document={contentNodes} renderers={renderers} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
