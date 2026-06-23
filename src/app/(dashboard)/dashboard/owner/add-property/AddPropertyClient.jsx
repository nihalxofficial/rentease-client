"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Form,
  Input,
  Label,
  TextField,
  Button,
  FieldError,
  Description,
  Select,
  ListBox,
  TextArea,
} from "@heroui/react";
import {
  Building2,
  MapPin,
  DollarSign,
  Bed,
  Bath,
  Ruler,
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
  Upload,
  X,
  ArrowLeft,
  Plus,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Star,
} from "lucide-react";
import { toast } from "react-toastify";

// ==================== ADD PROPERTY PAGE ====================
export default function AddPropertyClient() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [mainImage, setMainImage] = useState(null);
  const [secondaryImages, setSecondaryImages] = useState([]);
  const [uploadingImages, setUploadingImages] = useState(false);
  const mainImageInputRef = useRef(null);
  const secondaryImageInputRef = useRef(null);

  // ========== FORM STATE ==========
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    propertyType: "",
    price: "",
    rentType: "monthly",
    bedrooms: "",
    bathrooms: "",
    propertySize: "",
    amenities: [],
    extraFeatures: "",
    metaStatus: "pending",
  });

  // ========== AMENITIES OPTIONS ==========
  const amenitiesOptions = [
    { id: "wifi", label: "WiFi", icon: Wifi },
    { id: "parking", label: "Parking", icon: Car },
    { id: "gym", label: "Fitness Center", icon: Dumbbell },
    { id: "coffee", label: "Coffee Bar", icon: Coffee },
    { id: "security", label: "24/7 Security", icon: Shield },
    { id: "garden", label: "Green Garden", icon: TreePine },
    { id: "pool", label: "Swimming Pool", icon: Waves },
    { id: "tv", label: "Smart TV", icon: Tv },
    { id: "kitchen", label: "Kitchen", icon: Utensils },
    { id: "pets", label: "Pet Friendly", icon: PawPrint },
    { id: "bike", label: "Bike Storage", icon: Bike },
    { id: "ac", label: "Air Conditioning", icon: Snowflake },
    { id: "heating", label: "Heating", icon: Flame },
    { id: "zap", label: "Fast Charging", icon: Zap },
  ];

  const propertyTypes = [
    { id: "apartment", label: "Apartment" },
    { id: "house", label: "House" },
    { id: "villa", label: "Villa" },
    { id: "studio", label: "Studio" },
    { id: "condo", label: "Condo" },
    { id: "townhouse", label: "Townhouse" },
  ];

  const rentTypes = [
    { id: "monthly", label: "Monthly" },
    { id: "weekly", label: "Weekly" },
    { id: "daily", label: "Daily" },
  ];

  // ========== IMAGE UPLOAD HANDLERS ==========
  const uploadImageToImgBB = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    if (data.success) {
      return {
        url: data.data.url,
        thumb: data.data.thumb.url,
        name: file.name,
      };
    }
    throw new Error("Upload failed");
  };

  const handleMainImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImages(true);

    try {
      const uploaded = await uploadImageToImgBB(file);
      setMainImage({
        id: Date.now(),
        ...uploaded,
      });
      toast.success("Main image uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload main image. Please try again.");
    } finally {
      setUploadingImages(false);
      if (mainImageInputRef.current) {
        mainImageInputRef.current.value = "";
      }
    }
  };

  const handleSecondaryImagesUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploadingImages(true);

    try {
      const uploadPromises = files.map(async (file) => {
        const uploaded = await uploadImageToImgBB(file);
        return {
          id: Date.now() + Math.random(),
          ...uploaded,
        };
      });

      const uploaded = await Promise.all(uploadPromises);
      setSecondaryImages((prev) => [...prev, ...uploaded]);
      toast.success(`${uploaded.length} image(s) uploaded successfully!`);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload images. Please try again.");
    } finally {
      setUploadingImages(false);
      if (secondaryImageInputRef.current) {
        secondaryImageInputRef.current.value = "";
      }
    }
  };

  const removeMainImage = () => {
    setMainImage(null);
  };

  const removeSecondaryImage = (id) => {
    setSecondaryImages((prev) => prev.filter((img) => img.id !== id));
  };

  // ========== TOGGLE AMENITY ==========
  const toggleAmenity = (id) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(id)
        ? prev.amenities.filter((item) => item !== id)
        : [...prev.amenities, id],
    }));
  };

  // ========== HANDLE SUBMIT ==========
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formDataObj = new FormData(e.currentTarget);
    const data = Object.fromEntries(formDataObj.entries());

    // Validate main image
    if (!mainImage) {
      toast.error("Please upload a main image for your property");
      setIsLoading(false);
      return;
    }

    // Combine with state data
    const propertyData = {
      ...data,
      amenities: formData.amenities,
      mainImage: mainImage.url,
      images: secondaryImages.map((img) => img.url),
      status: formData.metaStatus,
      price: parseFloat(data.price),
      bedrooms: parseInt(data.bedrooms),
      bathrooms: parseInt(data.bathrooms),
      propertySize: parseFloat(data.propertySize),
    };

    console.log("Property Data:", propertyData);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
    toast.success("Property added successfully!");
    // router.push("/dashboard/owner/properties");
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link
            href="/dashboard/owner"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={2} />
            Back to Dashboard
          </Link>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            Add <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700">Property</span>
          </h1>
          <p className="text-gray-500 mt-1">List your property and start earning</p>
        </div>
      </div>

      {/* Form */}
      <Form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form - Takes 2/3 */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-2xl p-6 border-2 border-blue-100/50 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Basic Information</h3>

              {/* Title */}
              <TextField
                isRequired
                name="title"
                className="mb-4"
                validate={(value) => {
                  if (value.length < 3) {
                    return "Title must be at least 3 characters";
                  }
                  return null;
                }}
              >
                <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-blue-600" strokeWidth={2} />
                  Property Title
                </Label>
                <Input
                  placeholder="e.g., Modern Luxury Apartment"
                  className="w-full"
                  classNames={{
                    input: "bg-transparent text-gray-800 placeholder:text-gray-400",
                    inputWrapper: "bg-gray-50/80 border-2 border-blue-100/50 rounded-xl focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all duration-200 shadow-sm hover:border-blue-300",
                  }}
                />
                <FieldError />
              </TextField>

              {/* Description */}
              <TextField isRequired name="description">
                <Label className="text-sm font-medium text-gray-700">Description</Label>
                <TextArea
                  placeholder="Describe your property in detail..."
                  className="w-full"
                  rows={4}
                  classNames={{
                    input: "bg-transparent text-gray-800 placeholder:text-gray-400",
                    inputWrapper: "bg-gray-50/80 border-2 border-blue-100/50 rounded-xl focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all duration-200 shadow-sm hover:border-blue-300",
                  }}
                />
                <Description className="text-xs text-gray-400">
                  Provide a detailed description of your property
                </Description>
                <FieldError />
              </TextField>
            </div>

            {/* Location & Type */}
            <div className="bg-white rounded-2xl p-6 border-2 border-blue-100/50 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Location & Type</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Location */}
                <TextField isRequired name="location">
                  <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-600" strokeWidth={2} />
                    Location
                  </Label>
                  <Input
                    placeholder="e.g., Downtown, New York"
                    className="w-full"
                    classNames={{
                      input: "bg-transparent text-gray-800 placeholder:text-gray-400",
                      inputWrapper: "bg-gray-50/80 border-2 border-blue-100/50 rounded-xl focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all duration-200 shadow-sm hover:border-blue-300",
                    }}
                  />
                  <FieldError />
                </TextField>

                {/* Property Type - Fixed with aria-label */}
                <TextField isRequired name="propertyType">
                  <Label className="text-sm font-medium text-gray-700">Property Type</Label>
                  <Select
                    className="w-full"
                    placeholder="Select type"
                    name="propertyType"
                    aria-label="Property Type"
                    selectedKeys={formData.propertyType ? [formData.propertyType] : []}
                    onSelectionChange={(keys) => {
                      const selected = Array.from(keys)[0];
                      setFormData((prev) => ({ ...prev, propertyType: selected || "" }));
                    }}
                    classNames={{
                      trigger: "bg-gray-50/80 border-2 border-blue-100/50 rounded-xl focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all duration-200 shadow-sm hover:border-blue-300 data-[open=true]:border-blue-500",
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
                  <FieldError />
                </TextField>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white rounded-2xl p-6 border-2 border-blue-100/50 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Pricing</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Price */}
                <TextField
                  isRequired
                  name="price"
                  type="number"
                  validate={(value) => {
                    if (parseFloat(value) <= 0) {
                      return "Price must be greater than 0";
                    }
                    return null;
                  }}
                >
                  <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-blue-600" strokeWidth={2} />
                    Rent Price
                  </Label>
                  <Input
                    placeholder="1200"
                    className="w-full"
                    classNames={{
                      input: "bg-transparent text-gray-800 placeholder:text-gray-400",
                      inputWrapper: "bg-gray-50/80 border-2 border-blue-100/50 rounded-xl focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all duration-200 shadow-sm hover:border-blue-300",
                    }}
                  />
                  <FieldError />
                </TextField>

                {/* Rent Type - Fixed with aria-label */}
                <TextField isRequired name="rentType">
                  <Label className="text-sm font-medium text-gray-700">Rent Type</Label>
                  <Select
                    className="w-full"
                    placeholder="Select rent type"
                    name="rentType"
                    aria-label="Rent Type"
                    selectedKeys={formData.rentType ? [formData.rentType] : []}
                    onSelectionChange={(keys) => {
                      const selected = Array.from(keys)[0];
                      setFormData((prev) => ({ ...prev, rentType: selected || "monthly" }));
                    }}
                    classNames={{
                      trigger: "bg-gray-50/80 border-2 border-blue-100/50 rounded-xl focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all duration-200 shadow-sm hover:border-blue-300 data-[open=true]:border-blue-500",
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
                        {rentTypes.map((type) => (
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
                  <FieldError />
                </TextField>
              </div>
            </div>

            {/* Details */}
            <div className="bg-white rounded-2xl p-6 border-2 border-blue-100/50 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Property Details</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Bedrooms */}
                <TextField
                  isRequired
                  name="bedrooms"
                  type="number"
                  validate={(value) => {
                    if (parseInt(value) < 0) {
                      return "Must be 0 or greater";
                    }
                    return null;
                  }}
                >
                  <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Bed className="w-4 h-4 text-blue-600" strokeWidth={2} />
                    Bedrooms
                  </Label>
                  <Input
                    placeholder="3"
                    className="w-full"
                    classNames={{
                      input: "bg-transparent text-gray-800 placeholder:text-gray-400",
                      inputWrapper: "bg-gray-50/80 border-2 border-blue-100/50 rounded-xl focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all duration-200 shadow-sm hover:border-blue-300",
                    }}
                  />
                  <FieldError />
                </TextField>

                {/* Bathrooms */}
                <TextField
                  isRequired
                  name="bathrooms"
                  type="number"
                  validate={(value) => {
                    if (parseInt(value) < 0) {
                      return "Must be 0 or greater";
                    }
                    return null;
                  }}
                >
                  <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Bath className="w-4 h-4 text-blue-600" strokeWidth={2} />
                    Bathrooms
                  </Label>
                  <Input
                    placeholder="2"
                    className="w-full"
                    classNames={{
                      input: "bg-transparent text-gray-800 placeholder:text-gray-400",
                      inputWrapper: "bg-gray-50/80 border-2 border-blue-100/50 rounded-xl focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all duration-200 shadow-sm hover:border-blue-300",
                    }}
                  />
                  <FieldError />
                </TextField>

                {/* Property Size */}
                <TextField
                  isRequired
                  name="propertySize"
                  type="number"
                  validate={(value) => {
                    if (parseFloat(value) <= 0) {
                      return "Must be greater than 0";
                    }
                    return null;
                  }}
                >
                  <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Ruler className="w-4 h-4 text-blue-600" strokeWidth={2} />
                    Property Size (sqft)
                  </Label>
                  <Input
                    placeholder="1200"
                    className="w-full"
                    classNames={{
                      input: "bg-transparent text-gray-800 placeholder:text-gray-400",
                      inputWrapper: "bg-gray-50/80 border-2 border-blue-100/50 rounded-xl focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all duration-200 shadow-sm hover:border-blue-300",
                    }}
                  />
                  <FieldError />
                </TextField>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-2xl p-6 border-2 border-blue-100/50 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {amenitiesOptions.map((amenity) => {
                  const Icon = amenity.icon;
                  const isSelected = formData.amenities.includes(amenity.id);
                  return (
                    <button
                      key={amenity.id}
                      type="button"
                      onClick={() => toggleAmenity(amenity.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? "bg-blue-50 border-blue-500 text-blue-700"
                          : "bg-gray-50 border-gray-200 text-gray-600 hover:border-blue-300"
                      }`}
                    >
                      <Icon className="w-4 h-4" strokeWidth={2} />
                      <span className="text-sm">{amenity.label}</span>
                      {isSelected && <CheckCircle className="w-3 h-3 text-blue-600" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Extra Features */}
            <div className="bg-white rounded-2xl p-6 border-2 border-blue-100/50 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Extra Features</h3>
              <TextField name="extraFeatures">
                <Label className="text-sm font-medium text-gray-700">Additional Features</Label>
                <TextArea
                  placeholder="e.g., Balcony, Parking, Garden, etc."
                  className="w-full"
                  rows={2}
                  classNames={{
                    input: "bg-transparent text-gray-800 placeholder:text-gray-400",
                    inputWrapper: "bg-gray-50/80 border-2 border-blue-100/50 rounded-xl focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all duration-200 shadow-sm hover:border-blue-300",
                  }}
                />
                <Description className="text-xs text-gray-400">
                  List any additional features or highlights
                </Description>
              </TextField>
            </div>
          </div>

          {/* Sidebar - Takes 1/3 */}
          <div className="space-y-6">
            {/* Main Image Upload */}
            <div className="bg-white rounded-2xl p-6 border-2 border-blue-100/50 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" fill="#eab308" />
                Main Image
              </h3>
              <p className="text-sm text-gray-500 mb-3">This will be the primary image displayed</p>

              {mainImage ? (
                <div className="relative rounded-xl overflow-hidden border-2 border-blue-200">
                  <div className="relative h-48 w-full">
                    <Image src={mainImage.url} alt="Main" fill className="object-cover" />
                    <div className="absolute top-2 right-2 flex gap-2">
                      <span className="px-2 py-1 bg-yellow-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                        <Star className="w-3 h-3" fill="white" />
                        Main
                      </span>
                      <button
                        type="button"
                        onClick={removeMainImage}
                        className="p-1.5 bg-rose-500 hover:bg-rose-600 rounded-lg text-white transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => mainImageInputRef.current?.click()}
                  className="border-2 border-dashed border-blue-200 rounded-xl p-8 text-center cursor-pointer hover:border-blue-400 transition-colors"
                >
                  <Upload className="w-10 h-10 text-blue-400 mx-auto mb-2" strokeWidth={1.5} />
                  <p className="text-sm text-gray-600">Click to upload main image</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                </div>
              )}
              <input
                ref={mainImageInputRef}
                type="file"
                accept="image/*"
                onChange={handleMainImageUpload}
                className="hidden"
              />
              {uploadingImages && (
                <div className="mt-3 flex items-center gap-2 text-sm text-blue-600">
                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  Uploading...
                </div>
              )}
            </div>

            {/* Secondary Images */}
            <div className="bg-white rounded-2xl p-6 border-2 border-blue-100/50 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Secondary Images</h3>
              <p className="text-sm text-gray-500 mb-3">Additional property photos</p>

              <div
                onClick={() => secondaryImageInputRef.current?.click()}
                className="border-2 border-dashed border-blue-200 rounded-xl p-6 text-center cursor-pointer hover:border-blue-400 transition-colors mb-4"
              >
                <Plus className="w-8 h-8 text-blue-400 mx-auto mb-1" strokeWidth={1.5} />
                <p className="text-sm text-gray-600">Add more images</p>
              </div>
              <input
                ref={secondaryImageInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleSecondaryImagesUpload}
                className="hidden"
              />

              {secondaryImages.length > 0 && (
                <div className="grid grid-cols-2 gap-2">
                  {secondaryImages.map((img) => (
                    <div key={img.id} className="relative rounded-lg overflow-hidden border border-gray-200">
                      <div className="relative h-24 w-full">
                        <Image src={img.thumb || img.url} alt="Secondary" fill className="object-cover" />
                        <button
                          type="button"
                          onClick={() => removeSecondaryImage(img.id)}
                          className="absolute top-1 right-1 p-1 bg-rose-500 hover:bg-rose-600 rounded-lg text-white transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {uploadingImages && (
                <div className="mt-3 flex items-center gap-2 text-sm text-blue-600">
                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  Uploading images...
                </div>
              )}
            </div>

            {/* Status */}
            <div className="bg-white rounded-2xl p-6 border-2 border-blue-100/50 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Status</h3>
              <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl border border-amber-200">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Pending Review</p>
                  <p className="text-xs text-gray-500">Your property will be reviewed by admin</p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full cursor-pointer px-6 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-[0_4px_14px_rgba(37,99,235,0.35)] hover:shadow-[0_8px_24px_rgba(37,99,235,0.45)] transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Adding Property...</span>
                </>
              ) : (
                <>
                  <span>Add Property</span>
                  <Plus className="w-4 h-4 transition-transform duration-300 group-hover:rotate-90" strokeWidth={2} />
                </>
              )}
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}