import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NexStay Owner",
  description: "Calm, precise operations for PG owners."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
