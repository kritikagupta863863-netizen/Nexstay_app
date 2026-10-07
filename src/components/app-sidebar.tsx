"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppSidebar() {
  const pathname = usePathname();
  
  // Determine active section from pathname
  let activeNav = "dashboard";
  if (pathname?.startsWith("/rooms")) activeNav = "rooms";
  if (pathname?.startsWith("/tenants")) activeNav = "tenants";
  if (pathname?.startsWith("/billing")) activeNav = "billing";
  if (pathname?.startsWith("/complaints")) activeNav = "complaints";

  const navItems = [
    { id: "overview", label: "Overview", icon: "home", href: "/" },
    { id: "rooms", label: "Rooms & beds", icon: "grid_view", href: "/rooms" },
    { id: "tenants", label: "Tenants", icon: "person", href: "/tenants" },
    { id: "billing", label: "Billing", icon: "currency_rupee", href: "/billing" },
  ];

  return (
    <div className="hidden md:flex fixed left-0 top-16 h-[calc(100vh-64px)] w-[260px] bg-surface-container-lowest border-r border-outline-variant flex-col py-6 px-4 z-40 overflow-y-auto">
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => {
          const isActive = activeNav === item.id;
          return (
            <div key={item.id} className="flex flex-col">
              <Link 
                href={item.href}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-lg transition-colors cursor-pointer ${
                  isActive 
                    ? "bg-secondary-fixed text-secondary font-bold" 
                    : "text-on-surface-variant hover:bg-surface-container-low font-medium"
                }`}
              >
                <span 
                  className="material-symbols-outlined text-xl" 
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  {item.icon}
                </span>
                <span className="text-[15px]">{item.label}</span>
              </Link>

              {isActive && item.id === "tenants" && (
                <div className="flex flex-col ml-11 mt-1 mb-2 gap-1 border-l-2 border-outline-variant pl-4">
                  {[
                    { label: "Management", href: "/tenants/management" },
                    { label: "Complaints", href: "/tenants/complaints" },
                    { label: "Reminders", href: "/tenants/reminders" },
                  ].map(sub => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className={`py-2 text-sm transition-colors ${
                        pathname === sub.href || pathname?.startsWith(sub.href + "/")
                          ? "text-secondary font-bold"
                          : "text-on-surface-variant hover:text-on-surface"
                      }`}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}
