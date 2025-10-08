// src/app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AppLayout from "@/components/AppLayout";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Taise Silva - Corretora de Imóveis",
  description: "Encontre o imóvel dos seus sonhos em Uberlândia e região.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.className} bg-gray-100`}>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}