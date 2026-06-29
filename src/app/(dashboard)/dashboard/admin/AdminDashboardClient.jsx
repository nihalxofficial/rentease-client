// src/app/(dashboard)/dashboard/admin/AdminDashboardClient.jsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Users,
  Home,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  XCircle,
  Clock,
  Sparkles,
  UserPlus,
  Building2,
  CalendarCheck,
  AlertCircle,
  Eye,
  ArrowRight,
  Activity,
  BarChart3,
  PieChart as PieChartIcon,
  User,
  Mail,
  Phone,
  MapPin,
  Crown,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
  ComposedChart,
} from "recharts";

// ==================== ADMIN DASHBOARD CLIENT ====================
export default function AdminDashboardClient({ 
  stats = {},
  chartData = {},
  recentActivity = [],
  adminId 
}) {
  const [chartType, setChartType] = useState("area");

  // ========== GET ACTIVITY ICON ==========
  const getActivityIcon = (type) => {
    const icons = {
      booking: <Calendar className="w-4 h-4 text-blue-500" />,
      property: <Home className="w-4 h-4 text-emerald-500" />,
      user: <User className="w-4 h-4 text-purple-500" />,
    };
    return icons[type] || <Activity className="w-4 h-4 text-gray-500" />;
  };

  // ========== STATS CARDS ==========
  const statsCards = [
    {
      title: "Total Users",
      value: stats.totalUsers || 0,
      icon: Users,
      color: "blue",
      change: `${stats.activeUsers || 0} active`,
      trend: stats.activeUsers > 0 ? "up" : "neutral",
    },
    {
      title: "Total Properties",
      value: stats.totalProperties || 0,
      icon: Building2,
      color: "emerald",
      change: `${stats.approvedProperties || 0} approved`,
      trend: stats.approvedProperties > 0 ? "up" : "neutral",
    },
    {
      title: "Total Bookings",
      value: stats.totalBookings || 0,
      icon: CalendarCheck,
      color: "purple",
      change: `${stats.pendingBookings || 0} pending`,
      trend: stats.pendingBookings > 0 ? "up" : "neutral",
    },
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue?.toLocaleString() || 0}`,
      icon: DollarSign,
      color: "amber",
      change: "Lifetime earnings",
      trend: "up",
    },
  ];

  // ========== GET COLOR STYLES ==========
  const getColorStyles = (color) => {
    const colors = {
      blue: { bg: "bg-blue-50", iconBg: "bg-blue-100", icon: "text-blue-600", border: "border-blue-200/60" },
      emerald: { bg: "bg-emerald-50", iconBg: "bg-emerald-100", icon: "text-emerald-600", border: "border-emerald-200/60" },
      purple: { bg: "bg-purple-50", iconBg: "bg-purple-100", icon: "text-purple-600", border: "border-purple-200/60" },
      amber: { bg: "bg-amber-50", iconBg: "bg-amber-100", icon: "text-amber-600", border: "border-amber-200/60" },
      rose: { bg: "bg-rose-50", iconBg: "bg-rose-100", icon: "text-rose-600", border: "border-rose-200/60" },
    };
    return colors[color] || colors.blue;
  };

  // ========== CUSTOM TOOLTIP ==========
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
          <p className="text-sm font-semibold text-gray-900">{label}</p>
          <p className="text-sm text-blue-600">
            Revenue: ${payload[0]?.value?.toLocaleString() || 0}
          </p>
          {payload[1] && (
            <p className="text-sm text-emerald-600">
              Transactions: {payload[1]?.value || 0}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  // ========== PIE CHART COLORS ==========
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  // ========== GET STATUS BADGE ==========
  const getStatusBadge = (status) => {
    const statusMap = {
      pending: { label: "Pending", className: "bg-amber-50 text-amber-700 border-amber-200", icon: <Clock className="w-3 h-3" /> },
      approved: { label: "Approved", className: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: <CheckCircle className="w-3 h-3" /> },
      completed: { label: "Completed", className: "bg-blue-50 text-blue-700 border-blue-200", icon: <CheckCircle className="w-3 h-3" /> },
      rejected: { label: "Rejected", className: "bg-rose-50 text-rose-700 border-rose-200", icon: <XCircle className="w-3 h-3" /> },
      active: { label: "Active", className: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: <CheckCircle className="w-3 h-3" /> },
      suspended: { label: "Suspended", className: "bg-rose-50 text-rose-700 border-rose-200", icon: <XCircle className="w-3 h-3" /> },
    };
    return statusMap[status] || statusMap.pending;
  };

  // ========== FORMAT DATE ==========
  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            Admin <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700">Dashboard</span>
          </h1>
          <p className="text-gray-500 mt-1">Welcome back! Here's an overview of the platform.</p>
        </div>
        <div className="flex items-center gap-2 mt-2 md:mt-0">
          <span className="text-sm text-gray-500">
            {stats.totalUsers || 0} total users
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {statsCards.map((stat, index) => {
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
                  <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${
                    stat.trend === "up" ? "text-emerald-600" :
                    stat.trend === "down" ? "text-rose-600" : "text-gray-400"
                  }`}>
                    {stat.trend === "up" && <TrendingUp className="w-3 h-3" strokeWidth={2.5} />}
                    {stat.trend === "down" && <TrendingDown className="w-3 h-3" strokeWidth={2.5} />}
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

      {/* Charts Grid - Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Monthly Revenue Chart */}
        <div className="bg-white rounded-2xl p-6 border-2 border-blue-100/50 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_40px_rgba(37,99,235,0.06)] transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Monthly Revenue</h3>
              <p className="text-sm text-gray-500">Last 12 months</p>
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => setChartType("area")}
                className={`cursor-pointer px-3 py-1 text-xs font-medium rounded-lg transition-all ${
                  chartType === "area"
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Area
              </button>
              <button
                onClick={() => setChartType("bar")}
                className={`cursor-pointer px-3 py-1 text-xs font-medium rounded-lg transition-all ${
                  chartType === "bar"
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Bar
              </button>
              <button
                onClick={() => setChartType("composed")}
                className={`cursor-pointer px-3 py-1 text-xs font-medium rounded-lg transition-all ${
                  chartType === "composed"
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Composed
              </button>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === "area" ? (
                <AreaChart data={chartData.monthlyData || []}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3b82f6"
                    strokeWidth={2.5}
                    fill="url(#revenueGradient)"
                    dot={{ fill: '#3b82f6', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </AreaChart>
              ) : chartType === "bar" ? (
                <BarChart data={chartData.monthlyData || []}>
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
                      <stop offset="100%" stopColor="#60a5fa" stopOpacity={0.8} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="revenue" fill="url(#barGradient)" radius={[4, 4, 0, 0]} />
                </BarChart>
              ) : (
                <ComposedChart data={chartData.monthlyData || []}>
                  <defs>
                    <linearGradient id="composedGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    fill="url(#composedGradient)"
                  />
                  <Bar dataKey="revenue" fill="#a78bfa" radius={[4, 4, 0, 0]} opacity={0.3} />
                </ComposedChart>
              )}
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-3 pt-3 border-t border-gray-100">
            <span>Total: ${chartData.monthlyData?.reduce((sum, d) => sum + d.revenue, 0)?.toLocaleString() || 0}</span>
            <span>Last 12 months</span>
          </div>
        </div>

        {/* User Role Distribution */}
        <div className="bg-white rounded-2xl p-6 border-2 border-blue-100/50 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_40px_rgba(37,99,235,0.06)] transition-all duration-300">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-900">User Distribution</h3>
            <p className="text-sm text-gray-500">Users by role</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData.roleData || []}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {(chartData.roleData || []).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value} users`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts Grid - Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Booking Status Distribution */}
        <div className="bg-white rounded-2xl p-6 border-2 border-blue-100/50 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_40px_rgba(37,99,235,0.06)] transition-all duration-300">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-900">Booking Status</h3>
            <p className="text-sm text-gray-500">Distribution of all bookings</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData.bookingStatusData || []}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {(chartData.bookingStatusData || []).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value} bookings`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Property Status Distribution */}
        <div className="bg-white rounded-2xl p-6 border-2 border-blue-100/50 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_40px_rgba(37,99,235,0.06)] transition-all duration-300">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-900">Property Status</h3>
            <p className="text-sm text-gray-500">Distribution of all properties</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData.propertyStatusData || []}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {(chartData.propertyStatusData || []).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value} properties`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl p-6 border-2 border-blue-100/50 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_40px_rgba(37,99,235,0.06)] transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
            <p className="text-sm text-gray-500">Latest platform activity</p>
          </div>
          <Link
            href="/dashboard/admin/activity"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
          >
            View all
            <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
          </Link>
        </div>

        <div className="space-y-3">
          {recentActivity.map((activity, index) => {
            const statusBadge = getStatusBadge(activity.status);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-center justify-between p-3 bg-gray-50/80 rounded-xl border border-gray-100 hover:border-blue-200/50 transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-400">{formatDate(activity.time)}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border ${statusBadge.className}`}>
                  {statusBadge.icon}
                  {statusBadge.label}
                </span>
              </motion.div>
            );
          })}
          {recentActivity.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Activity className="w-12 h-12 text-gray-300 mx-auto mb-2" strokeWidth={1.5} />
              <p>No recent activity</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}