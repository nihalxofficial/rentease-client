// src/components/sections/TopLocations.jsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin,
  Sparkles,
  ChevronRight,
  Building2,
  Home,
} from "lucide-react";

// ==================== TOP LOCATIONS COMPONENT ====================
export default function TopLocations({
  title = "Top Locations",
  subtitle = "Most popular cities for rental properties",
  viewAllLink = "/properties",
  viewAllText = "View All Locations",
  locations = [
    {
      id: 1,
      name: "New York",
      state: "NY",
      image: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=600&h=400&fit=crop",
      properties: 1240,
      slug: "new-york",
    },
    {
      id: 2,
      name: "Los Angeles",
      state: "CA",
      image: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=600&h=400&fit=crop",
      properties: 980,
      slug: "los-angeles",
    },
    {
      id: 3,
      name: "Chicago",
      state: "IL",
      image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=600&h=400&fit=crop",
      properties: 760,
      slug: "chicago",
    },
    {
      id: 4,
      name: "Miami",
      state: "FL",
      image: "https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?w=600&h=400&fit=crop",
      properties: 650,
      slug: "miami",
    },
    {
      id: 5,
      name: "Seattle",
      state: "WA",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&h=400&fit=crop",
      properties: 540,
      slug: "seattle",
    },
    {
      id: 6,
      name: "Austin",
      state: "TX",
      image: "https://images.unsplash.com/photo-1522083165195-3424ed129620?w=600&h=400&fit=crop",
      properties: 480,
      slug: "austin",
    },
  ],
}) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50/80 backdrop-blur-sm rounded-full border border-blue-100/50 mb-4">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span className="text-blue-600 font-semibold text-xs uppercase tracking-widest">
              Explore
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">
            {title}
          </h2>
          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Locations Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {locations.map((location, index) => (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative overflow-hidden rounded-2xl"
            >
              <Link href={`/properties?location=${location.slug}`}>
                <div className="relative h-40 w-full overflow-hidden">
                  <Image
                    src={location.image}
                    alt={location.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Gradient Overlay - Blue gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-800/40 to-transparent group-hover:from-blue-900/90 transition-all duration-300" />
                  
                  {/* Blue gradient accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-bold text-lg group-hover:text-blue-200 transition-colors duration-300">
                    {location.name}
                  </h3>
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <MapPin className="w-3.5 h-3.5" strokeWidth={2} />
                    <span>{location.state}</span>
                    <span className="w-1 h-1 rounded-full bg-white/40" />
                    <span className="flex items-center gap-1">
                      <Home className="w-3 h-3" strokeWidth={2} />
                      {location.properties.toLocaleString()} properties
                    </span>
                  </div>
                </div>

                {/* Hover overlay with blue gradient glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 via-transparent to-transparent" />
                  <div className="absolute bottom-16 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-1 text-white text-sm font-medium bg-blue-600/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-blue-400/30">
                      <span>Explore</span>
                      <ChevronRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href={viewAllLink}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-blue-600 font-semibold rounded-2xl border-2 border-blue-100 hover:border-blue-400 shadow-sm hover:shadow-[0_8px_24px_rgba(37,99,235,0.12)] transition-all duration-300 hover:-translate-y-1 group"
          >
            <span>{viewAllText}</span>
            <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 text-blue-500" strokeWidth={2.5} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}