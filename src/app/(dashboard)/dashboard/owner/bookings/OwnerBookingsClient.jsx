// src/app/(dashboard)/dashboard/owner/bookings/OwnerBookingsClient.jsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  Search,
  MapPin,
  Eye,
  DollarSign,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Sparkles,
  Home,
  User,
  TrendingUp,
  TrendingDown,
  Phone,
  CalendarDays,
  Mail,
  MessageSquare,
  X,
} from "lucide-react";
import { toast } from "react-toastify";
import {
  Modal,
  Button,
  Input,
  Select,
  ListBox,
  Label,
} from "@heroui/react";
import { approveBooking, rejectBooking } from "@/lib/action/bookings";

// ==================== OWNER BOOKINGS CLIENT ====================
export default function OwnerBookingsClient({ bookings: initialBookings = [], transactions = [], userId }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [bookings, setBookings] = useState(initialBookings);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Status options for filter
  const statusOptions = [
    { id: "all", label: "All Status" },
    { id: "pending", label: "Pending" },
    { id: "approved", label: "Approved" },
    { id: "rejected", label: "Rejected" },
  ];

  // ========== FILTERED BOOKINGS ==========
  const filteredBookings = bookings.filter((booking) => {
    const propertyTitle = booking.propertyTitle || booking.title || "";
    const tenantName = booking.tenantName || "";
    const matchesSearch = propertyTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenantName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || booking.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // ========== FORMAT PRICE ==========
  const formatPrice = (price) => {
    return `$${price?.toLocaleString() || 0}`;
  };

  // ========== FORMAT DATE ==========
  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // ========== GET STATUS BADGE ==========
  const getStatusBadge = (status) => {
    const statusMap = {
      pending: {
        label: "Pending",
        className: "bg-amber-50 text-amber-700 border-amber-200",
        icon: <Clock className="w-3.5 h-3.5" strokeWidth={2} />,
      },
      approved: {
        label: "Approved",
        className: "bg-emerald-50 text-emerald-700 border-emerald-200",
        icon: <CheckCircle className="w-3.5 h-3.5" strokeWidth={2} />,
      },
      rejected: {
        label: "Rejected",
        className: "bg-rose-50 text-rose-700 border-rose-200",
        icon: <XCircle className="w-3.5 h-3.5" strokeWidth={2} />,
      },
    };
    return statusMap[status] || statusMap.pending;
  };

  // ========== GET PAYMENT BADGE ==========
  const getPaymentBadge = (bookingId) => {
    const transaction = transactions.find(t => t.bookingId === bookingId);
    if (!transaction) return { label: "N/A", className: "bg-gray-50 text-gray-700 border-gray-200" };
    
    const statusMap = {
      completed: { label: "Paid", className: "bg-emerald-50 text-emerald-700 border-emerald-200" },
      pending: { label: "Pending", className: "bg-amber-50 text-amber-700 border-amber-200" },
      failed: { label: "Failed", className: "bg-rose-50 text-rose-700 border-rose-200" },
      refunded: { label: "Refunded", className: "bg-blue-50 text-blue-700 border-blue-200" },
    };
    return statusMap[transaction.status] || statusMap.pending;
  };

  // ========== HANDLE APPROVE ==========
  const handleApprove = async (bookingId) => {
    if (!confirm("Are you sure you want to approve this booking?")) {
      return;
    }

    setIsProcessing(true);
    try {
      await approveBooking(bookingId);
      setBookings((prev) =>
        prev.map((b) =>
          b._id === bookingId
            ? { ...b, status: "approved" }
            : b
        )
      );
      toast.success("Booking approved successfully!");
    } catch (error) {
      console.error("Approve error:", error);
      toast.error(error?.message || "Failed to approve booking");
    } finally {
      setIsProcessing(false);
    }
  };

  // ========== HANDLE REJECT ==========
  const handleReject = async (bookingId) => {
    if (!confirm("Are you sure you want to reject this booking?")) {
      return;
    }

    setIsProcessing(true);
    try {
      await rejectBooking(bookingId);
      setBookings((prev) =>
        prev.map((b) =>
          b._id === bookingId
            ? { ...b, status: "rejected" }
            : b
        )
      );
      toast.success("Booking rejected successfully!");
    } catch (error) {
      console.error("Reject error:", error);
      toast.error(error?.message || "Failed to reject booking");
    } finally {
      setIsProcessing(false);
    }
  };

  // ========== HANDLE VIEW DETAILS ==========
  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setShowDetailsModal(true);
  };

  // ========== STATS ==========
  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === "pending").length,
    approved: bookings.filter(b => b.status === "approved").length,
    rejected: bookings.filter(b => b.status === "rejected").length,
  };

  // ========== STATS CARDS ==========
  const statsCards = [
    {
      title: "Total Bookings",
      value: stats.total,
      icon: Calendar,
      color: "blue",
      change: `${stats.pending} pending`,
      trend: stats.pending > 0 ? "up" : "neutral",
    },
    {
      title: "Approved",
      value: stats.approved,
      icon: CheckCircle,
      color: "emerald",
      change: "Confirmed",
      trend: "up",
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: Clock,
      color: "amber",
      change: "Awaiting action",
      trend: "neutral",
    },
    {
      title: "Rejected",
      value: stats.rejected,
      icon: XCircle,
      color: "rose",
      change: "Declined",
      trend: "down",
    },
  ];

  // ========== GET COLOR STYLES ==========
  const getColorStyles = (color) => {
    const colors = {
      blue: { bg: "bg-blue-50", iconBg: "bg-blue-100", icon: "text-blue-600", border: "border-blue-200/60" },
      emerald: { bg: "bg-emerald-50", iconBg: "bg-emerald-100", icon: "text-emerald-600", border: "border-emerald-200/60" },
      amber: { bg: "bg-amber-50", iconBg: "bg-amber-100", icon: "text-amber-600", border: "border-amber-200/60" },
      rose: { bg: "bg-rose-50", iconBg: "bg-rose-100", icon: "text-rose-600", border: "border-rose-200/60" },
      purple: { bg: "bg-purple-50", iconBg: "bg-purple-100", icon: "text-purple-600", border: "border-purple-200/60" },
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            Booking <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700">Requests</span>
          </h1>
          <p className="text-gray-500 mt-1">Manage booking requests for your properties</p>
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

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex-1 max-w-md">
          <Input
            type="text"
            placeholder="Search by property or tenant..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
            classNames={{
              input: "bg-transparent text-gray-800 placeholder:text-gray-400",
              inputWrapper: "bg-white border-2 border-blue-200/60 rounded-xl focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all duration-200 shadow-sm hover:border-blue-300",
            }}
            startContent={<Search className="w-4 h-4 text-gray-400" strokeWidth={2} />}
          />
        </div>
        <div className="w-full sm:w-48">
          <Select
            className="w-full"
            value={filterStatus}
            onChange={(val) => setFilterStatus(val || "all")}
            aria-label="Filter by status"
            classNames={{
              trigger: "bg-white border-2 border-blue-200/60 rounded-xl focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all duration-200 shadow-sm hover:border-blue-300 data-[open=true]:border-blue-500",
              value: "text-gray-800",
              placeholder: "text-gray-400",
              indicator: "text-blue-400",
              popover: "bg-white rounded-xl shadow-lg border border-blue-100/50 mt-1",
              listBox: "p-1",
            }}
          >
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {statusOptions.map((status) => (
                  <ListBox.Item
                    key={status.id}
                    id={status.id}
                    textValue={status.label}
                    className="text-gray-700 hover:bg-blue-50 rounded-lg data-[selected=true]:bg-blue-100 data-[selected=true]:text-blue-700 transition-colors cursor-pointer px-3 py-2.5"
                  >
                    {status.label}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-2xl border-2 border-blue-100/50 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_40px_rgba(37,99,235,0.06)] transition-all duration-300 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tenant</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Property</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Booking Date</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Status</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking, index) => {
                const statusBadge = getStatusBadge(booking.status);
                const paymentBadge = getPaymentBadge(booking._id);
                const isPending = booking.status === "pending";

                return (
                  <motion.tr
                    key={booking._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                    className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                  >
                    {/* Tenant */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                          {booking.tenantImage ? (
                            <Image src={booking.tenantImage} alt={booking.tenantName} fill className="object-cover" />
                          ) : (
                            (booking.tenantName || "U").charAt(0).toUpperCase()
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">
                            {booking.tenantName || "Unknown"}
                          </p>
                          <p className="text-xs text-gray-400">{booking.tenantEmail || ""}</p>
                        </div>
                      </div>
                    </td>

                    {/* Property */}
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-gray-900 text-sm">
                          {booking.propertyTitle || booking.title || "Property"}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                          <MapPin className="w-3 h-3" strokeWidth={2} />
                          {booking.propertyLocation || "N/A"}
                        </div>
                      </div>
                    </td>

                    {/* Booking Date */}
                    <td className="py-3 px-4 text-sm text-gray-500 hidden md:table-cell">
                      {formatDate(booking.createdAt)}
                    </td>

                    {/* Amount */}
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {formatPrice(booking.price)}
                        </p>
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${paymentBadge.className}`}>
                          {paymentBadge.label}
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4 hidden sm:table-cell">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${statusBadge.className}`}>
                        {statusBadge.icon}
                        {statusBadge.label}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        {isPending ? (
                          <>
                            <button
                              onClick={() => handleApprove(booking._id)}
                              disabled={isProcessing}
                              className="p-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-all cursor-pointer"
                              title="Approve Booking"
                            >
                              <CheckCircle className="w-4 h-4" strokeWidth={2} />
                            </button>
                            <button
                              onClick={() => handleReject(booking._id)}
                              disabled={isProcessing}
                              className="p-2 text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-all cursor-pointer"
                              title="Reject Booking"
                            >
                              <XCircle className="w-4 h-4" strokeWidth={2} />
                            </button>
                          </>
                        ) : (
                          <span className="text-xs text-gray-400 italic">No actions available</span>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredBookings.length === 0 && (
          <div className="text-center py-12 px-4">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-gray-400" strokeWidth={2} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No bookings found</h3>
            <p className="text-gray-500 text-sm">
              {searchTerm || filterStatus !== "all" 
                ? "Try adjusting your search or filter criteria" 
                : "You haven't received any booking requests yet."}
            </p>
          </div>
        )}

        {/* Table Footer */}
        {filteredBookings.length > 0 && (
          <div className="px-6 py-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
            <span>Showing {filteredBookings.length} of {bookings.length} bookings</span>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Approved: {stats.approved}
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                Pending: {stats.pending}
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-rose-400" />
                Rejected: {stats.rejected}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}