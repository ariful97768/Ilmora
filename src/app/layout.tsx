import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Ilmora",
  description: "University management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <SessionProvider>{children}</SessionProvider>
        <Toaster position="top-center"/>
      </body>
    </html>
  );
}
