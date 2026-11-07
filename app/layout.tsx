import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ReduxProvider } from "@/redux/ReduxProvider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Meghswor - Parcel Management Dashboard",
  description: "Comprehensive parcel management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        <Toaster position="top-right" richColors />
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
