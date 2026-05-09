import React from "react";
import { Footer } from "@welqo/ui";
import { Sidebar } from "../../../components/Sidebar";

export default function DashboardLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar />
      <div className="flex-grow flex flex-col">
        <main className="p-8 lg:p-12">{children}</main>
        <Footer locale={locale} />
      </div>
    </div>
  );
}
