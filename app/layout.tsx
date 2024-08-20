import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { cn } from "~/lib/utils";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ledger",
  description: "Controle suas finanças de maneira fácil, rápida e interativa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={cn(inter.className, "dark")}>{children}</body>
    </html>
  );
}
