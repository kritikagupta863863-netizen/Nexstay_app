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
    { id: "complaints", label: "Complaints", icon: "priority_high", href: "/complaints" },
  ];

  return (
    <div className="hidden md:flex fixed left-0 top-16 h-[calc(100vh-64px)] w-[260px] bg-surface-container-lowest border-r border-outline-variant flex-col py-6 px-4 z-40 overflow-y-auto">
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => {
          const isActive = activeNav === item.id;
          return (
            <Link 
              key={item.id} 
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
          );
        })}
      </nav>
    </div>
  );
}
