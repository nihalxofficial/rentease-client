// src/app/(dashboard)/dashboard/admin/transactions/page.js
import { getUserSession } from '@/lib/core/session';
import { getTransactions } from '@/lib/api/transaction';
import { getBookings } from '@/lib/api/bookings';
import { getPropertyById } from '@/lib/api/properties';
import { getUsers } from '@/lib/api/users';
import AdminTransactionsClient from './AdminTransactionsClient';

export default async function AdminTransactionsPage({ searchParams }) {
  const filter = await searchParams;
  const session = await getUserSession();

  // Fetch all transactions
  const transactions = await getTransactions() || [];
  
  // Fetch bookings and users
  const bookings = await getBookings() || [];
  const users = await getUsers() || [];

  // Create user map for fast lookups
  const userMap = {};
  users.forEach(u => {
    userMap[u._id] = u;
  });

  const bookingMap = {};
  bookings.forEach(b => {
    bookingMap[b._id] = b;
  });

  // Enrich transactions with property, booking, and user details
  const enrichedTransactions = await Promise.all(
    transactions.map(async (transaction) => {
      try {
        // Fetch property details using getPropertyById
        let property = null;
        if (transaction.propertyId) {
          try {
            property = await getPropertyById(transaction.propertyId);
          } catch (error) {
            console.error(`Failed to fetch property ${transaction.propertyId}:`, error);
          }
        }
        
        const booking = bookingMap[transaction.bookingId];
        const user = userMap[transaction.userId];
        const owner = userMap[transaction.ownerId];
        
        return {
          ...transaction,
          bookingStatus: booking?.status || "N/A",
          propertyTitle: property?.title || "Unknown Property",
          propertyLocation: property?.location || "N/A",
          propertyImage: property?.mainImage || null,
          propertyType: property?.propertyType || null,
          userName: user?.name || "Unknown",
          userEmail: user?.email || "",
          userImage: user?.image || null,
          ownerName: owner?.name || "Unknown",
          ownerEmail: owner?.email || "",
          ownerImage: owner?.image || null,
        };
      } catch (error) {
        console.error(`Failed to enrich transaction ${transaction._id}:`, error);
        return {
          ...transaction,
          bookingStatus: "N/A",
          propertyTitle: "Unknown Property",
          propertyLocation: "N/A",
          propertyImage: null,
          userName: "Unknown",
          userEmail: "",
          userImage: null,
          ownerName: "Unknown",
          ownerEmail: "",
          ownerImage: null,
        };
      }
    })
  );

  // Calculate stats
  const stats = {
    total: enrichedTransactions.length,
    completed: enrichedTransactions.filter(t => t.status === "completed").length,
    pending: enrichedTransactions.filter(t => t.status === "pending").length,
    failed: enrichedTransactions.filter(t => t.status === "failed").length,
    refunded: enrichedTransactions.filter(t => t.status === "refunded").length,
    totalRevenue: enrichedTransactions
      .filter(t => t.status === "completed")
      .reduce((sum, t) => sum + (t.amount || 0), 0),
  };

  if (!session?.id) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">Please log in to view transactions.</p>
      </div>
    );
  }

  return (
    <AdminTransactionsClient 
      transactions={enrichedTransactions}
      total={enrichedTransactions.length}
      stats={stats}
      adminId={session.id}
    />
  );
}