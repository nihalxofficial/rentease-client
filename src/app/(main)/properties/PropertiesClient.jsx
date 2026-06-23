"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  MapPin,
  Bed,
  Bath,
  Ruler,
  Heart,
  Star,
  Sparkles,
  Home,
  ArrowUpDown,
  Grid3x3,
  List,
  Building2,
  Warehouse,
  Home as HomeIcon,
  Building,
  Trees,
} from "lucide-react";
import {
  Input,
  Select,
  ListBox,
  Pagination,
} from "@heroui/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

// ==================== PROPERTIES CLIENT COMPONENT ====================
export default function PropertiesClient({ properties = [], filter, total }) {
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [wishlist, setWishlist] = useState([]);
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);
  const [page, setPage] = useState(parseInt(filter.page) || 1);

  // ========== PAGINATION ==========
  const itemsPerPage = 6;
  const totalPages = Math.ceil(total / itemsPerPage);
  const startItem = (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, total);

  const getPageNumbers = () => {
    const pages = [];
    pages.push(1);
    if (page > 3) pages.push("ellipsis");
    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (page < totalPages - 2) pages.push("ellipsis");
    if (totalPages > 1) pages.push(totalPages);
    return pages;
  };

  // ========== UI STATE ==========
  const [searchTerm, setSearchTerm] = useState(filter.search || "");
  const [propertyType, setPropertyType] = useState(filter.propertyType || "all");
  const [sortBy, setSortBy] = useState(filter.sortBy || "default");

  const router = useRouter();

  useEffect(() => {
    const sp = new URLSearchParams();
    if (searchTerm) sp.set("search", searchTerm);
    if (propertyType !== "all") sp.set("propertyType", propertyType);
    if (sortBy !== "default") sp.set("sortBy", sortBy);
    sp.set("page", String(page));
    sp.set("perPage", String(itemsPerPage));
    router.push(`?${sp.toString()}`);
  }, [searchTerm, propertyType, sortBy, page, router]);

  useEffect(() => {
    setPage(1);
  }, [searchTerm, propertyType, sortBy]);

  // ========== SIMULATE LOADING ==========
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // ========== FETCH USER WISHLIST ==========
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const savedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
        setWishlist(savedWishlist);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };
    fetchWishlist();
  }, []);

  // ========== WISHLIST HANDLERS ==========
  const handleAddToWishlist = async (propertyId) => {
    setIsWishlistLoading(true);
    try {
      setWishlist((prev) => [...prev, propertyId]);
      const savedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      localStorage.setItem("wishlist", JSON.stringify([...savedWishlist, propertyId]));
      toast.success("Added to wishlist!");
    } catch (error) {
      setWishlist((prev) => prev.filter((id) => id !== propertyId));
      toast.error("Failed to add to wishlist");
      console.error("Error adding to wishlist:", error);
    } finally {
      setIsWishlistLoading(false);
    }
  };

  const handleRemoveFromWishlist = async (propertyId) => {
    setIsWishlistLoading(true);
    try {
      setWishlist((prev) => prev.filter((id) => id !== propertyId));
      const savedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      localStorage.setItem(
        "wishlist",
        JSON.stringify(savedWishlist.filter((id) => id !== propertyId))
      );
      toast.success("Removed from wishlist!");
    } catch (error) {
      setWishlist((prev) => [...prev, propertyId]);
      toast.error("Failed to remove from wishlist");
      console.error("Error removing from wishlist:", error);
    } finally {
      setIsWishlistLoading(false);
    }
  };

  const toggleWishlist = (propertyId) => {
    const isWishlisted = wishlist.includes(propertyId);
    if (isWishlisted) {
      handleRemoveFromWishlist(propertyId);
    } else {
      handleAddToWishlist(propertyId);
    }
  };

  // ========== FORMAT PRICE ==========
  const formatPrice = (price) => `$${price.toLocaleString()}`;

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

  // ========== PROPERTY TYPE ICONS ==========
  const getPropertyTypeIcon = (type) => {
    const icons = {
      apartment: Building2,
      house: HomeIcon,
      villa: Warehouse,
      studio: Building,
      condo: HomeIcon,
      townhouse: Trees,
    };
    return icons[type] || Building2;
  };

  const getPropertyTypeColor = (type) => {
    const colors = {
      apartment: "bg-blue-100 text-blue-700 border-blue-200",
      house: "bg-emerald-100 text-emerald-700 border-emerald-200",
      villa: "bg-purple-100 text-purple-700 border-purple-200",
      studio: "bg-amber-100 text-amber-700 border-amber-200",
      condo: "bg-cyan-100 text-cyan-700 border-cyan-200",
      townhouse: "bg-rose-100 text-rose-700 border-rose-200",
    };
    return colors[type] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  // ========== PROPERTY TYPES ==========
  const propertyTypes = [
    { id: "all", label: "All Types" },
    { id: "apartment", label: "Apartment" },
    { id: "house", label: "House" },
    { id: "villa", label: "Villa" },
    { id: "studio", label: "Studio" },
    { id: "condo", label: "Condo" },
    { id: "townhouse", label: "Townhouse" },
  ];

  const sortOptions = [
    { id: "default", label: "Default" },
    { id: "low-to-high", label: "Price: Low → High" },
    { id: "high-to-low", label: "Price: High → Low" },
  ];

  // ========== PROPERTY CARD COMPONENT ==========
  const PropertyCard = ({ property, isWishlisted }) => {
    const isListView = viewMode === "list";
    const TypeIcon = getPropertyTypeIcon(property.propertyType);
    const typeColor = getPropertyTypeColor(property.propertyType);
    const typeLabel = propertyTypes.find(t => t.id === property.propertyType)?.label || property.propertyType;

    return (
      <div
        className={`group bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-400 border-2 border-gray-100/60 hover:border-blue-200/70 hover:-translate-y-2 ${
          isListView ? "flex flex-col md:flex-row" : ""
        }`}
      >
        {/* Image Container */}
        <div className={`relative overflow-hidden ${isListView ? "md:w-72 md:h-auto h-56" : "h-56"}`}>
          <div className="relative w-full h-full">
            <Image
              src={property.mainImage}
              alt={property.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent" />
          </div>

          {/* Property Type Badge - Unique Design */}
          <div className={`absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 backdrop-blur-sm shadow-md ${typeColor}`}>
            <TypeIcon className="w-3.5 h-3.5" strokeWidth={2} />
            <span className="text-xs font-semibold uppercase tracking-wider">{typeLabel}</span>
          </div>

          {/* Price Badge */}
          <div className="absolute bottom-4 right-4 px-4 py-2 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50">
            <span className="text-lg font-bold text-blue-600">{formatPrice(property.price)}</span>
            <span className="text-xs text-gray-500 ml-1">/{property.rentType}</span>
          </div>

          {/* Rating Badge */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-black/40 backdrop-blur-sm rounded-full border border-white/10">
            <div className="flex items-center gap-0.5">{renderStars(property.rating)}</div>
            <span className="text-white text-sm font-medium">{property.rating}</span>
            <span className="text-white/60 text-xs">({property.reviews})</span>
          </div>

          {/* Wishlist Button */}
          <button
            onClick={() => toggleWishlist(property._id)}
            disabled={isWishlistLoading}
            className={`absolute top-4 right-4 p-2.5 rounded-full transition-all duration-300 ${
              isWishlisted
                ? "bg-rose-500 shadow-[0_4px_16px_rgba(244,63,94,0.3)]"
                : "bg-white/90 backdrop-blur-sm hover:bg-white shadow-md hover:shadow-lg"
            } ${isWishlistLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <Heart
              className={`w-4 h-4 transition-all duration-300 ${
                isWishlisted ? "fill-white text-white" : "text-gray-600 group-hover:text-rose-500"
              }`}
              strokeWidth={2}
            />
          </button>
        </div>

        {/* Content */}
        <div className={`p-5 flex-1 ${isListView ? "md:p-6" : ""}`}>
          {/* Title & Location */}
          <div className="mb-3">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-1">
              {property.title}
            </h3>
            <p className="text-gray-500 text-sm flex items-center gap-1.5 mt-1">
              <MapPin className="w-3.5 h-3.5 text-blue-400" strokeWidth={2} />
              {property.location}
            </p>
          </div>

          {/* Property Details */}
          <div className={`flex items-center gap-4 py-3 border-t border-b border-gray-100/60 ${isListView ? "flex-wrap" : ""}`}>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Bed className="w-4 h-4 text-blue-400" strokeWidth={2} />
              <span>{property.bedrooms} Beds</span>
            </div>
            <div className="w-px h-6 bg-gray-200" />
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Bath className="w-4 h-4 text-blue-400" strokeWidth={2} />
              <span>{property.bathrooms} Baths</span>
            </div>
            <div className="w-px h-6 bg-gray-200" />
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Ruler className="w-4 h-4 text-blue-400" strokeWidth={2} />
              <span>{property.propertySize} sqft</span>
            </div>
          </div>

          {/* Amenities */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {property.amenities.slice(0, isListView ? 6 : 4).map((amenity) => (
              <span
                key={amenity}
                className="px-2.5 py-1 bg-blue-50 text-blue-600 text-xs rounded-full border border-blue-100"
              >
                {amenity}
              </span>
            ))}
            {property.amenities.length > (isListView ? 6 : 4) && (
              <span className="px-2.5 py-1 bg-gray-50 text-gray-500 text-xs rounded-full border border-gray-200">
                +{property.amenities.length - (isListView ? 6 : 4)} more
              </span>
            )}
          </div>

          {/* View Details Button */}
          <Link
            href={`/properties/${property._id}`}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-[0_4px_14px_rgba(37,99,235,0.25)] hover:shadow-[0_8px_24px_rgba(37,99,235,0.35)] transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] text-sm mt-4"
          >
            View Details
            <ArrowUpDown className="w-4 h-4" strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/50 via-white to-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-blue-50/50 via-white to-white overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50/80 backdrop-blur-sm rounded-full border border-blue-100/50 mb-4">
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span className="text-blue-600 font-semibold text-xs uppercase tracking-widest">
                Properties
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mt-2">
              Find Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700">
                Dream Property
              </span>
            </h1>
            <p className="text-gray-500 mt-4 text-lg max-w-2xl mx-auto">
              Browse through our curated selection of premium rental properties
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="py-8 bg-white border-y border-gray-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search Input */}
            <div className="w-full md:flex-1">
              <Input
                placeholder="Search by location, property title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                startContent={<Search className="w-4 h-4 text-blue-500" strokeWidth={2} />}
                className="w-full"
                classNames={{
                  input: "bg-transparent text-gray-800 placeholder:text-gray-400",
                  inputWrapper:
                    "bg-white border-2 border-blue-200/60 rounded-xl focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all duration-200 shadow-sm hover:border-blue-300",
                }}
              />
            </div>

            {/* Property Type Select */}
            <div className="w-full md:w-48">
              <Select
                className="w-full"
                placeholder="All Types"
                value={propertyType !== "all" ? propertyType : null}
                onChange={(value) => setPropertyType(value ?? "all")}
                aria-label="Property Type"
                classNames={{
                  trigger:
                    "bg-white border-2 border-blue-200/60 rounded-xl focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all duration-200 shadow-sm hover:border-blue-300 data-[open=true]:border-blue-500",
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
                    {propertyTypes.map((type) => (
                      <ListBox.Item
                        key={type.id}
                        id={type.id}
                        textValue={type.label}
                        className="text-gray-700 hover:bg-blue-50 rounded-lg data-[selected=true]:bg-blue-100 data-[selected=true]:text-blue-700 transition-colors px-3 py-2.5"
                      >
                        {type.label}
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            {/* Sort By Select */}
            <div className="w-full md:w-48">
              <Select
                className="w-full"
                placeholder="Default"
                value={sortBy !== "default" ? sortBy : null}
                onChange={(value) => setSortBy(value ?? "default")}
                aria-label="Sort By"
                classNames={{
                  trigger:
                    "bg-white border-2 border-blue-200/60 rounded-xl focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all duration-200 shadow-sm hover:border-blue-300 data-[open=true]:border-blue-500",
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
                    {sortOptions.map((option) => (
                      <ListBox.Item
                        key={option.id}
                        id={option.id}
                        textValue={option.label}
                        className="text-gray-700 hover:bg-blue-50 rounded-lg data-[selected=true]:bg-blue-100 data-[selected=true]:text-blue-700 transition-colors px-3 py-2.5"
                      >
                        {option.label}
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Count with View Toggle */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-500">
              Showing <span className="font-semibold text-gray-700">{properties.length}</span> properties
            </p>
            <div className="flex gap-1 bg-gray-100/80 p-1 rounded-xl border border-gray-200">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 cursor-pointer rounded-lg transition-all duration-200 ${
                  viewMode === "grid"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-700 hover:bg-white/50"
                }`}
                aria-label="Grid view"
              >
                <Grid3x3 className="w-4 h-4" strokeWidth={2} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 cursor-pointer rounded-lg transition-all duration-200 ${
                  viewMode === "list"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-700 hover:bg-white/50"
                }`}
                aria-label="List view"
              >
                <List className="w-4 h-4" strokeWidth={2} />
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="bg-white rounded-2xl overflow-hidden border-2 border-gray-100/60 animate-pulse">
                  <div className="h-56 bg-gray-200" />
                  <div className="p-5 space-y-3">
                    <div className="h-6 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                    <div className="flex gap-4 py-3">
                      <div className="h-4 bg-gray-200 rounded w-12" />
                      <div className="h-4 bg-gray-200 rounded w-12" />
                      <div className="h-4 bg-gray-200 rounded w-12" />
                    </div>
                    <div className="flex gap-2">
                      <div className="h-6 bg-gray-200 rounded-full w-16" />
                      <div className="h-6 bg-gray-200 rounded-full w-16" />
                      <div className="h-6 bg-gray-200 rounded-full w-16" />
                    </div>
                    <div className="h-10 bg-gray-200 rounded-xl w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : properties.length === 0 ? (
            <div className="text-center py-12">
              <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <>
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "space-y-6"
                }
              >
                {properties.map((property) => (
                  <PropertyCard
                    key={property._id}
                    property={property}
                    isWishlisted={wishlist.includes(property._id)}
                  />
                ))}
              </div>

              {/* ========== PAGINATION ========== */}
              {totalPages > 1 && (
                <div className="mt-12">
                  <Pagination className="w-full">
                    <Pagination.Summary>
                      Showing {startItem}–{endItem} of {total} results
                    </Pagination.Summary>
                    <Pagination.Content>
                      <Pagination.Item>
                        <Pagination.Previous
                          isDisabled={page === 1}
                          onPress={() => setPage((p) => p - 1)}
                        >
                          <Pagination.PreviousIcon />
                          <span>Previous</span>
                        </Pagination.Previous>
                      </Pagination.Item>
                      {getPageNumbers().map((p, i) =>
                        p === "ellipsis" ? (
                          <Pagination.Item key={`ellipsis-${i}`}>
                            <Pagination.Ellipsis />
                          </Pagination.Item>
                        ) : (
                          <Pagination.Item key={p}>
                            <Pagination.Link isActive={p === page} onPress={() => setPage(p)}>
                              {p}
                            </Pagination.Link>
                          </Pagination.Item>
                        )
                      )}
                      <Pagination.Item>
                        <Pagination.Next
                          isDisabled={page === totalPages}
                          onPress={() => setPage((p) => p + 1)}
                        >
                          <span>Next</span>
                          <Pagination.NextIcon />
                        </Pagination.Next>
                      </Pagination.Item>
                    </Pagination.Content>
                  </Pagination>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}