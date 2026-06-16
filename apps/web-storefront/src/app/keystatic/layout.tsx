import React from "react";

export default function KeystaticLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}

export const metadata = {
  title: "Keystatic Admin",
  robots: { index: false },
};
export const dynamic = "force-dynamic";
