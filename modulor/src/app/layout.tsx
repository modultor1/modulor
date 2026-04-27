import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const comfortaa = localFont({
  src: [
    { path: "../fonts/Comfortaa-Light.ttf",   weight: "300", style: "normal" },
    { path: "../fonts/Comfortaa-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/Comfortaa-Bold.ttf",    weight: "700", style: "normal" },
  ],
  variable: "--font-comfortaa",
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
    <html lang="fr" className={`${comfortaa.variable} h-full`}>
      {/* suppressHydrationWarning évite le conflit avec les extensions navigateur */}
      <body className="min-h-full flex flex-col antialiased" suppressHydrationWarning>{children}</body>
    </html>
  );
}
