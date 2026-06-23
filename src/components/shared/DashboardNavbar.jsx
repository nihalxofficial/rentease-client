// src/components/dashboard/DashboardNavbar.jsx - Updated (remove the mobile hamburger)
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Bell,
  User,
  Settings,
  LogOut,
  LayoutDashboard,
  Building2,
  ChevronDown,
  MessageCircle,
  CalendarCheck,
  CheckCircle,
  DollarSign,
  ArrowRight,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

const pageTitles = {
  "/dashboard/owner": "Dashboard",
  "/dashboard/owner/add-property": "Add Property",
  "/dashboard/owner/properties": "My Properties",
  "/dashboard/owner/bookings": "Booking Requests",
  "/dashboard/owner/settings": "Settings",
  "/dashboard/owner/profile": "Profile",
};

export default function DashboardNavbar({ toggleSidebar, isSidebarOpen }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notificationRef.current && !notificationRef.current.contains(e.target)) {
        setIsNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const notifications = [
    {
      id: 1,
      title: "New booking request",
      description: "Sarah Johnson wants to book Modern Apartment",
      time: "5 min ago",
      read: false,
      icon: CalendarCheck,
      color: "blue",
    },
    {
      id: 2,
      title: "Property approved",
      description: "Your property 'Luxury Villa' has been approved",
      time: "2 hours ago",
      read: false,
      icon: CheckCircle,
      color: "emerald",
    },
    {
      id: 3,
      title: "New message",
      description: "Michael Chen sent you a message about Studio Loft",
      time: "1 day ago",
      read: true,
      icon: MessageCircle,
      color: "purple",
    },
    {
      id: 4,
      title: "Payment received",
      description: "You received $1,200 from John Doe",
      time: "2 days ago",
      read: true,
      icon: DollarSign,
      color: "emerald",
    },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getColorStyles = (color) => {
    const colors = {
      blue: { bg: "bg-blue-50", icon: "text-blue-600" },
      emerald: { bg: "bg-emerald-50", icon: "text-emerald-600" },
      purple: { bg: "bg-purple-50", icon: "text-purple-600" },
      orange: { bg: "bg-orange-50", icon: "text-orange-600" },
      rose: { bg: "bg-rose-50", icon: "text-rose-600" },
    };
    return colors[color] || colors.blue;
  };

  const profileLinks = [
    { name: "Profile", href: "/dashboard/owner/profile", icon: User },
    { name: "Dashboard", href: "/dashboard/owner", icon: LayoutDashboard },
    { name: "My Properties", href: "/dashboard/owner/properties", icon: Building2 },
    { name: "Settings", href: "/dashboard/owner/settings", icon: Settings },
  ];

  const currentTitle = pageTitles[pathname] || "Dashboard";

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-400
        ${isScrolled
          ? "bg-white/92 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.06)] border-b border-gray-200/60"
          : "bg-white/70 backdrop-blur-md border-b border-gray-100/40"
        }
      `}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Side - Logo */}
          <div className="flex items-center gap-3">
            {/* Website Logo - Links to Home */}
            <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0 transition-transform hover:scale-[1.02] active:scale-95">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-[0_4px_14px_rgba(37,99,235,0.4)] flex-shrink-0 transition-all duration-300 group-hover:shadow-[0_6px_24px_rgba(37,99,235,0.5)] group-hover:brightness-105">
                <Building2 className="w-4.5 h-4.5 text-white" strokeWidth={2.2} />
              </div>
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                Rent<span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">Ease</span>
              </span>
            </Link>

            {/* Page Title */}
            <div className="hidden sm:block">
              <span className="text-gray-400 mx-2">/</span>
              <span className="text-sm font-medium text-gray-600">
                {currentTitle}
              </span>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className={`relative transition-all duration-300 ${isSearchOpen ? "w-64 md:w-80" : "w-10"}`}>
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 rounded-xl hover:bg-gray-100/80 transition-all cursor-pointer text-gray-500"
              >
                <Search className="w-5 h-5" strokeWidth={2.2} />
              </button>
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.input
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "100%" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="absolute left-10 w-full px-4 py-2 bg-gray-50/80 border-2 border-blue-100/50 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-sm text-gray-800 placeholder:text-gray-400"
                    autoFocus
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative p-2 rounded-xl hover:bg-gray-100/80 transition-all cursor-pointer text-gray-500"
              >
                <Bell className="w-5 h-5" strokeWidth={2.2} />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {isNotificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.12)] border border-gray-100/80 py-2 overflow-hidden z-50"
                  >
                    <div className="px-4 py-2 border-b border-gray-100">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-gray-900">Notifications</h4>
                        {unreadCount > 0 && (
                          <button className="text-xs text-blue-600 hover:text-blue-700 font-medium cursor-pointer">
                            Mark all read
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map((notification) => {
                        const Icon = notification.icon;
                        const colors = getColorStyles(notification.color);
                        return (
                          <div
                            key={notification.id}
                            className={`flex items-start gap-3 px-4 py-3 hover:bg-gray-50/80 transition-colors cursor-pointer ${!notification.read ? "bg-blue-50/30" : ""}`}
                          >
                            <div className={`w-9 h-9 ${colors.bg} rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5`}>
                              <Icon className={`w-4 h-4 ${colors.icon}`} strokeWidth={2.2} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-gray-900">{notification.title}</p>
                              <p className="text-xs text-gray-500 truncate">{notification.description}</p>
                              <p className="text-[10px] text-gray-400 mt-0.5">{notification.time}</p>
                            </div>
                            {!notification.read && <span className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2" />}
                          </div>
                        );
                      })}
                    </div>
                    <div className="px-4 py-2 border-t border-gray-100">
                      <Link
                        href="#"
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center gap-1 cursor-pointer"
                        onClick={() => setIsNotificationsOpen(false)}
                      >
                        View all notifications
                        <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className={`
                  flex items-center gap-2 p-1.5 pr-3 rounded-xl transition-all duration-200 cursor-pointer
                  ${isProfileOpen
                    ? "bg-blue-50 border border-blue-200/60 shadow-[0_4px_12px_rgba(37,99,235,0.12)]"
                    : "hover:bg-gray-100/80 border border-transparent hover:border-gray-200/60"
                  }
                `}
              >
                <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                  {user?.image ? (
                    <Image src={user.image} alt="avatar" fill className="object-cover" sizes="32px" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                      {getUserInitials(user?.name)}
                    </div>
                  )}
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-sm font-semibold text-gray-900 truncate max-w-24">
                    {user?.name || "User"}
                  </p>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${isProfileOpen ? "rotate-180" : ""}`}
                  strokeWidth={2.2}
                />
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2.5 w-56 bg-white rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.12)] border border-gray-100/80 py-1.5 overflow-hidden z-50"
                  >
                    <div className="px-4 py-3 border-b border-gray-100 mb-1 bg-gradient-to-r from-blue-50/50 to-transparent">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                          {user?.image ? (
                            <Image src={user.image} alt="avatar" fill className="object-cover" sizes="40px" />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                              {getUserInitials(user?.name)}
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">{user?.name || "User"}</p>
                          <p className="text-xs text-gray-500 truncate max-w-32">{user?.email}</p>
                        </div>
                      </div>
                    </div>

                    {profileLinks.map((link) => {
                      const Icon = link.icon;
                      return (
                        <Link
                          key={link.name}
                          href={link.href}
                          className="flex items-center gap-3.5 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <Icon className="w-4 h-4 text-gray-400" strokeWidth={2.2} />
                          <span>{link.name}</span>
                        </Link>
                      );
                    })}

                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3.5 px-4 py-2.5 w-full text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" strokeWidth={2.2} />
                        <span>Logout</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}