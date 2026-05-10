import React from "react";
import { Sidebar } from "../../../components/Sidebar";
import { MobileNav } from "../../../components/MobileNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="hidden lg:flex">
        <Sidebar />
      </div>

      <div className="flex-grow flex flex-col min-w-0">
        <main className="p-4 md:p-6 lg:p-8 pb-24 lg:pb-8 flex-grow">
          {children}
        </main>
      </div>

      <MobileNav />
    </div>
  );
}
