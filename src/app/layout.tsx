import type { Metadata } from "next";

// Static metadata so Lighthouse can find the description in the initial <head>
export const metadata: Metadata = {
  description:
    "Firme de gestion de projet spécialisée en consultation PMO, gestion de portefeuille et transformation Agile à Gatineau-Ottawa.",
};

// Root layout redirects to [locale] layout
// This file is required by Next.js but all rendering happens in [locale]/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
