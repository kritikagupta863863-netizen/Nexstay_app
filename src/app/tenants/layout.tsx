"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TenantsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const tabs = [
    { label: "Management", href: "/tenants/management" },
    { label: "Complaints", href: "/tenants/complaints" },
    { label: "Reminders", href: "/tenants/reminders" },
    { label: "Notify", href: "/tenants/notifications" },
  ];

  // We only show these tabs on mobile. On desktop, they appear in the sidebar.
  return (
    <div className="flex flex-col min-h-screen pb-24 md:pb-0">
      {/* Mobile Sub-navigation Tabs */}
      <nav className="md:hidden w-full bg-surface-container-lowest border-b border-outline-variant sticky top-[64px] z-40">
        <div className="flex max-w-[1440px] mx-auto px-4 overflow-x-auto hide-scrollbar">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href || pathname?.startsWith(tab.href + "/");
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`px-6 py-3 border-b-2 font-label text-label-caps text-xs font-bold whitespace-nowrap transition-colors ${
                  isActive
                    ? "border-secondary text-secondary"
                    : "border-transparent text-on-surface-variant hover:text-secondary"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
