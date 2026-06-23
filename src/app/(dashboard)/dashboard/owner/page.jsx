// src/app/dashboard/owner/page.jsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  DollarSign,
  Building2,
  CalendarCheck,
  TrendingUp,
  TrendingDown,
  Home,
  Bed,
  Bath,
  MapPin,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Search,
  Filter,
  Sparkles,
  ArrowRight,
  PlusCircle,
  Users,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

// ==================== OWNER DASHBOARD PAGE ====================
export default function OwnerDashboardPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // ========== STATS DATA ==========
  const [stats, setStats] = useState({
    totalEarnings: 48500,
    totalProperties: 15,
    totalBookings: 42,
    pendingRequests: 8,
  });

  // ========== MONTHLY EARNINGS DATA ==========
  const [monthlyData, setMonthlyData] = useState([
    { month: "Jan", earnings: 3200 },
    { month: "Feb", earnings: 2800 },
    { month: "Mar", earnings: 4100 },
    { month: "Apr", earnings: 3800 },
    { month: "May", earnings: 5200 },
    { month: "Jun", earnings: 4600 },
    { month: "Jul", earnings: 5800 },
    { month: "Aug", earnings: 4900 },
    { month: "Sep", earnings: 6200 },
    { month: "Oct", earnings: 5500 },
    { month: "Nov", earnings: 6800 },
    { month: "Dec", earnings: 7200 },
  ]);

  // ========== PROPERTIES DATA ==========
  const [properties, setProperties] = useState([
    {
      id: 1,
      title: "Modern Apartment",
      location: "Downtown, NYC",
      price: 1200,
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
      beds: 3,
      baths: 2,
      sqft: 1200,
      status: "approved",
      bookings: 12,
      createdAt: "2026-01-15",
    },
    {
      id: 2,
      title: "Luxury Villa",
      location: "Beverly Hills, LA",
      price: 2500,
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&h=300&fit=crop",
      beds: 5,
      baths: 4,
      sqft: 3500,
      status: "pending",
      bookings: 8,
      createdAt: "2026-02-20",
    },
    {
      id: 3,
      title: "Studio Loft",
      location: "Arts District, Chicago",
      price: 850,
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=300&fit=crop",
      beds: 1,
      baths: 1,
      sqft: 650,
      status: "approved",
      bookings: 15,
      createdAt: "2026-01-10",
    },
    {
      id: 4,
      title: "Beachfront Condo",
      location: "Miami Beach, FL",
      price: 1800,
      image: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=400&h=300&fit=crop",
      beds: 2,
      baths: 2,
      sqft: 1100,
      status: "rejected",
      bookings: 0,
      createdAt: "2026-03-05",
    },
    {
      id: 5,
      title: "Garden Cottage",
      location: "Portland, OR",
      price: 950,
      image: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=400&h=300&fit=crop",
      beds: 2,
      baths: 1,
      sqft: 850,
      status: "approved",
      bookings: 7,
      createdAt: "2026-02-28",
    },
  ]);

  // ========== BOOKING REQUESTS DATA ==========
  const [bookingRequests, setBookingRequests] = useState([
    {
      id: 1,
      tenant: "Sarah Johnson",
      property: "Modern Apartment",
      amount: 1200,
      date: "2026-03-15",
      status: "pending",
      tenantImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      moveInDate: "2026-04-01",
    },
    {
      id: 2,
      tenant: "Michael Chen",
      property: "Luxury Villa",
      amount: 2500,
      date: "2026-03-12",
      status: "pending",
      tenantImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      moveInDate: "2026-04-15",
    },
    {
      id: 3,
      tenant: "Emily Davis",
      property: "Studio Loft",
      amount: 850,
      date: "2026-03-10",
      status: "approved",
      tenantImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      moveInDate: "2026-03-20",
    },
    {
      id: 4,
      tenant: "David Wilson",
      property: "Beachfront Condo",
      amount: 1800,
      date: "2026-03-08",
      status: "rejected",
      tenantImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      moveInDate: "2026-04-10",
    },
  ]);

  // ========== FILTERED PROPERTIES ==========
  const filteredProperties = properties.filter((property) => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || property.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // ========== PENDING REQUESTS COUNT ==========
  const pendingRequests = bookingRequests.filter((req) => req.status === "pending").length;

  // ========== HANDLE BOOKING STATUS ==========
  const handleBookingStatus = (id, status) => {
    setBookingRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status } : req
      )
    );
    toast.success(`Booking ${status === "approved" ? "approved" : "rejected"} successfully!`);
  };

  // ========== HANDLE PROPERTY DELETE ==========
  const handleDeleteProperty = (id) => {
    if (confirm("Are you sure you want to delete this property?")) {
      setProperties((prev) => prev.filter((p) => p.id !== id));
      toast.success("Property deleted successfully!");
    }
  };

  // ========== STATS CARDS ==========
  const statsCards = [
    {
      title: "Total Earnings",
      value: `$${stats.totalEarnings.toLocaleString()}`,
      icon: DollarSign,
      color: "blue",
      change: "+12.5%",
      trend: "up",
    },
    {
      title: "Total Properties",
      value: stats.totalProperties,
      icon: Building2,
      color: "emerald",
      change: "+3",
      trend: "up",
    },
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      icon: CalendarCheck,
      color: "purple",
      change: "+8",
      trend: "up",
    },
    {
      title: "Pending Requests",
      value: pendingRequests,
      icon: Users,
      color: "orange",
      change: pendingRequests > 0 ? `${pendingRequests} waiting` : "All clear",
      trend: pendingRequests > 0 ? "up" : "down",
    },
  ];

  const getColorStyles = (color) => {
    const colors = {
      blue: { bg: "bg-blue-50", iconBg: "bg-blue-100", icon: "text-blue-600", border: "border-blue-200/60" },
      emerald: { bg: "bg-emerald-50", iconBg: "bg-emerald-100", icon: "text-emerald-600", border: "border-emerald-200/60" },
      purple: { bg: "bg-purple-50", iconBg: "bg-purple-100", icon: "text-purple-600", border: "border-purple-200/60" },
      orange: { bg: "bg-orange-50", iconBg: "bg-orange-100", icon: "text-orange-600", border: "border-orange-200/60" },
    };
    return colors[color] || colors.blue;
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      approved: { label: "Approved", className: "bg-emerald-50 text-emerald-700 border-emerald-200" },
      pending: { label: "Pending", className: "bg-amber-50 text-amber-700 border-amber-200" },
      rejected: { label: "Rejected", className: "bg-rose-50 text-rose-700 border-rose-200" },
    };
    return statusMap[status] || statusMap.pending;
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            Owner <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700">Dashboard</span>
          </h1>
          <p className="text-gray-500 mt-1">Welcome back! Here's what's happening with your properties.</p>
        </div>
        <Link
          href="/dashboard/owner/add-property"
          className="mt-4 md:mt-0 inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-[0_4px_14px_rgba(37,99,235,0.3)] hover:shadow-[0_8px_24px_rgba(37,99,235,0.4)] transition-all duration-200 hover:-translate-y-0.5"
        >
          <PlusCircle className="w-4 h-4" strokeWidth={2.2} />
          <span>Add Property</span>
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

      {/* Monthly Earnings Chart */}
      <div className="bg-white rounded-2xl p-6 border-2 border-blue-100/50 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_40px_rgba(37,99,235,0.06)] transition-all duration-300 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Monthly Earnings</h3>
            <p className="text-sm text-gray-500">Last 12 months</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Total:</span>
            <span className="text-lg font-bold text-blue-600">
              ${monthlyData.reduce((sum, item) => sum + item.earnings, 0).toLocaleString()}
            </span>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                }}
                formatter={(value) => [`$${value.toLocaleString()}`, 'Earnings']}
              />
              <Area
                type="monotone"
                dataKey="earnings"
                stroke="#3b82f6"
                strokeWidth={2.5}
                fill="url(#colorEarnings)"
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* My Properties Section */}
      <div className="bg-white rounded-2xl p-6 border-2 border-blue-100/50 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_40px_rgba(37,99,235,0.06)] transition-all duration-300 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">My Properties</h3>
            <p className="text-sm text-gray-500">Manage your property listings</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" strokeWidth={2} />
              <input
                type="text"
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-sm w-full sm:w-48"
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
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Location</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Status</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProperties.map((property) => {
                const statusBadge = getStatusBadge(property.status);
                return (
                  <tr key={property.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={property.image}
                            alt={property.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{property.title}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <span className="flex items-center gap-0.5"><Bed className="w-3 h-3" />{property.beds}</span>
                            <span className="flex items-center gap-0.5"><Bath className="w-3 h-3" />{property.baths}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500 hidden md:table-cell">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-gray-400" strokeWidth={2} />
                        {property.location}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm font-semibold text-gray-900">${property.price}</td>
                    <td className="py-3 px-4 hidden sm:table-cell">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${statusBadge.className}`}>
                        {statusBadge.label}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        <Link
                          href={`/properties/${property.id}`}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        >
                          <Eye className="w-4 h-4" strokeWidth={2} />
                        </Link>
                        <Link
                          href={`/dashboard/owner/properties/${property.id}/edit`}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        >
                          <Edit className="w-4 h-4" strokeWidth={2} />
                        </Link>
                        <button
                          onClick={() => handleDeleteProperty(property.id)}
                          className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" strokeWidth={2} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filteredProperties.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No properties found. Add your first property!
          </div>
        )}
      </div>

      {/* Booking Requests Section */}
      <div className="bg-white rounded-2xl p-6 border-2 border-blue-100/50 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_40px_rgba(37,99,235,0.06)] transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Booking Requests</h3>
            <p className="text-sm text-gray-500">Review and manage tenant booking requests</p>
          </div>
          {pendingRequests > 0 && (
            <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded-full border border-amber-200">
              {pendingRequests} pending
            </span>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tenant</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Property</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Move-in Date</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookingRequests.map((request) => {
                const statusBadge = getStatusBadge(request.status);
                return (
                  <tr key={request.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            src={request.tenantImage}
                            alt={request.tenant}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="font-medium text-gray-900 text-sm">{request.tenant}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{request.property}</td>
                    <td className="py-3 px-4 text-sm font-semibold text-gray-900">${request.amount}</td>
                    <td className="py-3 px-4 text-sm text-gray-500 hidden md:table-cell">{request.moveInDate}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${statusBadge.className}`}>
                        {statusBadge.label}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {request.status === "pending" ? (
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleBookingStatus(request.id, "approved")}
                            className="p-1.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-all cursor-pointer"
                            title="Approve"
                          >
                            <CheckCircle className="w-4 h-4" strokeWidth={2} />
                          </button>
                          <button
                            onClick={() => handleBookingStatus(request.id, "rejected")}
                            className="p-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg transition-all cursor-pointer"
                            title="Reject"
                          >
                            <XCircle className="w-4 h-4" strokeWidth={2} />
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">
                          {request.status === "approved" ? "Confirmed" : "Declined"}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {bookingRequests.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No booking requests yet.
          </div>
        )}
      </div>
    </div>
  );
}