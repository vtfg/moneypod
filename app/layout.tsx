import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Toaster } from "~/components/ui/sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Moneypod",
    template: `%s | Moneypod`,
  },
  description: "Controle suas finanças de maneira fácil, rápida e interativa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
