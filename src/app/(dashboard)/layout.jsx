// src/components/dashboard/DashboardLayout.jsx
"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import DashboardNavbar from "@/components/shared/DashboardNavbar";
import OwnerSidebar from "@/components/shared/OwnerSidebar";
import TenantSidebar from "@/components/shared/TenantSidebar";
import AdminSidebar from "@/components/shared/AdminSidebar";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Determine which sidebar to show based on the route
  const isOwnerRoute = pathname?.startsWith('/dashboard/owner');
  const isTenantRoute = pathname?.startsWith('/dashboard/tenant');
  const isAdminRoute = pathname?.startsWith('/dashboard/admin');

  let SidebarComponent = null;
  if (isOwnerRoute) SidebarComponent = OwnerSidebar;
  else if (isTenantRoute) SidebarComponent = TenantSidebar;
  else if (isAdminRoute) SidebarComponent = AdminSidebar;

  // Close sidebar on mobile when route changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50/50">
      <DashboardNavbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <div className="flex pt-16">
        {SidebarComponent && <SidebarComponent isOpen={isSidebarOpen} />}
        <main 
          className={`
            flex-1 transition-all duration-300 min-h-[calc(100vh-4rem)]
            ${isSidebarOpen ? "lg:ml-64" : "lg:ml-0"}
          `}
        >
          <div className="p-4 md:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}