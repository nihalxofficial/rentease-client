// src/components/shared/TenantSidebar.jsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  CalendarCheck,
  Heart,
  User,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

// ==================== TENANT SIDEBAR ====================
export default function TenantSidebar({ isOpen = true }) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const menuItems = [
    {
      name: "Dashboard",
      href: "/dashboard/tenant",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      name: "My Bookings",
      href: "/dashboard/tenant/bookings",
      icon: CalendarCheck,
      exact: true,
    },
    {
      name: "Favorites",
      href: "/dashboard/tenant/favorites",
      icon: Heart,
      exact: true,
    },
    {
      name: "Profile",
      href: "/dashboard/tenant/profile",
      icon: User,
      exact: true,
    },
    {
      name: "Settings",
      href: "/dashboard/tenant/settings",
      icon: Settings,
      exact: true,
    },
  ];

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleLogout = async () => {
    await authClient.signOut();
  };

  const getUserInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const NavItem = ({ item }) => {
    // Exact match for active state
    const isActive = item.exact 
      ? pathname === item.href 
      : pathname?.startsWith(item.href + '/') || pathname === item.href;
    
    const Icon = item.icon;

    return (
      <Link
        href={item.href}
        onClick={() => setIsMobileOpen(false)}
        className={`
          flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
          ${isActive 
            ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-[0_4px_14px_rgba(37,99,235,0.3)]" 
            : "text-gray-600 hover:text-blue-700 hover:bg-blue-50/80"
          }
        `}
      >
        <Icon className="w-4.5 h-4.5 flex-shrink-0" strokeWidth={2.2} />
        <span className={`text-sm font-medium ${isActive ? "text-white" : ""}`}>
          {item.name}
        </span>
        {isActive && (
          <motion.span
            layoutId="sidebar-active-indicator"
            className="ml-auto w-1.5 h-6 bg-white rounded-full shadow-sm"
          />
        )}
      </Link>
    );
  };

  return (
    <>
      <button
        onClick={toggleMobileSidebar}
        className={`
          lg:hidden fixed top-20 left-4 z-50 p-2 bg-white rounded-xl shadow-lg border border-gray-100 hover:bg-gray-50 transition-all duration-300 cursor-pointer
          ${isMobileOpen ? "opacity-0 pointer-events-none scale-75" : "opacity-100 pointer-events-auto scale-100"}
        `}
      >
        <Menu className="w-5 h-5 text-gray-600" strokeWidth={2.2} />
      </button>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      <motion.aside
        className={`
          fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] bg-white/95 backdrop-blur-xl border-r border-gray-200/60
          transition-all duration-300 flex flex-col overflow-hidden w-64
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <button
          onClick={() => setIsMobileOpen(false)}
          className={`
            lg:hidden absolute top-3 right-3 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer
            ${isMobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
          `}
        >
          <X className="w-5 h-5 text-gray-600" strokeWidth={2.2} />
        </button>

        <div className="flex items-center gap-3 p-4 border-b border-gray-100/60 flex-shrink-0">
          <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
            {user?.image ? (
              <Image src={user.image} alt="avatar" fill className="object-cover" />
            ) : (
              getUserInitials(user?.name)
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-gray-900 truncate">
              {user?.name || "User"}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {user?.email}
            </p>
            <span className="inline-block mt-0.5 px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-semibold rounded-full">
              Tenant
            </span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {menuItems.map((item) => (
            <NavItem key={item.name} item={item} />
          ))}
        </nav>

        <div className="border-t border-gray-100/60 p-3 flex-shrink-0">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 w-full text-red-600 hover:bg-red-50 cursor-pointer"
          >
            <LogOut className="w-4.5 h-4.5 flex-shrink-0" strokeWidth={2.2} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </motion.aside>
    </>
  );
}