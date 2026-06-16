import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const ttInterphases = localFont({
  src: [
    { path: "../fonts/TTInterphasesPro-Light.ttf",    weight: "300", style: "normal" },
    { path: "../fonts/TTInterphasesPro-Regular.ttf",  weight: "400", style: "normal" },
    { path: "../fonts/TTInterphasesPro-DemiBold.ttf", weight: "600", style: "normal" },
    { path: "../fonts/TTInterphasesPro-Bold.ttf",     weight: "700", style: "normal" },
  ],
  variable: "--font-tt-interphases",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Modulor – Apprenez autrement",
  description:
    "Modulor est une plateforme d'apprentissage en ligne spécialisée dans les filières techniques et professionnelles. Parcours modulable, cours vidéo et ateliers pratiques.",
  keywords: ["formation", "e-learning", "technique", "professionnel", "modulor"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${ttInterphases.variable} h-full`}>
      {/* suppressHydrationWarning évite le conflit avec les extensions navigateur */}
      <body className="min-h-full flex flex-col antialiased" suppressHydrationWarning>{children}</body>
    </html>
  );
}
