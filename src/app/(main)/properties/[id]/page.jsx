// src/app/properties/[id]/page.jsx
import { getPropertyById } from '@/lib/api/properties';
import PropertyDetailsClient from './PropertyDetailsClient';

// ==================== PROPERTY DETAILS PAGE (SERVER) ====================
export default async function PropertyDetailsPage({ params }) {
  const { id } = await params;
  const propertyDetails = await getPropertyById(id);
  
  // Fetch reviews for this property
  const reviews = [
    {
      id: 1,
      user: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
      },
      rating: 5,
      comment: "Absolutely love this place! The location is perfect and the apartment is spacious and well-maintained. Highly recommend!",
      date: "2026-06-20T10:30:00.000Z",
    },
    {
      id: 2,
      user: {
        name: "Michael Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      },
      rating: 4.5,
      comment: "Great experience overall. The host was very responsive and helpful. The apartment had everything we needed.",
      date: "2026-06-18T14:20:00.000Z",
    },
    {
      id: 3,
      user: {
        name: "Emily Davis",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      },
      rating: 5,
      comment: "Beautiful apartment with stunning views. The location is unbeatable and the amenities are top-notch.",
      date: "2026-06-15T09:45:00.000Z",
    },
  ];

  return (
    <PropertyDetailsClient 
      property={propertyDetails} 
      initialReviews={reviews}
    />
  );
}