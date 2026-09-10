import type { Metadata } from "next";
import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "NexStay Owner",
  description: "Calm, precise operations for PG owners."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
      </head>
      <body>
        <AppHeader />
        <AppSidebar />
        <div className="md:pl-[260px] min-h-screen bg-surface">
          {children}
        </div>
      </body>
    </html>
  );
}
