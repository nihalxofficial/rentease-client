// src/components/shared/HeroBanner.jsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero_bg.png";
import {
  Search,
  MapPin,
  Building2,
  DollarSign,
  Home,
  Users,
  Shield,
  Star,
  PlayCircle,
} from "lucide-react";

// ==================== HERO BANNER COMPONENT ====================
export default function HeroBanner({
  title = "Find Your Dream Property",
  subtitle = "Discover thousands of rental properties across the country. Book your next home with ease and security.",
  backgroundImage = heroBg,
  rightImage = "https://freerangestock.com/sample/130171/house-with-blue-sky-.jpg",
  rightImageAlt = "Modern Property",
  overlayOpacity = 0.55,
  showSearch = true,
  showStats = true,
  showRightImage = true,
  stats = [
    { label: "Properties", value: "2,500+", icon: Home },
    { label: "Happy Tenants", value: "10,000+", icon: Users },
    { label: "Trusted Owners", value: "500+", icon: Shield },
  ],
  primaryButtonText = "Explore Now",
  primaryButtonLink = "/properties",
  secondaryButtonText = "Watch Video",
  secondaryButtonLink = "#",
}) {
  const [searchLocation, setSearchLocation] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching:", { searchLocation, propertyType, minPrice, maxPrice });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* ========== BACKGROUND IMAGE ========== */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt="Hero Background"
          fill
          priority
          className="object-cover"
          quality={90}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, rgba(30,58,138,0.6) 0%, rgba(59,130,246,0.5) 50%, rgba(96,165,250,0.4) 100%)",
            opacity: overlayOpacity,
          }}
        />
        
        {/* Decorative floating elements */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-white/5 rounded-full animate-float blur-2xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-white/5 rounded-full animate-float blur-2xl" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl" />
      </div>

      {/* ========== CONTENT ========== */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-6"
          >
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/30 backdrop-blur-sm rounded-full border border-white/30">
              <Shield className="w-4 h-4 text-yellow-300" strokeWidth={2} />
              <span className="text-sm font-medium text-white">
                Trusted by 10,000+ Users
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight drop-shadow-lg">
              {title}
              <span className="block text-yellow-300 mt-2">
                Today
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-white/95 max-w-lg leading-relaxed drop-shadow-md">
              {subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href={primaryButtonLink}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-700 font-semibold rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.25)] transition-all duration-300 transform hover:-translate-y-1 active:scale-[0.98]"
              >
                <Search className="w-5 h-5" strokeWidth={2} />
                <span>{primaryButtonText}</span>
              </Link>
              <Link
                href={secondaryButtonLink}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/30 backdrop-blur-sm border-2 border-white/50 text-white font-semibold rounded-2xl hover:bg-white/40 transition-all duration-300 transform hover:-translate-y-1"
              >
                <PlayCircle className="w-5 h-5" strokeWidth={2} />
                <span>{secondaryButtonText}</span>
              </Link>
            </div>

            {/* Stats */}
            {showStats && (
              <div className="flex flex-wrap gap-8 pt-4">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-2 border border-white/20">
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
                        <Icon className="w-5 h-5 text-white" strokeWidth={2} />
                      </div>
                      <div>
                        <p className="text-xl font-bold text-white drop-shadow-md">{stat.value}</p>
                        <p className="text-sm text-white/80 drop-shadow-sm">{stat.label}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>

          {/* Right Side - Simple Image */}
          {showRightImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="hidden lg:flex justify-center"
            >
              <div className="relative w-full max-w-md">
                {/* Main Image Card */}
                <div className="relative bg-white/20 backdrop-blur-sm rounded-3xl border border-white/30 shadow-2xl overflow-hidden">
                  <div className="relative h-[400px] w-full">
                    <Image
                      src={rightImage}
                      alt={rightImageAlt}
                      fill
                      className="object-cover"
                    />
                    {/* Subtle gradient overlay for better aesthetics */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  </div>
                </div>

                {/* Rating Badge - Floating */}
                <div className="absolute -top-4 -right-4 bg-white/95 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-xl border border-white/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <Star className="w-5 h-5 text-emerald-600" fill="#10b981" strokeWidth={0} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">4.9/5</p>
                      <p className="text-xs text-gray-500">Average Rating</p>
                    </div>
                  </div>
                </div>

                {/* Available Badge - Floating */}
                <div className="absolute -bottom-2 -left-2 bg-emerald-500/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg border border-white/30">
                  <p className="text-white text-xs font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    Premium Properties Available
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* ========== SEARCH BAR ========== */}
        {showSearch && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="mt-12 bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-4 md:p-6 max-w-4xl mx-auto border border-white/50"
          >
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Location */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                    <MapPin className="inline w-3.5 h-3.5 mr-1" strokeWidth={2} />
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" strokeWidth={2} />
                    <input
                      type="text"
                      placeholder="City, Area"
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Property Type */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                    <Building2 className="inline w-3.5 h-3.5 mr-1" strokeWidth={2} />
                    Property Type
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" strokeWidth={2} />
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 appearance-none"
                    >
                      <option value="all">All Types</option>
                      <option value="apartment">Apartment</option>
                      <option value="house">House</option>
                      <option value="villa">Villa</option>
                      <option value="studio">Studio</option>
                    </select>
                  </div>
                </div>

                {/* Min Price */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                    <DollarSign className="inline w-3.5 h-3.5 mr-1" strokeWidth={2} />
                    Min Price
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" strokeWidth={2} />
                    <input
                      type="number"
                      placeholder="$0"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Max Price */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                    <DollarSign className="inline w-3.5 h-3.5 mr-1" strokeWidth={2} />
                    Max Price
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" strokeWidth={2} />
                    <input
                      type="number"
                      placeholder="$10,000"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                    />
                  </div>
                </div>
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="w-full md:w-auto px-12 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-[0_4px_14px_rgba(37,99,235,0.35)] hover:shadow-[0_8px_24px_rgba(37,99,235,0.45)] transition-all duration-300 transform hover:-translate-y-0.5 active:scale-[0.98] flex items-center justify-center gap-2 mx-auto"
              >
                <Search className="w-5 h-5" strokeWidth={2} />
                <span>Search Properties</span>
              </button>
            </form>
          </motion.div>
        )}
      </div>

      {/* ========== ANIMATION STYLES ========== */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}