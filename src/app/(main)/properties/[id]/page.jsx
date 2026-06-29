import { getPropertyById } from '@/lib/api/properties';
import PropertyDetailsClient from './PropertyDetailsClient';
import { getUserSession } from '@/lib/core/session';
import { getReviewsByProperty } from '@/lib/api/reviews';
import { checkWishlist } from '@/lib/api/wishlist';

export default async function PropertyDetailsPage({ params }) {
  const { id } = await params;
  
  // Fetch property with try-catch to handle errors
  let propertyDetails = null;
  try {
    propertyDetails = await getPropertyById(id);
  } catch (error) {
    console.error("Error fetching property:", error);
    propertyDetails = null;
  }

  const user = await getUserSession();
  let reviews = [];
  let isWishlisted = false;

  // Only fetch reviews and wishlist if property exists
  if (propertyDetails) {
    try {
      reviews = await getReviewsByProperty(id);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      reviews = [];
    }

    try {
      const wishlistResult = await checkWishlist(id, user?.id);
      isWishlisted = wishlistResult?.isWishlisted || false;
    } catch (error) {
      console.error("Error checking wishlist:", error);
      isWishlisted = false;
    }
  }

  return (
    <PropertyDetailsClient 
      property={propertyDetails} 
      reviews={reviews}
      tenant={user}
      propertyId={id}
      wishlistStatus={isWishlisted}
    />
  );
}