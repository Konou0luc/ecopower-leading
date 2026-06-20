import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Ecopower - Solution de Gestion Énergétique Professionnelle",
  description: "Optimisez votre consommation électrique avec Ecopower. Monitoring en temps réel, facturation automatisée et gestion intelligente pour les résidences et entreprises.",
  keywords: "ecopower, gestion énergétique, monitoring électrique, facturation intelligente, optimisation énergie, Togo, Lomé, smart energy",
  icons: {
    icon: [
      { url: '/logo.png', type: 'image/png' },
    ],
    apple: [
      { url: '/logo.png', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${montserrat.className} ${montserrat.variable} antialiased`}>{children}</body>
    </html>
  );
}
