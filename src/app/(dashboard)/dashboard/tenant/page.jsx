// src/app/dashboard/tenant/page.jsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CalendarCheck,
  Heart,
  TrendingUp,
  TrendingDown,
  Bed,
  Bath,
  MapPin,
  Trash2,
  Eye,
  Search,
  Home,
  DollarSign,
  CheckCircle,
  XCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";
import { toast } from "react-toastify";

// ==================== TENANT DASHBOARD PAGE ====================
export default function TenantDashboardPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [chartType, setChartType] = useState("bar"); // 'bar' or 'line'

  // ========== STATS DATA ==========
  const [stats, setStats] = useState({
    totalBookings: 12,
    favorites: 8,
    totalSpent: 4200,
    activeBookings: 3,
  });

  // ========== BOOKINGS CHART DATA - LAST 7 DAYS ==========
  const [bookingChartData, setBookingChartData] = useState([
    { day: "Mon", bookings: 2, amount: 2400 },
    { day: "Tue", bookings: 1, amount: 1200 },
    { day: "Wed", bookings: 3, amount: 3600 },
    { day: "Thu", bookings: 4, amount: 4800 },
    { day: "Fri", bookings: 2, amount: 2400 },
    { day: "Sat", bookings: 5, amount: 6000 },
    { day: "Sun", bookings: 3, amount: 3600 },
  ]);

  // ========== BOOKINGS DATA ==========
  const [bookings, setBookings] = useState([
    {
      id: 1,
      property: "Luxury Apartment",
      location: "Downtown, NYC",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
      bookingDate: "2026-03-15",
      amount: 1200,
      bookingStatus: "approved",
      paymentStatus: "paid",
      beds: 3,
      baths: 2,
      sqft: 1200,
      owner: "Jane Smith",
      moveInDate: "2026-04-01",
    },
    {
      id: 2,
      property: "Modern Villa",
      location: "Beverly Hills, LA",
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&h=300&fit=crop",
      bookingDate: "2026-03-10",
      amount: 2500,
      bookingStatus: "pending",
      paymentStatus: "pending",
      beds: 5,
      baths: 4,
      sqft: 3500,
      owner: "John Doe",
      moveInDate: "2026-04-15",
    },
    {
      id: 3,
      property: "Cozy Studio",
      location: "Arts District, Chicago",
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=300&fit=crop",
      bookingDate: "2026-03-05",
      amount: 850,
      bookingStatus: "rejected",
      paymentStatus: "refunded",
      beds: 1,
      baths: 1,
      sqft: 650,
      owner: "Michael Chen",
      moveInDate: "2026-03-20",
    },
    {
      id: 4,
      property: "Beachfront Condo",
      location: "Miami Beach, FL",
      image: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=400&h=300&fit=crop",
      bookingDate: "2026-02-28",
      amount: 1800,
      bookingStatus: "approved",
      paymentStatus: "paid",
      beds: 2,
      baths: 2,
      sqft: 1100,
      owner: "Sarah Johnson",
      moveInDate: "2026-03-25",
    },
    {
      id: 5,
      property: "Penthouse Suite",
      location: "Manhattan, NYC",
      image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400&h=300&fit=crop",
      bookingDate: "2026-02-20",
      amount: 3200,
      bookingStatus: "pending",
      paymentStatus: "pending",
      beds: 4,
      baths: 3,
      sqft: 2800,
      owner: "David Wilson",
      moveInDate: "2026-03-30",
    },
  ]);

  // ========== FAVORITES DATA ==========
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      title: "Penthouse Suite",
      location: "Manhattan, NYC",
      price: 3200,
      image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400&h=300&fit=crop",
      beds: 4,
      baths: 3,
      sqft: 2800,
      rating: 4.9,
      reviews: 42,
    },
    {
      id: 2,
      title: "Garden Cottage",
      location: "Portland, OR",
      price: 950,
      image: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=400&h=300&fit=crop",
      beds: 2,
      baths: 1,
      sqft: 850,
      rating: 4.6,
      reviews: 9,
    },
    {
      id: 3,
      title: "Luxury Villa",
      location: "Beverly Hills, LA",
      price: 2500,
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&h=300&fit=crop",
      beds: 5,
      baths: 4,
      sqft: 3500,
      rating: 4.9,
      reviews: 18,
    },
  ]);

  // ========== FILTERED BOOKINGS ==========
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch = booking.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || booking.bookingStatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // ========== STATS CARDS ==========
  const statsCards = [
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      icon: CalendarCheck,
      color: "blue",
      change: "+3 this month",
      trend: "up",
    },
    {
      title: "Favorites",
      value: stats.favorites,
      icon: Heart,
      color: "rose",
      change: "+2 saved",
      trend: "up",
    },
    {
      title: "Total Spent",
      value: `$${stats.totalSpent.toLocaleString()}`,
      icon: DollarSign,
      color: "emerald",
      change: "+$1,200",
      trend: "up",
    },
    {
      title: "Active Bookings",
      value: stats.activeBookings,
      icon: Home,
      color: "purple",
      change: "Currently active",
      trend: "up",
    },
  ];

  // ========== GET COLOR STYLES ==========
  const getColorStyles = (color) => {
    const colors = {
      blue: { bg: "bg-blue-50", iconBg: "bg-blue-100", icon: "text-blue-600", border: "border-blue-200/60" },
      rose: { bg: "bg-rose-50", iconBg: "bg-rose-100", icon: "text-rose-600", border: "border-rose-200/60" },
      emerald: { bg: "bg-emerald-50", iconBg: "bg-emerald-100", icon: "text-emerald-600", border: "border-emerald-200/60" },
      purple: { bg: "bg-purple-50", iconBg: "bg-purple-100", icon: "text-purple-600", border: "border-purple-200/60" },
    };
    return colors[color] || colors.blue;
  };

  // ========== GET STATUS BADGE ==========
  const getStatusBadge = (status) => {
    const statusMap = {
      approved: { label: "Approved", className: "bg-emerald-50 text-emerald-700 border-emerald-200" },
      pending: { label: "Pending", className: "bg-amber-50 text-amber-700 border-amber-200" },
      rejected: { label: "Rejected", className: "bg-rose-50 text-rose-700 border-rose-200" },
    };
    return statusMap[status] || statusMap.pending;
  };

  // ========== GET PAYMENT BADGE ==========
  const getPaymentBadge = (status) => {
    const statusMap = {
      paid: { label: "Paid", className: "bg-emerald-50 text-emerald-700 border-emerald-200" },
      pending: { label: "Pending", className: "bg-amber-50 text-amber-700 border-amber-200" },
      refunded: { label: "Refunded", className: "bg-blue-50 text-blue-700 border-blue-200" },
      failed: { label: "Failed", className: "bg-rose-50 text-rose-700 border-rose-200" },
    };
    return statusMap[status] || statusMap.pending;
  };

  // ========== HANDLE REMOVE FAVORITE ==========
  const handleRemoveFavorite = (id) => {
    if (confirm("Are you sure you want to remove this from favorites?")) {
      setFavorites((prev) => prev.filter((fav) => fav.id !== id));
      setStats((prev) => ({
        ...prev,
        favorites: prev.favorites - 1,
      }));
      toast.success("Removed from favorites!");
    }
  };

  // ========== CUSTOM TOOLTIP ==========
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-xl shadow-lg border border-gray-100">
          <p className="text-sm font-semibold text-gray-900">{label}</p>
          <p className="text-sm text-blue-600">
            Bookings: {payload[0].value}
          </p>
          <p className="text-sm text-emerald-600">
            Amount: ${payload[1]?.value?.toLocaleString() || 0}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            Tenant <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700">Dashboard</span>
          </h1>
          <p className="text-gray-500 mt-1">Welcome back! Here's an overview of your activity.</p>
        </div>
        <Link
          href="/properties"
          className="mt-4 md:mt-0 inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-[0_4px_14px_rgba(37,99,235,0.3)] hover:shadow-[0_8px_24px_rgba(37,99,235,0.4)] transition-all duration-200 hover:-translate-y-0.5"
        >
          <Search className="w-4 h-4" strokeWidth={2.2} />
          <span>Browse Properties</span>
        </Link>
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

      {/* Bookings Chart - Last 7 Days */}
      <div className="bg-white rounded-2xl p-6 border-2 border-blue-100/50 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_40px_rgba(37,99,235,0.06)] transition-all duration-300 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Bookings Overview</h3>
            <p className="text-sm text-gray-500">Last 7 days activity</p>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setChartType("bar")}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${
                chartType === "bar"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Bar
            </button>
            <button
              onClick={() => setChartType("line")}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${
                chartType === "line"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Line
            </button>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "bar" ? (
              <BarChart data={bookingChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="bookings" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            ) : (
              <LineChart data={bookingChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="bookings"
                  stroke="#3b82f6"
                  strokeWidth={2.5}
                  dot={{ fill: '#3b82f6', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-3 pt-3 border-t border-gray-100">
          <span>Total: {bookingChartData.reduce((sum, d) => sum + d.bookings, 0)} bookings</span>
          <span>Avg: {Math.round(bookingChartData.reduce((sum, d) => sum + d.bookings, 0) / bookingChartData.length)} / day</span>
          <span>Last 7 days</span>
        </div>
      </div>

      {/* My Bookings Table */}
      <div className="bg-white rounded-2xl p-6 border-2 border-blue-100/50 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_40px_rgba(37,99,235,0.06)] transition-all duration-300 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">My Bookings</h3>
            <p className="text-sm text-gray-500">View and manage your booking history</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" strokeWidth={2} />
              <input
                type="text"
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-sm w-full sm:w-40"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-sm"
            >
              <option value="all">All Status</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Property</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Date</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Status</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Payment</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => {
                const statusBadge = getStatusBadge(booking.bookingStatus);
                const paymentBadge = getPaymentBadge(booking.paymentStatus);
                return (
                  <tr key={booking.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                          <Image src={booking.image} alt={booking.property} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{booking.property}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <MapPin className="w-3 h-3" strokeWidth={2} />
                            {booking.location}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500 hidden md:table-cell">{booking.bookingDate}</td>
                    <td className="py-3 px-4 text-sm font-semibold text-gray-900">${booking.amount}</td>
                    <td className="py-3 px-4 hidden sm:table-cell">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${statusBadge.className}`}>
                        {statusBadge.label}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${paymentBadge.className}`}>
                        {paymentBadge.label}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Link
                        href={`/properties/${booking.id}`}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all inline-block"
                      >
                        <Eye className="w-4 h-4" strokeWidth={2} />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filteredBookings.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No bookings found. Start exploring properties!
          </div>
        )}
      </div>

      {/* Favorites Section */}
      <div className="bg-white rounded-2xl p-6 border-2 border-blue-100/50 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_40px_rgba(37,99,235,0.06)] transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Favorites</h3>
            <p className="text-sm text-gray-500">Properties you've saved for later</p>
          </div>
          <Link
            href="/properties"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
          >
            Browse more
            <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Property</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Location</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Details</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody>
              {favorites.map((favorite) => (
                <tr key={favorite.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={favorite.image} alt={favorite.title} fill className="object-cover" />
                      </div>
                      <p className="font-medium text-gray-900 text-sm">{favorite.title}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 hidden md:table-cell">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" strokeWidth={2} />
                      {favorite.location}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm font-semibold text-gray-900">${favorite.price}</td>
                  <td className="py-3 px-4 hidden sm:table-cell">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <span className="flex items-center gap-0.5"><Bed className="w-3 h-3" />{favorite.beds}</span>
                      <span className="flex items-center gap-0.5"><Bath className="w-3 h-3" />{favorite.baths}</span>
                      <span className="flex items-center gap-0.5"><span className="w-3 h-3" />{favorite.sqft}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleRemoveFavorite(favorite.id)}
                      className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" strokeWidth={2} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {favorites.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No favorites yet. Start saving properties you love!
          </div>
        )}
      </div>
    </div>
  );
}