import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ecopower - Gestion de Consommation Électrique | Solution Intelligente au Togo",
  description: "Application simple et efficace pour gérer votre consommation électrique au Togo. Suivez vos relevés, générez vos factures automatiquement et gardez le contrôle sur vos dépenses.",
  keywords: "ecopower, gestion électrique, factures, consommation, énergie, Togo, Lomé, gestion résidentielle, suivi consommation, facturation automatique",
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
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
