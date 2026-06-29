// src/app/(dashboard)/dashboard/tenant/favorites/FavoritesClient.jsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Heart,
  Search,
  MapPin,
  Eye,
  ArrowRight,
  DollarSign,
  Bed,
  Bath,
  Ruler,
  Trash2,
  Home,
  Star,
  TrendingUp,
  Building2,
  Warehouse,
  Trees,
} from "lucide-react";
import { toast } from "react-toastify";
import { removeWishlist } from "@/lib/action/wishlist";

// ==================== FAVORITES CLIENT ====================
export default function FavoritesClient({ 
  properties: initialProperties = [], 
  wishlistIds = [], 
  userId 
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [properties, setProperties] = useState(initialProperties);
  const [removingId, setRemovingId] = useState(null);

  // ========== FILTERED PROPERTIES ==========
  const filteredProperties = properties.filter((property) => {
    const matchesSearch = property.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // ========== FORMAT PRICE ==========
  const formatPrice = (price) => {
    return `$${price?.toLocaleString() || 0}`;
  };

  // ========== RENDER STARS ==========
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="w-3.5 h-3.5 text-yellow-400" />
          <div className="absolute inset-0 w-1/2 overflow-hidden">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      );
    }
    return stars;
  };

  // ========== HANDLE REMOVE FAVORITE ==========
  const handleRemoveFavorite = async (propertyId) => {
    setRemovingId(propertyId);
    try {
      await removeWishlist(propertyId, userId);
      setProperties((prev) => prev.filter((p) => p._id !== propertyId));
      toast.success("Removed from favorites!");
    } catch (error) {
      console.error("Error removing favorite:", error);
      toast.error("Failed to remove from favorites. Please try again.");
    } finally {
      setRemovingId(null);
    }
  };

  // ========== STATS ==========
  const totalFavorites = properties.length;
  const totalValue = properties.reduce((sum, p) => sum + (p.price || 0), 0);
  const avgPrice = totalFavorites > 0 ? totalValue / totalFavorites : 0;
  const uniqueLocations = new Set(properties.map(p => p.location)).size;

  const statsCards = [
    {
      title: "Total Favorites",
      value: totalFavorites,
      icon: Heart,
      color: "rose",
    },
    {
      title: "Total Value",
      value: formatPrice(totalValue),
      icon: DollarSign,
      color: "emerald",
    },
    {
      title: "Avg. Price",
      value: formatPrice(avgPrice),
      icon: TrendingUp,
      color: "blue",
    },
    {
      title: "Locations",
      value: uniqueLocations,
      icon: MapPin,
      color: "purple",
    },
  ];

  // ========== GET COLOR STYLES ==========
  const getColorStyles = (color) => {
    const colors = {
      rose: { bg: "bg-rose-50", iconBg: "bg-rose-100", icon: "text-rose-600", border: "border-rose-200/60" },
      emerald: { bg: "bg-emerald-50", iconBg: "bg-emerald-100", icon: "text-emerald-600", border: "border-emerald-200/60" },
      blue: { bg: "bg-blue-50", iconBg: "bg-blue-100", icon: "text-blue-600", border: "border-blue-200/60" },
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
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-rose-600">Favorites</span>
          </h1>
          <p className="text-gray-500 mt-1">Properties you've saved for later</p>
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
                </div>
                <div className={`w-11 h-11 ${colors.iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-5 h-5 ${colors.icon}`} strokeWidth={2.2} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" strokeWidth={2} />
          <input
            type="text"
            placeholder="Search favorites..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border-2 border-blue-100/50 rounded-xl focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all duration-200 text-sm shadow-sm hover:border-rose-300"
          />
        </div>
      </div>

      {/* Favorites Table */}
      {filteredProperties.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border-2 border-blue-100/50 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
          <div className="w-20 h-20 bg-rose-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Heart className="w-10 h-10 text-rose-300" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No favorites yet</h3>
          <p className="text-gray-500 max-w-sm mx-auto">
            {searchTerm 
              ? "No properties match your search. Try adjusting your search terms."
              : "Start exploring properties and save your favorites for later!"}
          </p>
          {!searchTerm && (
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 mt-4 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
            >
              <span>Browse Properties</span>
              <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
            </Link>
          )}
        </div>
      ) : (
        <>
          <div className="bg-white rounded-2xl border-2 border-blue-100/50 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_40px_rgba(37,99,235,0.06)] transition-all duration-300 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Property</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Location</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Details</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProperties.map((property, index) => {
                    const rating = property.rating || 0;
                    const reviewCount = property.reviewCount || 0;
                    const isRemoving = removingId === property._id;

                    return (
                      <motion.tr
                        key={property._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.03 }}
                        className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                      >
                        {/* Property */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                              {property.mainImage ? (
                                <Image src={property.mainImage} alt={property.title} fill className="object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                  <Home className="w-5 h-5" strokeWidth={2} />
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 text-sm line-clamp-1">{property.title}</p>
                              <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                                <span className="flex items-center gap-0.5">
                                  <Bed className="w-3 h-3" strokeWidth={2} />
                                  {property.bedrooms || 0}
                                </span>
                                <span className="flex items-center gap-0.5">
                                  <Bath className="w-3 h-3" strokeWidth={2} />
                                  {property.bathrooms || 0}
                                </span>
                                <span className="flex items-center gap-0.5">
                                  <Ruler className="w-3 h-3" strokeWidth={2} />
                                  {property.propertySize || 0} sqft
                                </span>
                              </div>
                              {reviewCount > 0 && (
                                <div className="flex items-center gap-0.5 mt-0.5">
                                  {renderStars(rating)}
                                  <span className="text-xs text-gray-500 ml-1">({reviewCount})</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Location */}
                        <td className="py-3 px-4 hidden md:table-cell">
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <MapPin className="w-3.5 h-3.5 text-gray-400" strokeWidth={2} />
                            {property.location}
                          </div>
                        </td>

                        {/* Price */}
                        <td className="py-3 px-4">
                          <p className="text-sm font-semibold text-gray-900">{formatPrice(property.price)}</p>
                          <p className="text-[10px] text-gray-400">/{property.rentType || "mo"}</p>
                        </td>

                        {/* Details */}
                        <td className="py-3 px-4 hidden sm:table-cell">
                          {property.amenities && property.amenities.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {property.amenities.slice(0, 2).map((amenity) => (
                                <span
                                  key={amenity}
                                  className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] rounded-full border border-blue-100"
                                >
                                  {amenity}
                                </span>
                              ))}
                              {property.amenities.length > 2 && (
                                <span className="px-2 py-0.5 bg-gray-50 text-gray-500 text-[10px] rounded-full border border-gray-200">
                                  +{property.amenities.length - 2}
                                </span>
                              )}
                            </div>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            <Link
                              href={`/properties/${property._id}`}
                              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all cursor-pointer"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" strokeWidth={2} />
                            </Link>
                            <button
                              onClick={() => handleRemoveFavorite(property._id)}
                              disabled={isRemoving}
                              className={`p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all cursor-pointer ${
                                isRemoving ? "opacity-50 cursor-not-allowed" : ""
                              }`}
                              title="Remove from favorites"
                            >
                              {isRemoving ? (
                                <div className="w-4 h-4 border-2 border-rose-600 border-t-transparent rounded-full animate-spin" />
                              ) : (
                                <Trash2 className="w-4 h-4" strokeWidth={2} />
                              )}
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer Stats */}
          <div className="mt-4 flex items-center justify-between text-xs text-gray-400 px-1">
            <span>Showing {filteredProperties.length} of {properties.length} favorites</span>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1">
                <Heart className="w-3 h-3 text-rose-400" fill="#f43f5e" strokeWidth={0} />
                {properties.length} total
              </span>
              <span className="inline-flex items-center gap-1">
                <DollarSign className="w-3 h-3 text-emerald-400" strokeWidth={2} />
                {formatPrice(totalValue)}
              </span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3 h-3 text-purple-400" strokeWidth={2} />
                {uniqueLocations} locations
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}