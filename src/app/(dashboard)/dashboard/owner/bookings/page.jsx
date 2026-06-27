// src/app/(dashboard)/dashboard/owner/bookings/page.js
import { getUserSession } from '@/lib/core/session';
import { getBookingsByOwner } from '@/lib/api/bookings';
import { getTransactions } from '@/lib/api/transaction';
import { getPropertyById } from '@/lib/api/properties';
import { getUserById } from '@/lib/api/users';
import OwnerBookingsClient from './OwnerBookingsClient';

export default async function OwnerBookingsPage() {
  const session = await getUserSession();
  
  if (!session?.id) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">Please log in to view your bookings.</p>
      </div>
    );
  }

  // Fetch bookings for properties owned by this owner
  const bookings = await getBookingsByOwner(session.id) || [];
  
  // Enrich bookings with property and user details
  const enrichedBookings = await Promise.all(
    bookings.map(async (booking) => {
      try {
        // Fetch property details
        const property = await getPropertyById(booking.propertyId);
        
        // Fetch tenant details
        let tenant = null;
        if (booking.userId) {
          try {
            tenant = await getUserById(booking.userId);
          } catch (error) {
            console.error(`Failed to fetch user ${booking.userId}:`, error);
          }
        }
        
        return {
          ...booking,
          propertyTitle: property?.title || booking.title,
          propertyLocation: property?.location || "N/A",
          propertyImage: property?.mainImage || null,
          propertyType: property?.propertyType || null,
          bedrooms: property?.bedrooms || 0,
          bathrooms: property?.bathrooms || 0,
          propertySize: property?.propertySize || 0,
          tenantName: tenant?.name || "Unknown",
          tenantEmail: tenant?.email || "",
          tenantImage: tenant?.image || null,
        };
      } catch (error) {
        console.error(`Failed to enrich booking ${booking._id}:`, error);
        return {
          ...booking,
          propertyTitle: booking.title || "Property",
          propertyLocation: "N/A",
          propertyImage: null,
          tenantName: "Unknown",
          tenantEmail: "",
          tenantImage: null,
        };
      }
    })
  );

  // Fetch all transactions to match with bookings
  const allTransactions = await getTransactions() || [];
  
  // Filter transactions for this owner's bookings
  const bookingIds = enrichedBookings.map(b => b._id);
  const transactions = allTransactions.filter(t => bookingIds.includes(t.bookingId));

  return (
    <OwnerBookingsClient 
      bookings={enrichedBookings}
      transactions={transactions}
      userId={session.id}
    />
  );
}