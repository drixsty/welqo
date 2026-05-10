import React from "react";
import { Sidebar } from "../../../components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar />
      <div className="flex-grow flex flex-col">
        <main className="p-8 lg:p-12 flex-grow">{children}</main>
      </div>
    </div>
  );
}
