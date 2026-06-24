// src/app/properties/[id]/PropertyDetailsClient.jsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Bed,
  Bath,
  Ruler,
  Heart,
  Star,
  Sparkles,
  Building2,
  Warehouse,
  Home,
  Trees,
  Wifi,
  Car,
  Dumbbell,
  Coffee,
  Shield,
  TreePine,
  Waves,
  Zap,
  Tv,
  Utensils,
  PawPrint,
  Bike,
  Snowflake,
  Flame,
  Calendar,
  User,
  Clock,
  CheckCircle,
  AlertCircle,
  Send,
  Share2,
  X,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  Link2,
} from "lucide-react";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaEnvelope,
  FaWhatsapp,
  FaTelegram,
  FaPinterest,
} from "react-icons/fa";
import { toast } from "react-toastify";

// ==================== PROPERTY DETAILS CLIENT ====================
export default function PropertyDetailsClient({ property, initialReviews = [] }) {
  const router = useRouter();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);
  const [reviews, setReviews] = useState(initialReviews);
  const [selectedRating, setSelectedRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // All images array
  const allImages = property?.images ? [property.mainImage, ...property.images] : [property?.mainImage];

  // Share URL
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = property?.title || 'Check out this property';
  const shareDescription = property?.description || 'Amazing property available for rent';
  const shareImage = property?.mainImage || '';

  // ========== PROPERTY TYPE ICON ==========
  const getPropertyTypeIcon = (type) => {
    const icons = {
      apartment: Building2,
      house: Home,
      villa: Warehouse,
      studio: Building2,
      condo: Home,
      townhouse: Trees,
    };
    return icons[type] || Building2;
  };

  const getPropertyTypeLabel = (type) => {
    const labels = {
      apartment: "Apartment",
      house: "House",
      villa: "Villa",
      studio: "Studio",
      condo: "Condo",
      townhouse: "Townhouse",
    };
    return labels[type] || type;
  };

  // ========== AMENITY ICONS ==========
  const getAmenityIcon = (amenity) => {
    const icons = {
      WiFi: Wifi,
      Parking: Car,
      Gym: Dumbbell,
      "Coffee Bar": Coffee,
      "24/7 Security": Shield,
      Garden: TreePine,
      Pool: Waves,
      "Smart TV": Tv,
      Kitchen: Utensils,
      "Pet Friendly": PawPrint,
      "Bike Storage": Bike,
      "Air Conditioning": Snowflake,
      Heating: Flame,
      "Fast Charging": Zap,
    };
    return icons[amenity] || Sparkles;
  };

  // ========== FORMAT PRICE ==========
  const formatPrice = (price) => `$${price.toLocaleString()}`;

  // ========== RENDER STARS ==========
  const renderStars = (rating, size = "md") => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];
    const starSize = size === "md" ? "w-5 h-5" : "w-4 h-4";

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={`full-${i}`} className={`${starSize} fill-yellow-400 text-yellow-400`} />
      );
    }
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className={`${starSize} text-yellow-400`} />
          <div className="absolute inset-0 w-1/2 overflow-hidden">
            <Star className={`${starSize} fill-yellow-400 text-yellow-400`} />
          </div>
        </div>
      );
    }
    return stars;
  };

  // ========== SHARE HANDLERS ==========
  const shareLinks = [
    {
      name: "Copy Link",
      icon: Copy,
      color: "bg-gray-100 text-gray-700 hover:bg-gray-200",
      action: () => {
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        toast.success("Link copied to clipboard!");
        setTimeout(() => setCopied(false), 3000);
      }
    },
    {
      name: "Facebook",
      icon: FaFacebook,
      color: "bg-[#1877f2] text-white hover:bg-[#166fe5]",
      action: () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareTitle)}`, '_blank', 'width=600,height=400');
      }
    },
    {
      name: "Twitter",
      icon: FaTwitter,
      color: "bg-[#1da1f2] text-white hover:bg-[#1a8cd8]",
      action: () => {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`, '_blank', 'width=600,height=400');
      }
    },
    {
      name: "LinkedIn",
      icon: FaLinkedin,
      color: "bg-[#0a66c2] text-white hover:bg-[#0957a8]",
      action: () => {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank', 'width=600,height=400');
      }
    },
    {
      name: "WhatsApp",
      icon: FaWhatsapp,
      color: "bg-[#25D366] text-white hover:bg-[#1da851]",
      action: () => {
        window.open(`https://wa.me/?text=${encodeURIComponent(shareTitle + ' - ' + shareUrl)}`, '_blank', 'width=600,height=400');
      }
    },
    {
      name: "Telegram",
      icon: FaTelegram,
      color: "bg-[#0088cc] text-white hover:bg-[#0077b6]",
      action: () => {
        window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`, '_blank', 'width=600,height=400');
      }
    },
    {
      name: "Pinterest",
      icon: FaPinterest,
      color: "bg-[#E60023] text-white hover:bg-[#cc001f]",
      action: () => {
        window.open(`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&media=${encodeURIComponent(shareImage)}&description=${encodeURIComponent(shareTitle)}`, '_blank', 'width=600,height=400');
      }
    },
    {
      name: "Email",
      icon: FaEnvelope,
      color: "bg-gray-700 text-white hover:bg-gray-800",
      action: () => {
        const subject = `Check out this property: ${shareTitle}`;
        const body = `${shareTitle}\n\n${shareDescription}\n\nView property: ${shareUrl}`;
        window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      }
    },
  ];

  // ========== WISHLIST HANDLERS ==========
  const handleAddToWishlist = async () => {
    setIsWishlistLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsWishlisted(true);
      toast.success("Added to wishlist!");
    } catch (error) {
      toast.error("Failed to add to wishlist");
    } finally {
      setIsWishlistLoading(false);
    }
  };

  const handleRemoveFromWishlist = async () => {
    setIsWishlistLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsWishlisted(false);
      toast.success("Removed from wishlist!");
    } catch (error) {
      toast.error("Failed to remove from wishlist");
    } finally {
      setIsWishlistLoading(false);
    }
  };

  const toggleWishlist = () => {
    if (isWishlisted) {
      handleRemoveFromWishlist();
    } else {
      handleAddToWishlist();
    }
  };

  // ========== REVIEW HANDLERS ==========
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    
    if (selectedRating === 0) {
      toast.error("Please select a rating");
      return;
    }
    if (!reviewComment.trim()) {
      toast.error("Please write a review");
      return;
    }

    setIsSubmittingReview(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      const newReview = {
        id: Date.now(),
        user: {
          name: "You",
          avatar: null,
        },
        rating: selectedRating,
        comment: reviewComment.trim(),
        date: new Date().toISOString(),
      };
      
      setReviews([newReview, ...reviews]);
      setSelectedRating(0);
      setReviewComment("");
      toast.success("Review submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit review. Please try again.");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  // ========== IMAGE GALLERY HANDLERS ==========
  const openImageModal = (index) => {
    setSelectedImageIndex(index);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  // ========== FORMAT DATE ==========
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // ========== CALCULATE AVERAGE RATING ==========
  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  const TypeIcon = getPropertyTypeIcon(property?.propertyType);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900">Property not found</h3>
          <p className="text-gray-500">The property you're looking for doesn't exist.</p>
          <Link href="/properties" className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Properties
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/50 via-white to-white">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Properties</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Left - Images - Takes 3/5 */}
          <div className="lg:col-span-3">
            {/* Main Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl border-2 border-blue-100/50 cursor-pointer" onClick={() => openImageModal(0)}>
              <div className="relative h-[420px] w-full">
                <Image
                  src={allImages[selectedImageIndex] || property.mainImage}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                
                {/* Image Counter */}
                {allImages.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs">
                    {selectedImageIndex + 1} / {allImages.length}
                  </div>
                )}
              </div>
              
              {/* Status Badge */}
              <div className="absolute top-4 left-4">
                <span className="px-4 py-2 bg-emerald-500 text-white text-sm font-semibold rounded-full flex items-center gap-2 shadow-lg">
                  <CheckCircle className="w-4 h-4" />
                  Available
                </span>
              </div>

              {/* Wishlist Button */}
              <button
                onClick={(e) => { e.stopPropagation(); toggleWishlist(); }}
                disabled={isWishlistLoading}
                className={`absolute top-4 right-4 p-3 rounded-full transition-all duration-300 shadow-lg ${
                  isWishlisted
                    ? "bg-rose-500 shadow-[0_4px_16px_rgba(244,63,94,0.3)]"
                    : "bg-white/90 backdrop-blur-sm hover:bg-white shadow-md hover:shadow-lg"
                } ${isWishlistLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <Heart
                  className={`w-5 h-5 transition-all duration-300 ${
                    isWishlisted ? "fill-white text-white" : "text-gray-600"
                  }`}
                  strokeWidth={2}
                />
              </button>

              {/* Navigation Arrows on Image */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/40 backdrop-blur-sm hover:bg-black/60 rounded-full text-white transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/40 backdrop-blur-sm hover:bg-black/60 rounded-full text-white transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-5 gap-3 mt-4">
                {allImages.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative h-20 rounded-xl overflow-hidden cursor-pointer transition-all duration-200 border-2 ${
                      selectedImageIndex === index 
                        ? "border-blue-500 shadow-[0_0_0_3px_rgba(59,130,246,0.3)]" 
                        : "border-blue-100/50 hover:border-blue-300"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Property ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    {index === 0 && (
                      <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/50 backdrop-blur-sm rounded text-white text-[10px] font-medium">
                        Main
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right - Details - Takes 2/5 */}
          <div className="lg:col-span-2 space-y-4">
            {/* Title & Location */}
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-extrabold text-gray-900 leading-tight">
                    {property.title}
                  </h1>
                  <p className="text-gray-500 flex items-center gap-1.5 mt-1 text-sm">
                    <MapPin className="w-4 h-4 text-blue-400" strokeWidth={2} />
                    {property.location}
                  </p>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                  <p className="text-2xl font-bold text-blue-600">
                    {formatPrice(property.price)}
                  </p>
                  <p className="text-xs text-gray-500">/{property.rentType}</p>
                </div>
              </div>
            </div>

            {/* Property Type Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-xl border border-blue-200 w-fit">
              <TypeIcon className="w-4 h-4 text-blue-600" strokeWidth={2} />
              <span className="text-sm font-medium text-blue-600">
                {getPropertyTypeLabel(property.propertyType)}
              </span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3 py-2 border-t border-b border-gray-100/60">
              <div className="flex items-center gap-0.5">
                {renderStars(parseFloat(averageRating))}
              </div>
              <span className="text-sm font-semibold text-gray-900">{averageRating}</span>
              <span className="text-sm text-gray-400">({reviews.length} reviews)</span>
            </div>

            {/* Property Details - Compact */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-gray-50 rounded-xl p-2.5 text-center">
                <Bed className="w-4 h-4 text-blue-400 mx-auto mb-0.5" strokeWidth={2} />
                <p className="text-sm font-semibold text-gray-900">{property.bedrooms}</p>
                <p className="text-[10px] text-gray-500">Beds</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-2.5 text-center">
                <Bath className="w-4 h-4 text-blue-400 mx-auto mb-0.5" strokeWidth={2} />
                <p className="text-sm font-semibold text-gray-900">{property.bathrooms}</p>
                <p className="text-[10px] text-gray-500">Baths</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-2.5 text-center">
                <Ruler className="w-4 h-4 text-blue-400 mx-auto mb-0.5" strokeWidth={2} />
                <p className="text-sm font-semibold text-gray-900">{property.propertySize}</p>
                <p className="text-[10px] text-gray-500">sqft</p>
              </div>
            </div>

            {/* Description - Compact */}
            <div>
              <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                {property.description}
              </p>
            </div>

            {/* Extra Features */}
            {property.extraFeatures && (
              <div className="flex flex-wrap gap-1.5">
                {property.extraFeatures.split(',').slice(0, 4).map((feature, index) => (
                  <span
                    key={index}
                    className="px-2.5 py-1 bg-blue-50 text-blue-600 text-xs rounded-full border border-blue-100"
                  >
                    {feature.trim()}
                  </span>
                ))}
                {property.extraFeatures.split(',').length > 4 && (
                  <span className="px-2.5 py-1 bg-gray-50 text-gray-500 text-xs rounded-full border border-gray-200">
                    +{property.extraFeatures.split(',').length - 4} more
                  </span>
                )}
              </div>
            )}

            {/* Key Amenities - Compact */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="grid grid-cols-2 gap-1.5">
                {property.amenities.slice(0, 4).map((amenity) => {
                  const Icon = getAmenityIcon(amenity);
                  return (
                    <div key={amenity} className="flex items-center gap-1.5 text-xs text-gray-600">
                      <Icon className="w-3.5 h-3.5 text-blue-400" strokeWidth={2} />
                      <span>{amenity}</span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-[0_4px_14px_rgba(37,99,235,0.35)] hover:shadow-[0_8px_24px_rgba(37,99,235,0.45)] transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2">
                <Calendar className="w-4 h-4" strokeWidth={2} />
                <span>Book Property</span>
              </button>

              <div className="flex gap-2">
                <button 
                  onClick={() => setIsShareModalOpen(true)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
                >
                  <Share2 className="w-4 h-4" strokeWidth={2} />
                  Share
                </button>
                <button
                  onClick={toggleWishlist}
                  disabled={isWishlistLoading}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 text-sm font-medium ${
                    isWishlisted
                      ? "bg-rose-50 text-rose-600 border-2 border-rose-200 hover:bg-rose-100"
                      : "bg-white border-2 border-gray-200 hover:bg-gray-50 text-gray-700"
                  } ${isWishlistLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <Heart
                    className={`w-4 h-4 transition-all duration-300 ${
                      isWishlisted ? "fill-rose-500 text-rose-500" : "text-gray-400"
                    }`}
                    strokeWidth={2}
                  />
                  <span>{isWishlisted ? "Wishlisted" : "Add to Wishlist"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section - Full Width */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Reviews</h2>
              <p className="text-gray-500 text-sm">
                {reviews.length} reviews • {averageRating} average rating
              </p>
            </div>
          </div>

          {/* Review Form */}
          <div className="bg-white rounded-2xl p-5 border-2 border-blue-100/50 shadow-[0_4px_20px_rgba(0,0,0,0.02)] mb-6">
            <h3 className="text-base font-semibold text-gray-900 mb-3">Write a Review</h3>
            <form onSubmit={handleSubmitReview}>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Rating *
                </label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setSelectedRating(star)}
                      className="cursor-pointer focus:outline-none"
                    >
                      <Star
                        className={`w-7 h-7 transition-colors ${
                          star <= selectedRating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-200 hover:text-gray-300"
                        }`}
                        strokeWidth={1.5}
                      />
                    </button>
                  ))}
                </div>
                {selectedRating > 0 && (
                  <p className="text-sm text-blue-600 mt-1">
                    You selected {selectedRating} star{selectedRating > 1 ? 's' : ''}
                  </p>
                )}
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Your Review *
                </label>
                <textarea
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Share your experience with this property..."
                  rows={3}
                  className="w-full px-4 py-2.5 bg-gray-50/80 border-2 border-blue-100/50 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-gray-800 placeholder:text-gray-400 shadow-sm hover:border-blue-300 resize-none text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmittingReview}
                className="px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-[0_4px_14px_rgba(37,99,235,0.25)] hover:shadow-[0_8px_24px_rgba(37,99,235,0.35)] transition-all duration-200 hover:-translate-y-0.5 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed text-sm"
              >
                {isSubmittingReview ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" strokeWidth={2} />
                    <span>Submit Review</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Reviews List */}
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-2xl p-5 border-2 border-gray-100/60 hover:border-blue-100/50 transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-xs">
                    {review.user.avatar ? (
                      <Image
                        src={review.user.avatar}
                        alt={review.user.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      review.user.name.split(' ').map(n => n[0]).join('').toUpperCase()
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center flex-wrap gap-2">
                      <h4 className="font-semibold text-gray-900 text-sm">
                        {review.user.name}
                      </h4>
                      <div className="flex items-center gap-0.5">
                        {renderStars(review.rating, "sm")}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1.5 leading-relaxed">
                      {review.comment}
                    </p>
                    <p className="text-xs text-gray-400 mt-1.5 flex items-center gap-1">
                      <Clock className="w-3 h-3" strokeWidth={2} />
                      {formatDate(review.date)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center" onClick={() => setIsShareModalOpen(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full mx-4 p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Share Property</h3>
              <button
                onClick={() => setIsShareModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {shareLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.name}
                    onClick={item.action}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${item.color}`}
                  >
                    {item.name === "Copy Link" && copied ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                    <span className="text-sm font-medium">{item.name}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-xl">
                <Link2 className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <p className="text-xs text-gray-500 truncate flex-1">{shareUrl}</p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(shareUrl);
                    toast.success("Link copied!");
                  }}
                  className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <Copy className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {isImageModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center" onClick={closeImageModal}>
          <div className="relative max-w-6xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeImageModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            
            <div className="relative h-[70vh] w-full">
              <Image
                src={allImages[selectedImageIndex]}
                alt={property.title}
                fill
                className="object-contain"
              />
            </div>

            {allImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full text-white transition-all"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full text-white transition-all"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
                
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-2">
                  {allImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === selectedImageIndex ? "bg-white w-6" : "bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}