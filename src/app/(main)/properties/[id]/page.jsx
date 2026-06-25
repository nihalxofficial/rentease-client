import { getPropertyById } from '@/lib/api/properties';
import PropertyDetailsClient from './PropertyDetailsClient';
import { getUserSession } from '@/lib/core/session';
import { getReviewsByProperty } from '@/lib/api/reviews';

export default async function PropertyDetailsPage({ params }) {
  const { id } = await params;
  const propertyDetails = await getPropertyById(id);

  const user = await getUserSession();
  const reviews = await getReviewsByProperty(id);

  return (
    <PropertyDetailsClient 
      property={propertyDetails} 
      reviews={reviews}
      tenant={user}
      propertyId={id}
    />
  );
}