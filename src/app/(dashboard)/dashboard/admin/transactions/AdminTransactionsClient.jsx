// src/app/(dashboard)/dashboard/admin/transactions/AdminTransactionsClient.jsx
"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Calendar,
  Search,
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
  Mail,
  MessageSquare,
  X,
  Info,
  CreditCard,
  ArrowRight,
} from "lucide-react";
import {
  Modal,
  Button,
  Input,
  Select,
  ListBox,
  Label,
} from "@heroui/react";

// ==================== ADMIN TRANSACTIONS CLIENT ====================
export default function AdminTransactionsClient({ transactions: initialTransactions = [], total = 0, stats = {}, adminId }) {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // ========== SEARCH, FILTER, SORT STATE ==========
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  // ========== FILTERED & SORTED TRANSACTIONS (Client-side) ==========
  const filteredAndSortedTransactions = useMemo(() => {
    let result = [...initialTransactions];

    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter((transaction) =>
        transaction.propertyTitle?.toLowerCase().includes(lowerSearch) ||
        transaction.userName?.toLowerCase().includes(lowerSearch) ||
        transaction.ownerName?.toLowerCase().includes(lowerSearch)
      );
    }

    if (filterStatus !== "all") {
      result = result.filter((transaction) => transaction.status === filterStatus);
    }

    if (sortBy === "low-to-high") {
      result.sort((a, b) => (a.amount || 0) - (b.amount || 0));
    } else if (sortBy === "high-to-low") {
      result.sort((a, b) => (b.amount || 0) - (a.amount || 0));
    } else {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return result;
  }, [initialTransactions, searchTerm, filterStatus, sortBy]);

  // ========== STATS ==========
  const statsCards = [
    {
      title: "Total Transactions",
      value: stats.total || 0,
      icon: CreditCard,
      color: "blue",
      change: `${stats.completed || 0} completed`,
      trend: stats.completed > 0 ? "up" : "neutral",
    },
    {
      title: "Completed",
      value: stats.completed || 0,
      icon: CheckCircle,
      color: "emerald",
      change: "Successful",
      trend: "up",
    },
    {
      title: "Pending",
      value: stats.pending || 0,
      icon: Clock,
      color: "amber",
      change: "Awaiting confirmation",
      trend: "neutral",
    },
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue?.toLocaleString() || 0}`,
      icon: DollarSign,
      color: "purple",
      change: "Earned",
      trend: "up",
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

  // ========== STATUS BADGE ==========
  const getStatusBadge = (status) => {
    const statusMap = {
      completed: {
        label: "Completed",
        className: "bg-emerald-50 text-emerald-700 border-emerald-200",
        icon: <CheckCircle className="w-3.5 h-3.5" strokeWidth={2} />,
      },
      pending: {
        label: "Pending",
        className: "bg-amber-50 text-amber-700 border-amber-200",
        icon: <Clock className="w-3.5 h-3.5" strokeWidth={2} />,
      },
      failed: {
        label: "Failed",
        className: "bg-rose-50 text-rose-700 border-rose-200",
        icon: <XCircle className="w-3.5 h-3.5" strokeWidth={2} />,
      },
      refunded: {
        label: "Refunded",
        className: "bg-blue-50 text-blue-700 border-blue-200",
        icon: <CheckCircle className="w-3.5 h-3.5" strokeWidth={2} />,
      },
    };
    return statusMap[status] || statusMap.pending;
  };

  // ========== BOOKING STATUS BADGE ==========
  const getBookingStatusBadge = (status) => {
    const statusMap = {
      pending: { label: "Pending", className: "bg-amber-50 text-amber-700 border-amber-200" },
      approved: { label: "Approved", className: "bg-emerald-50 text-emerald-700 border-emerald-200" },
      completed: { label: "Completed", className: "bg-blue-50 text-blue-700 border-blue-200" },
      rejected: { label: "Rejected", className: "bg-rose-50 text-rose-700 border-rose-200" },
    };
    return statusMap[status] || statusMap.pending;
  };

  // ========== HELPERS ==========
  const formatPrice = (price) => {
    return `$${price?.toLocaleString() || 0}`;
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // ========== HANDLE VIEW DETAILS ==========
  const handleViewDetails = (transaction) => {
    setSelectedTransaction(transaction);
    setShowDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedTransaction(null);
  };

  // ========== STATUS OPTIONS ==========
  const statusOptions = [
    { id: "all", label: "All Status" },
    { id: "completed", label: "Completed" },
    { id: "pending", label: "Pending" },
    { id: "failed", label: "Failed" },
    { id: "refunded", label: "Refunded" },
  ];

  const sortOptions = [
    { id: "default", label: "Default (Newest)" },
    { id: "low-to-high", label: "Amount: Low → High" },
    { id: "high-to-low", label: "Amount: High → Low" },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 md:mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            All <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700">Transactions</span>
          </h1>
          <p className="text-gray-500 mt-1 text-sm">Monitor all payment transactions</p>
        </div>
        <div className="flex items-center gap-2 mt-2 md:mt-0">
          <span className="text-sm text-gray-500">{total} total transactions</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6 mb-6 md:mb-8">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          const colors = getColorStyles(stat.color);
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={`bg-white rounded-2xl p-4 md:p-5 border-2 ${colors.border} shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="text-xs md:text-sm text-gray-500 font-medium truncate">{stat.title}</p>
                  <p className="text-lg md:text-2xl font-extrabold text-gray-900 mt-1">{stat.value}</p>
                  <div className={`flex items-center gap-1 mt-1 md:mt-2 text-[10px] md:text-xs font-medium ${
                    stat.trend === "up" ? "text-emerald-600" :
                    stat.trend === "down" ? "text-rose-600" : "text-gray-400"
                  }`}>
                    {stat.trend === "up" && <TrendingUp className="w-3 h-3 md:w-3.5 md:h-3.5" strokeWidth={2.5} />}
                    {stat.trend === "down" && <TrendingDown className="w-3 h-3 md:w-3.5 md:h-3.5" strokeWidth={2.5} />}
                    <span className="truncate">{stat.change}</span>
                  </div>
                </div>
                <div className={`w-8 h-8 md:w-11 md:h-11 ${colors.iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-4 h-4 md:w-5 md:h-5 ${colors.icon}`} strokeWidth={2.2} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:gap-4 mb-4 md:mb-6">
        <div className="flex-1 w-full sm:max-w-md">
          <Input
            type="text"
            placeholder="Search by property, tenant, or owner..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
            classNames={{
              input: "bg-transparent text-gray-800 placeholder:text-gray-400 text-sm",
              inputWrapper: "bg-white border-2 border-blue-200/60 rounded-xl focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all duration-200 shadow-sm hover:border-blue-300",
            }}
            startContent={<Search className="w-4 h-4 text-gray-400" strokeWidth={2} />}
          />
        </div>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <div className="flex-1 sm:flex-none min-w-[120px] sm:w-44">
            <Select
              className="w-full"
              value={filterStatus !== "all" ? filterStatus : null}
              onChange={(val) => setFilterStatus(val || "all")}
              aria-label="Filter by status"
              classNames={{
                trigger: "bg-white border-2 border-blue-200/60 rounded-xl focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all duration-200 shadow-sm hover:border-blue-300 data-[open=true]:border-blue-500",
                value: "text-gray-800 text-sm", 
                placeholder: "text-gray-400 text-sm",
                indicator: "text-blue-400",
                popover: "bg-white rounded-xl shadow-lg border border-blue-100/50 mt-1",
                listBox: "p-1",
              }}
            >
              <Select.Trigger><Select.Value /><Select.Indicator /></Select.Trigger>
              <Select.Popover>
                <ListBox>
                  {statusOptions.map((status) => (
                    <ListBox.Item key={status.id} id={status.id} textValue={status.label} className="text-gray-700 hover:bg-blue-50 rounded-lg data-[selected=true]:bg-blue-100 data-[selected=true]:text-blue-700 transition-colors cursor-pointer px-3 py-2.5 text-sm">
                      {status.label}<ListBox.ItemIndicator />
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>
          </div>
          <div className="flex-1 sm:flex-none min-w-[120px] sm:w-44">
            <Select
              className="w-full"
              value={sortBy !== "default" ? sortBy : null}
              onChange={(val) => setSortBy(val || "default")}
              aria-label="Sort By"
              classNames={{
                trigger: "bg-white border-2 border-blue-200/60 rounded-xl focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all duration-200 shadow-sm hover:border-blue-300 data-[open=true]:border-blue-500",
                value: "text-gray-800 text-sm",
                placeholder: "text-gray-400 text-sm",
                indicator: "text-blue-400",
                popover: "bg-white rounded-xl shadow-lg border border-blue-100/50 mt-1",
                listBox: "p-1",
              }}
            >
              <Select.Trigger><Select.Value /><Select.Indicator /></Select.Trigger>
              <Select.Popover>
                <ListBox>
                  {sortOptions.map((option) => (
                    <ListBox.Item key={option.id} id={option.id} textValue={option.label} className="text-gray-700 hover:bg-blue-50 rounded-lg data-[selected=true]:bg-blue-100 data-[selected=true]:text-blue-700 transition-colors cursor-pointer px-3 py-2.5 text-sm">
                      {option.label}<ListBox.ItemIndicator />
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-3 md:mb-4">
        <p className="text-xs md:text-sm text-gray-500">
          Showing <span className="font-semibold text-gray-700">{filteredAndSortedTransactions.length}</span> transactions
          {filteredAndSortedTransactions.length !== total && (
            <span className="text-gray-400"> (filtered from {total})</span>
          )}
        </p>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-2xl border-2 border-blue-100/50 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_40px_rgba(37,99,235,0.06)] transition-all duration-300 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left py-2 md:py-3 px-3 md:px-4 text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-wider">Transaction</th>
                <th className="text-left py-2 md:py-3 px-3 md:px-4 text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-wider">Tenant</th>
                <th className="text-left py-2 md:py-3 px-3 md:px-4 text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Property</th>
                <th className="text-left py-2 md:py-3 px-3 md:px-4 text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="text-left py-2 md:py-3 px-3 md:px-4 text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Status</th>
                <th className="text-left py-2 md:py-3 px-3 md:px-4 text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedTransactions.map((transaction, index) => {
                const statusBadge = getStatusBadge(transaction.status);

                return (
                  <motion.tr
                    key={transaction._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                    className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                  >
                    {/* Transaction ID */}
                    <td className="py-2 md:py-3 px-3 md:px-4">
                      <div className="min-w-0">
                        <p className="font-mono text-[10px] md:text-xs text-gray-600 truncate max-w-[80px] sm:max-w-[120px] md:max-w-[150px]">
                          {transaction._id}
                        </p>
                        <p className="text-[10px] md:text-xs text-gray-400">
                          {formatDate(transaction.createdAt)}
                        </p>
                      </div>
                    </td>

                    {/* Tenant */}
                    <td className="py-2 md:py-3 px-3 md:px-4">
                      <div className="flex items-center gap-2 md:gap-3">
                        <div className="relative w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-[10px] md:text-sm">
                          {transaction.userImage ? (
                            <Image src={transaction.userImage} alt={transaction.userName} fill className="object-cover" />
                          ) : (
                            (transaction.userName || "U").charAt(0).toUpperCase()
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-gray-900 text-xs md:text-sm truncate max-w-[80px] sm:max-w-[120px] md:max-w-none">
                            {transaction.userName || "Unknown"}
                          </p>
                          <p className="text-[10px] md:text-xs text-gray-400 truncate max-w-[80px] sm:max-w-[120px] md:max-w-none">
                            {transaction.userEmail || ""}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Property */}
                    <td className="py-2 md:py-3 px-3 md:px-4 hidden md:table-cell">
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 text-xs md:text-sm truncate max-w-[120px]">
                          {transaction.propertyTitle || "Unknown"}
                        </p>
                        <p className="text-[10px] md:text-xs text-gray-400 truncate max-w-[120px]">
                          {transaction.propertyLocation || "N/A"}
                        </p>
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="py-2 md:py-3 px-3 md:px-4">
                      <div>
                        <p className="text-xs md:text-sm font-bold text-gray-900">
                          {formatPrice(transaction.amount)}
                        </p>
                        <p className="text-[8px] md:text-[10px] text-gray-400 uppercase">
                          {transaction.currency || "USD"}
                        </p>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-2 md:py-3 px-3 md:px-4 hidden sm:table-cell">
                      <span className={`inline-flex items-center gap-1 md:gap-1.5 px-2 md:px-2.5 py-0.5 md:py-1 rounded-full text-[8px] md:text-xs font-medium border ${statusBadge.className} whitespace-nowrap`}>
                        {statusBadge.icon}
                        {statusBadge.label}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-2 md:py-3 px-3 md:px-4">
                      <button
                        onClick={() => handleViewDetails(transaction)}
                        className="p-1.5 md:p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all cursor-pointer"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2} />
                      </button>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredAndSortedTransactions.length === 0 && (
          <div className="text-center py-8 md:py-12 px-4">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4">
              <CreditCard className="w-6 h-6 md:w-8 md:h-8 text-gray-400" strokeWidth={2} />
            </div>
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1 md:mb-2">No transactions found</h3>
            <p className="text-xs md:text-sm text-gray-500">
              {searchTerm || filterStatus !== "all"
                ? "Try adjusting your search or filter criteria"
                : "No transactions have been recorded yet."}
            </p>
          </div>
        )}

        {/* Table Footer */}
        {filteredAndSortedTransactions.length > 0 && (
          <div className="px-3 md:px-6 py-2 md:py-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2 text-[10px] md:text-xs text-gray-400">
            <span>Showing {filteredAndSortedTransactions.length} of {total} transactions</span>
            <div className="flex flex-wrap items-center gap-2 md:gap-3">
              <span className="inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-emerald-400" />
                Completed: {stats.completed || 0}
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-amber-400" />
                Pending: {stats.pending || 0}
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-rose-400" />
                Failed: {stats.failed || 0}
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-blue-400" />
                Refunded: {stats.refunded || 0}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ========== TRANSACTION DETAILS MODAL ========== */}
      <Modal isOpen={showDetailsModal} onClose={handleCloseDetailsModal} size="lg" className="max-w-2xl">
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className="bg-white rounded-2xl border-2 border-blue-100/50 shadow-2xl max-h-[90vh] flex flex-col">
              <Modal.Header className="px-4 md:px-6 pt-4 md:pt-6 pb-3 md:pb-4 border-b border-gray-100 flex-shrink-0">
                <div className="flex items-center justify-between w-full">
                  <div>
                    <div className="flex items-center gap-2">
                      <Info className="w-5 h-5 text-blue-600" strokeWidth={2} />
                      <Modal.Heading className="text-lg md:text-xl font-extrabold text-gray-900">
                        Transaction Details
                      </Modal.Heading>
                    </div>
                    <p className="text-xs md:text-sm text-gray-500 mt-0.5">View complete transaction information</p>
                  </div>
                  <button
                    onClick={handleCloseDetailsModal}
                    className="p-1.5 md:p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer flex-shrink-0"
                  >
                    <X className="w-5 h-5 text-gray-400" strokeWidth={2} />
                  </button>
                </div>
              </Modal.Header>

              <Modal.Body className="px-4 md:px-6 py-4 md:py-6 overflow-y-auto flex-1">
                {selectedTransaction && (
                  <div className="space-y-4 md:space-y-6">
                    {/* Transaction ID */}
                    <div className="bg-gray-50/80 rounded-xl p-3 md:p-4 border border-gray-100">
                      <h4 className="text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2 flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-blue-600" strokeWidth={2} />
                        Transaction Information
                      </h4>
                      <div className="space-y-1">
                        <p className="text-xs md:text-sm text-gray-600">
                          <span className="font-medium">Transaction ID:</span>{' '}
                          <span className="font-mono break-all">{selectedTransaction._id}</span>
                        </p>
                        <p className="text-xs md:text-sm text-gray-600">
                          <span className="font-medium">Date:</span> {formatDate(selectedTransaction.createdAt)}
                        </p>
                        <p className="text-xs md:text-sm text-gray-600">
                          <span className="font-medium">Session ID:</span>{' '}
                          <span className="font-mono text-[10px] md:text-xs break-all">{selectedTransaction.session_id || "N/A"}</span>
                        </p>
                      </div>
                    </div>

                    {/* Payment Details */}
                    <div className="bg-gray-50/80 rounded-xl p-3 md:p-4 border border-gray-100">
                      <h4 className="text-xs md:text-sm font-semibold text-gray-700 mb-2 md:mb-3 flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-blue-600" strokeWidth={2} />
                        Payment Details
                      </h4>
                      <div className="grid grid-cols-2 gap-2 md:gap-3">
                        <div>
                          <p className="text-[10px] md:text-xs text-gray-400">Amount</p>
                          <p className="text-sm md:text-base font-bold text-gray-900">
                            {formatPrice(selectedTransaction.amount)}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] md:text-xs text-gray-400">Currency</p>
                          <p className="text-xs md:text-sm font-medium text-gray-900 uppercase">
                            {selectedTransaction.currency || "USD"}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] md:text-xs text-gray-400">Status</p>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] md:text-xs font-medium border ${getStatusBadge(selectedTransaction.status).className}`}>
                            {getStatusBadge(selectedTransaction.status).icon}
                            {getStatusBadge(selectedTransaction.status).label}
                          </span>
                        </div>
                        <div>
                          <p className="text-[10px] md:text-xs text-gray-400">Booking Status</p>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] md:text-xs font-medium border ${getBookingStatusBadge(selectedTransaction.bookingStatus).className}`}>
                            {getBookingStatusBadge(selectedTransaction.bookingStatus).label}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Parties Involved */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                      {/* Tenant */}
                      <div className="bg-gray-50/80 rounded-xl p-3 md:p-4 border border-gray-100">
                        <h4 className="text-[10px] md:text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-blue-600" strokeWidth={2} />
                          Tenant
                        </h4>
                        <div className="flex items-center gap-2 md:gap-3">
                          <div className="relative w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-[8px] md:text-xs">
                            {selectedTransaction.userImage ? (
                              <Image src={selectedTransaction.userImage} alt={selectedTransaction.userName} fill className="object-cover" />
                            ) : (
                              (selectedTransaction.userName || "U").charAt(0).toUpperCase()
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-gray-900 text-xs md:text-sm truncate">
                              {selectedTransaction.userName || "Unknown"}
                            </p>
                            <p className="text-[10px] md:text-xs text-gray-400 truncate">
                              {selectedTransaction.userEmail || "No email"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Owner */}
                      <div className="bg-gray-50/80 rounded-xl p-3 md:p-4 border border-gray-100">
                        <h4 className="text-[10px] md:text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
                          <Home className="w-3.5 h-3.5 text-blue-600" strokeWidth={2} />
                          Owner
                        </h4>
                        <div className="flex items-center gap-2 md:gap-3">
                          <div className="relative w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white font-bold text-[8px] md:text-xs">
                            {selectedTransaction.ownerImage ? (
                              <Image src={selectedTransaction.ownerImage} alt={selectedTransaction.ownerName} fill className="object-cover" />
                            ) : (
                              (selectedTransaction.ownerName || "O").charAt(0).toUpperCase()
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-gray-900 text-xs md:text-sm truncate">
                              {selectedTransaction.ownerName || "Unknown"}
                            </p>
                            <p className="text-[10px] md:text-xs text-gray-400 truncate">
                              {selectedTransaction.ownerEmail || "No email"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Property Info */}
                    <div className="bg-gray-50/80 rounded-xl p-3 md:p-4 border border-gray-100">
                      <h4 className="text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2 flex items-center gap-2">
                        <Home className="w-4 h-4 text-blue-600" strokeWidth={2} />
                        Property
                      </h4>
                      <div className="space-y-1">
                        <p className="font-medium text-gray-900 text-sm md:text-base truncate">
                          {selectedTransaction.propertyTitle || "Unknown Property"}
                        </p>
                        <p className="text-xs md:text-sm text-gray-500 truncate">
                          {selectedTransaction.propertyLocation || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </Modal.Body>

              <Modal.Footer className="px-4 md:px-6 pb-4 md:pb-6 pt-3 md:pt-4 border-t border-gray-100 flex-shrink-0">
                <Button
                  onPress={handleCloseDetailsModal}
                  className="w-full py-2.5 md:py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-all duration-300 cursor-pointer text-sm"
                >
                  Close
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
}