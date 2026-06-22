// src/components/shared/Navbar.jsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Building2,
  Info,
  Star,
  Phone,
  User,
  UserPlus,
  Menu,
  X,
  LogOut,
  Settings,
  LayoutDashboard,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Navigation links configuration
const navLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "All Properties", href: "/properties", icon: Building2 },
  { name: "About", href: "/about", icon: Info },
  { name: "Reviews", href: "/reviews", icon: Star },
  { name: "Contact", href: "/contact", icon: Phone },
];

// ==================== NAVBAR COMPONENT ====================
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check login status (mock - replace with actual auth)
  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMenuOpen(false);
  }, [pathname]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isDropdownOpen && !e.target.closest(".user-dropdown")) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isDropdownOpen]);

  const NavLink = ({ link, isMobile = false }) => {
    const isActive = pathname === link.href;
    const Icon = link.icon;

    return (
      <Link
        href={link.href}
        className={`
          relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
          ${
            isActive
              ? "text-white bg-linear-to-r from-blue-600 to-blue-700 shadow-[0_4px_16px_rgba(37,99,235,0.35)]"
              : "text-gray-600 hover:text-blue-700 hover:bg-blue-50/80"
          }
          ${isMobile ? "px-5 py-3.5 text-base w-full" : ""}
        `}
      >
        <Icon className={`${isMobile ? "w-5 h-5" : "w-4.5 h-4.5"} transition-colors`} strokeWidth={2.2} />
        <span className={isActive ? "font-semibold" : ""}>{link.name}</span>
        {isActive && !isMobile && (
          <motion.span
            layoutId="navbar-active-indicator"
            className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-white/80 rounded-full"
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
        {isActive && isMobile && (
          <span className="ml-auto w-1.5 h-7 bg-white rounded-full shadow-sm" />
        )}
      </Link>
    );
  };

  return (
    <>
      {/* ========== NAVBAR ========== */}
      <nav
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-400
          ${
            isScrolled
              ? "bg-white/92 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border-b border-gray-200/60"
              : "bg-white/70 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.02)] border-b border-gray-100/40"
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* ========== LOGO ========== */}
            <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0 transition-transform hover:scale-[1.02] active:scale-95">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-[0_4px_14px_rgba(37,99,235,0.4)] flex-shrink-0 transition-all duration-300 group-hover:shadow-[0_6px_24px_rgba(37,99,235,0.5)] group-hover:brightness-105">
                <Building2 className="w-5 h-5 text-white" strokeWidth={2.2} />
              </div>
              <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                Rent<span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">Ease</span>
              </span>
            </Link>

            {/* ========== DESKTOP NAVIGATION ========== */}
            <div className="hidden md:flex items-center gap-1.5 bg-gray-50/50 px-2 py-1.5 rounded-2xl border border-gray-100/60 shadow-inner">
              {navLinks.map((link) => (
                <NavLink key={link.name} link={link} />
              ))}
            </div>

            {/* ========== RIGHT SIDE ========== */}
            <div className="flex items-center gap-3">
              {/* Auth Buttons */}
              {!isLoggedIn ? (
                <>
                  <Link
                    href="/login"
                    className="hidden md:flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-[0_4px_14px_rgba(37,99,235,0.3)] hover:shadow-[0_8px_24px_rgba(37,99,235,0.4)] transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
                  >
                    <User className="w-4 h-4" strokeWidth={2.2} />
                    <span>Login</span>
                  </Link>
                  <Link
                    href="/register"
                    className="hidden md:flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-blue-700 bg-white border-2 border-blue-600/30 rounded-xl hover:border-blue-600 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 hover:text-white hover:shadow-[0_4px_16px_rgba(37,99,235,0.25)] transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <UserPlus className="w-4 h-4" strokeWidth={2.2} />
                    <span>Register</span>
                  </Link>
                </>
              ) : (
                // ========== USER DROPDOWN ==========
                <div className="hidden md:block relative user-dropdown">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`
                      flex items-center gap-2 p-1.5 pr-3 rounded-xl transition-all duration-200
                      ${isDropdownOpen 
                        ? "bg-blue-50 border border-blue-200/60 shadow-[0_4px_12px_rgba(37,99,235,0.12)]" 
                        : "hover:bg-gray-100/80 border border-transparent hover:border-gray-200/60"
                      }
                    `}
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-[0_2px_8px_rgba(37,99,235,0.3)]">
                      JD
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                      strokeWidth={2.2}
                    />
                  </button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.96 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute right-0 mt-2.5 w-60 bg-white rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.12)] border border-gray-100/80 py-1.5 overflow-hidden"
                      >
                        {/* User Info */}
                        <div className="px-5 py-3.5 border-b border-gray-100 mb-1 bg-gradient-to-r from-blue-50/50 to-transparent">
                          <p className="text-sm font-bold text-gray-900">
                            John Doe
                          </p>
                          <p className="text-xs text-gray-500 truncate font-medium">
                            john@example.com
                          </p>
                        </div>

                        {/* Menu Items */}
                        <Link
                          href="/profile"
                          className="flex items-center gap-3.5 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                        >
                          <User className="w-4 h-4 text-gray-400" strokeWidth={2.2} />
                          <span>Profile</span>
                        </Link>
                        <Link
                          href="/dashboard"
                          className="flex items-center gap-3.5 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4 text-gray-400" strokeWidth={2.2} />
                          <span>Dashboard</span>
                        </Link>
                        <Link
                          href="/settings"
                          className="flex items-center gap-3.5 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                        >
                          <Settings className="w-4 h-4 text-gray-400" strokeWidth={2.2} />
                          <span>Settings</span>
                        </Link>
                        <div className="border-t border-gray-100 mt-1.5 pt-1.5">
                          <button
                            onClick={() => {
                              localStorage.removeItem("user");
                              setIsLoggedIn(false);
                              setIsDropdownOpen(false);
                            }}
                            className="flex items-center gap-3.5 px-5 py-2.5 w-full text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <LogOut className="w-4 h-4" strokeWidth={2.2} />
                            <span>Logout</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`
                  md:hidden p-2 rounded-xl transition-all duration-200
                  ${isMenuOpen 
                    ? "bg-blue-50 text-blue-700 border border-blue-200/60" 
                    : "text-gray-600 hover:bg-gray-100/80 border border-transparent hover:border-gray-200/60"
                  }
                `}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" strokeWidth={2.2} />
                ) : (
                  <Menu className="w-6 h-6" strokeWidth={2.2} />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ========== MOBILE MENU ========== */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="fixed inset-x-0 top-16 z-40 bg-white/98 backdrop-blur-xl border-b border-gray-200/60 md:hidden max-h-[calc(100vh-4rem)] overflow-y-auto shadow-[0_16px_48px_rgba(0,0,0,0.08)]"
          >
            <div className="px-4 py-5 space-y-1.5">
              {/* Nav Links */}
              {navLinks.map((link) => (
                <NavLink key={link.name} link={link} isMobile={true} />
              ))}

              <div className="border-t border-gray-200/60 mt-5 pt-5 space-y-3">
                {!isLoggedIn ? (
                  <>
                    <Link
                      href="/login"
                      className="flex items-center justify-center gap-2.5 w-full px-4 py-3.5 font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-[0_4px_14px_rgba(37,99,235,0.3)] transition-all duration-200 active:scale-[0.98]"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="w-4.5 h-4.5" strokeWidth={2.2} />
                      <span>Login</span>
                    </Link>
                    <Link
                      href="/register"
                      className="flex items-center justify-center gap-2.5 w-full px-4 py-3.5 font-semibold text-blue-700 bg-white border-2 border-blue-600/30 rounded-xl hover:border-blue-600 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 hover:text-white transition-all duration-200 active:scale-[0.98]"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <UserPlus className="w-4.5 h-4.5" strokeWidth={2.2} />
                      <span>Register</span>
                    </Link>
                  </>
                ) : (
                  <>
                    {/* Mobile User Info */}
                    <div className="flex items-center gap-3.5 px-4 py-3 bg-gradient-to-r from-blue-50/70 to-transparent rounded-2xl mb-3 border border-blue-100/50">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-[0_2px_10px_rgba(37,99,235,0.3)]">
                        JD
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-gray-900 truncate">
                          John Doe
                        </p>
                        <p className="text-xs font-medium text-gray-500 truncate">
                          john@example.com
                        </p>
                      </div>
                    </div>

                    <Link
                      href="/profile"
                      className="flex items-center gap-3.5 px-4 py-3.5 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-all"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="w-5 h-5 text-gray-400" strokeWidth={2.2} />
                      <span className="font-medium">Profile</span>
                    </Link>
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-3.5 px-4 py-3.5 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-all"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <LayoutDashboard className="w-5 h-5 text-gray-400" strokeWidth={2.2} />
                      <span className="font-medium">Dashboard</span>
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center gap-3.5 px-4 py-3.5 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-all"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Settings className="w-5 h-5 text-gray-400" strokeWidth={2.2} />
                      <span className="font-medium">Settings</span>
                    </Link>
                    <button
                      onClick={() => {
                        localStorage.removeItem("user");
                        setIsLoggedIn(false);
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center gap-3.5 px-4 py-3.5 w-full font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <LogOut className="w-5 h-5" strokeWidth={2.2} />
                      <span>Logout</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}