// src/app/dashboard/admin/page.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Users,
  Building2,
  CalendarCheck,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Clock,
  Sparkles,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

// ==================== ADMIN DASHBOARD PAGE ====================
export default function AdminDashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("weekly");

  // ========== STATS DATA ==========
  const stats = [
    {
      title: "Total Users",
      value: "2,847",
      icon: Users,
      color: "blue",
      change: "+12.5%",
      trend: "up",
    },
    {
      title: "Total Properties",
      value: "1,243",
      icon: Building2,
      color: "emerald",
      change: "+8.2%",
      trend: "up",
    },
    {
      title: "Total Bookings",
      value: "3,891",
      icon: CalendarCheck,
      color: "purple",
      change: "+23.1%",
      trend: "up",
    },
    {
      title: "Revenue",
      value: "$284,500",
      icon: DollarSign,
      color: "orange",
      change: "+15.3%",
      trend: "up",
    },
  ];

  // ========== CHART DATA ==========
  const weeklyData = [
    { day: "Mon", bookings: 78, revenue: 4500 },
    { day: "Tue", bookings: 92, revenue: 5200 },
    { day: "Wed", bookings: 65, revenue: 3800 },
    { day: "Thu", bookings: 105, revenue: 6200 },
    { day: "Fri", bookings: 56, revenue: 3200 },
    { day: "Sat", bookings: 145, revenue: 8500 },
    { day: "Sun", bookings: 82, revenue: 4800 },
  ];

  const monthlyData = [
    { month: "Jan", bookings: 156, revenue: 12500 },
    { month: "Feb", bookings: 178, revenue: 14200 },
    { month: "Mar", bookings: 145, revenue: 11800 },
    { month: "Apr", bookings: 210, revenue: 16800 },
    { month: "May", bookings: 120, revenue: 9800 },
    { month: "Jun", bookings: 245, revenue: 19200 },
  ];

  const chartData = selectedPeriod === "weekly" ? weeklyData : monthlyData;

  const getColorStyles = (color) => {
    const colors = {
      blue: { bg: "bg-blue-50", iconBg: "bg-blue-100", icon: "text-blue-600", border: "border-blue-200/60" },
      emerald: { bg: "bg-emerald-50", iconBg: "bg-emerald-100", icon: "text-emerald-600", border: "border-emerald-200/60" },
      purple: { bg: "bg-purple-50", iconBg: "bg-purple-100", icon: "text-purple-600", border: "border-purple-200/60" },
      orange: { bg: "bg-orange-50", iconBg: "bg-orange-100", icon: "text-orange-600", border: "border-orange-200/60" },
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            Admin <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700">Dashboard</span>
          </h1>
          <p className="text-gray-500 mt-1">Monitor platform activity and manage users.</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <button
            onClick={() => setSelectedPeriod("weekly")}
            className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${
              selectedPeriod === "weekly"
                ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md"
                : "bg-white text-gray-600 hover:bg-gray-50 border-2 border-gray-200"
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setSelectedPeriod("monthly")}
            className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${
              selectedPeriod === "monthly"
                ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md"
                : "bg-white text-gray-600 hover:bg-gray-50 border-2 border-gray-200"
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const colors = getColorStyles(stat.color);

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={`bg-white rounded-2xl p-5 border-2 ${colors.border} shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
                  <p className="text-2xl font-extrabold text-gray-900 mt-1">{stat.value}</p>
                  <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${stat.trend === "up" ? "text-emerald-600" : "text-rose-600"}`}>
                    {stat.trend === "up" ? (
                      <TrendingUp className="w-3 h-3" strokeWidth={2.5} />
                    ) : (
                      <TrendingDown className="w-3 h-3" strokeWidth={2.5} />
                    )}
                    <span>{stat.change}</span>
                  </div>
                </div>
                <div className={`w-11 h-11 ${colors.iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-5 h-5 ${colors.icon}`} strokeWidth={2.2} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Chart Section - Full Width */}
      <div className="bg-white rounded-2xl p-6 border-2 border-blue-100/50 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_40px_rgba(37,99,235,0.06)] transition-all duration-300 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Platform Activity</h3>
            <p className="text-sm text-gray-500">
              {selectedPeriod === "weekly" ? "Last 7 days" : "Last 6 months"}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-blue-500"></span>
              <span className="text-xs text-gray-500">Bookings</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              <span className="text-xs text-gray-500">Revenue</span>
            </div>
          </div>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis dataKey={selectedPeriod === "weekly" ? "day" : "month"} axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                }}
                formatter={(value, name) => {
                  if (name === 'revenue') return [`$${value.toLocaleString()}`, 'Revenue'];
                  return [value, 'Bookings'];
                }}
              />
              <Area
                type="monotone"
                dataKey="bookings"
                stroke="#3b82f6"
                strokeWidth={2.5}
                fill="url(#colorBookings)"
                dot={{ fill: '#3b82f6', r: 4 }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#10b981"
                strokeWidth={2.5}
                fill="url(#colorRevenue)"
                dot={{ fill: '#10b981', r: 4 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link
          href="/dashboard/admin/users"
          className="group bg-white rounded-2xl p-5 border-2 border-blue-100/50 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_40px_rgba(37,99,235,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-200/70 text-center"
        >
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-all">
            <Users className="w-6 h-6 text-blue-600" strokeWidth={2} />
          </div>
          <p className="text-sm font-semibold text-gray-900">Manage Users</p>
          <p className="text-xs text-gray-500 mt-0.5">View all users</p>
        </Link>
        <Link
          href="/dashboard/admin/properties"
          className="group bg-white rounded-2xl p-5 border-2 border-emerald-100/50 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_40px_rgba(16,185,129,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200/70 text-center"
        >
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-all">
            <Building2 className="w-6 h-6 text-emerald-600" strokeWidth={2} />
          </div>
          <p className="text-sm font-semibold text-gray-900">Review Properties</p>
          <p className="text-xs text-gray-500 mt-0.5">Pending approvals</p>
        </Link>
        <Link
          href="/dashboard/admin/bookings"
          className="group bg-white rounded-2xl p-5 border-2 border-purple-100/50 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_40px_rgba(147,51,234,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-purple-200/70 text-center"
        >
          <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-all">
            <CalendarCheck className="w-6 h-6 text-purple-600" strokeWidth={2} />
          </div>
          <p className="text-sm font-semibold text-gray-900">View Bookings</p>
          <p className="text-xs text-gray-500 mt-0.5">All platform bookings</p>
        </Link>
        <Link
          href="/dashboard/admin/transactions"
          className="group bg-white rounded-2xl p-5 border-2 border-orange-100/50 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_40px_rgba(251,146,60,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-orange-200/70 text-center"
        >
          <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-all">
            <DollarSign className="w-6 h-6 text-orange-600" strokeWidth={2} />
          </div>
          <p className="text-sm font-semibold text-gray-900">Transactions</p>
          <p className="text-xs text-gray-500 mt-0.5">View all payments</p>
        </Link>
      </div>
    </div>
  );
}