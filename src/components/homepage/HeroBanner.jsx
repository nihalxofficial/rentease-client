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
import { Label, ListBox, Select, Input, Button } from "@heroui/react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [searchLocation, setSearchLocation] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchLocation) params.set("location", searchLocation);
    if (propertyType && propertyType !== "all") params.set("type", propertyType);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    router.push(`/properties?${params.toString()}`);
  };

  const propertyTypes = [
    { id: "all", label: "All Types" },
    { id: "apartment", label: "Apartment" },
    { id: "house", label: "House" },
    { id: "villa", label: "Villa" },
    { id: "studio", label: "Studio" },
    { id: "condo", label: "Condo" },
    { id: "townhouse", label: "Townhouse" },
  ];

  // Inline style for Input — bypasses HeroUI's @layer components specificity entirely.
  // bg-field and text-field-foreground from .input BEM class cannot be overridden
  // by Tailwind className utilities because @layer components > @layer utilities.
  // style prop always wins.
  const inputStyle = {
    backgroundColor: "#ffffff",
    color: "#1e3a8a",       // blue-900 — typed text
    borderColor: "#bfdbfe", // blue-200
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">

      {/* ========== BACKGROUND ========== */}
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
        <div className="absolute top-20 right-20 w-64 h-64 bg-white/5 rounded-full animate-float blur-2xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-white/5 rounded-full animate-float blur-2xl" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl" />
      </div>

      {/* ========== CONTENT ========== */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* ---------- Left ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/30 backdrop-blur-sm rounded-full border border-white/30">
              <Shield className="w-4 h-4 text-blue-300" strokeWidth={2} />
              <span className="text-sm font-medium text-white">Trusted by 10,000+ Users</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight drop-shadow-lg">
              {title}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-200 to-white mt-2 drop-shadow-lg">
                Rent with Confidence
              </span>
            </h1>

            <p className="text-lg text-white/95 max-w-lg leading-relaxed drop-shadow-md">
              {subtitle}
            </p>

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

          {/* ---------- Right Image ---------- */}
          {showRightImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="hidden lg:flex justify-center"
            >
              <div className="relative w-full max-w-md">
                <div className="relative bg-white/20 backdrop-blur-sm rounded-3xl border border-white/30 shadow-2xl overflow-hidden">
                  <div className="relative h-[400px] w-full">
                    <Image src={rightImage} alt={rightImageAlt} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  </div>
                </div>
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
            className="search-card mt-12 bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-4 md:p-6 max-w-5xl mx-auto border border-white/50"
          >
            <form onSubmit={handleSearch}>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {/* --- Location --- */}
                <div className="flex flex-col gap-1.5">
                  <Label className="text-xs font-semibold text-blue-600 uppercase tracking-wider flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" strokeWidth={2} />
                    Location
                  </Label>
                  <Input
                    type="text"
                    placeholder="City, Area"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    style={inputStyle}
                    className="hero-input w-full px-3 py-2.5 text-sm border-2 rounded-xl shadow-sm outline-none transition-all duration-200"
                  />
                </div>

                {/* --- Property Type --- */}
                <div className="flex flex-col gap-1.5">
                  <Label className="text-xs font-semibold text-blue-600 uppercase tracking-wider flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5" strokeWidth={2} />
                    Property Type
                  </Label>
                  <Select
                    className="w-full"
                    placeholder="All Types"
                    value={propertyType}
                    onChange={(val) => setPropertyType(val || "all")}
                  >
                    <Select.Trigger
                      className="
                        w-full flex items-center justify-between
                        px-3 py-2.5 bg-white rounded-xl
                        border-2 border-blue-200
                        shadow-sm outline-none cursor-pointer
                        hover:border-blue-300
                        data-[focus-visible=true]:border-blue-600
                        data-[focus-visible=true]:ring-2
                        data-[focus-visible=true]:ring-blue-500/20
                        transition-all duration-200
                        min-h-[42px]
                      "
                    >
                      <Select.Value className="text-sm text-blue-900 data-[placeholder=true]:text-blue-300 text-left" />
                      <Select.Indicator className="text-blue-400 shrink-0 data-[open=true]:rotate-180 transition-transform duration-200" />
                    </Select.Trigger>
                    <Select.Popover className="bg-white border border-blue-100 rounded-xl shadow-lg mt-1 overflow-hidden z-50 min-w-[160px]">
                      <ListBox className="p-1 outline-none">
                        {propertyTypes.map((type) => (
                          <ListBox.Item
                            key={type.id}
                            id={type.id}
                            textValue={type.label}
                            className="
                              flex items-center justify-between
                              px-3 py-2 text-sm text-blue-900
                              rounded-lg cursor-pointer outline-none
                              hover:bg-blue-50 hover:text-blue-700
                              data-[selected=true]:bg-blue-100
                              data-[selected=true]:text-blue-700
                              data-[selected=true]:font-semibold
                              data-[focused=true]:bg-blue-50
                              transition-colors duration-150
                            "
                          >
                            {type.label}
                            <ListBox.ItemIndicator className="text-blue-600 ml-2" />
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </div>

                {/* --- Min Price --- */}
                <div className="flex flex-col gap-1.5">
                  <Label className="text-xs font-semibold text-blue-600 uppercase tracking-wider flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5" strokeWidth={2} />
                    Min Price
                  </Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    style={inputStyle}
                    className="hero-input w-full px-3 py-2.5 text-sm border-2 rounded-xl shadow-sm outline-none transition-all duration-200 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                </div>

                {/* --- Max Price --- */}
                <div className="flex flex-col gap-1.5">
                  <Label className="text-xs font-semibold text-blue-600 uppercase tracking-wider flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5" strokeWidth={2} />
                    Max Price
                  </Label>
                  <Input
                    type="number"
                    placeholder="10,000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    style={inputStyle}
                    className="hero-input w-full px-3 py-2.5 text-sm border-2 rounded-xl shadow-sm outline-none transition-all duration-200 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                </div>

                {/* --- Search Button --- */}
                <div className="flex flex-col gap-1.5">
                  <Label className="text-xs font-semibold text-blue-600 uppercase tracking-wider opacity-0">
                    Search
                  </Label>
                  <Button
                    type="submit"
                    className="w-full h-[42px] flex items-center justify-center gap-2 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-[0_4px_14px_rgba(37,99,235,0.35)] hover:shadow-[0_8px_24px_rgba(37,99,235,0.45)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300"
                  >
                    <Search className="w-4 h-4" strokeWidth={2} />
                    <span>Search</span>
                  </Button>
                </div>
              </div>
            </form>
          </motion.div>
        )}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        /*
          Override HeroUI v3's .input BEM class scoped to the search card.
          HeroUI puts component styles in @layer components which beats @layer utilities,
          so Tailwind className alone can't win. But:
          1. style prop (inline) always beats CSS layers — used for bg + text color.
          2. @layer components with higher specificity (.search-card .input) beats
             the generic .input rule — used for placeholder (can't do via style prop).
        */
        @layer components {
          .search-card .hero-input::placeholder {
            color: #93c5fd; /* blue-300 */
          }
          .search-card .hero-input:hover {
            border-color: #93c5fd; /* blue-300 */
          }
          .search-card .hero-input:focus,
          .search-card .hero-input:focus-visible {
            border-color: #2563eb; /* blue-600 */
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
          }
        }
      `}</style>
    </section>
  );
}