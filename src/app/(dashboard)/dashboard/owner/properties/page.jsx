// src/app/(dashboard)/dashboard/owner/properties/page.js
import { getUserSession } from '@/lib/core/session';
import { getProperties } from '@/lib/api/properties';
import OwnerPropertiesClient from './OwnerPropertiesClient';

export default async function OwnerPropertiesPage({ searchParams }) {
  const session = await getUserSession();

  if (!session?.id) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">Please log in to view your properties.</p>
      </div>
    );
  }

  const filter = await searchParams;
  const querySearch = new URLSearchParams(filter);
  querySearch.set("ownerId", session.id); // always filter by owner
  const queryString = querySearch.toString();

  const [filteredResult, pendingResult, approvedResult, rejectedResult] = await Promise.all([
    getProperties(queryString),
    getProperties(`ownerId=${session.id}&status=pending&perPage=1`),
    getProperties(`ownerId=${session.id}&status=approved&perPage=1`),
    getProperties(`ownerId=${session.id}&status=rejected&perPage=1`),
  ]);

  const { properties, total } = filteredResult || { properties: [], total: 0 };

  const globalStats = {
    total: (pendingResult?.total || 0) + (approvedResult?.total || 0) + (rejectedResult?.total || 0),
    pending: pendingResult?.total || 0,
    approved: approvedResult?.total || 0,
    rejected: rejectedResult?.total || 0,
    totalValue: properties.reduce((sum, p) => sum + (p.price || 0), 0),
  };

  return (
    <OwnerPropertiesClient
      properties={properties || []}
      total={total || 0}
      filter={filter}
      userId={session.id}
      globalStats={globalStats}
    />
  );
}