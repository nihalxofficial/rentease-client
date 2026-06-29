// src/app/(dashboard)/dashboard/admin/page.js
import { getUserSession } from '@/lib/core/session';
import { getProperties } from '@/lib/api/properties';
import { getBookings } from '@/lib/api/bookings';
import { getTransactions } from '@/lib/api/transaction';
import { getUsers } from '@/lib/api/users';
import AdminDashboardClient from './AdminDashboardClient';

export default async function AdminDashboardPage() {
  const session = await getUserSession();
  
  if (!session?.id) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">Please log in to view the dashboard.</p>
      </div>
    );
  }

  // Fetch all data - use perPage=1000 to get all properties
  const { properties } = await getProperties('perPage=1000') || { properties: [] };
  const bookings = await getBookings() || [];
  const transactions = await getTransactions() || [];
  const users = await getUsers() || [];

  // ========== STATS CALCULATIONS ==========
  
  // User Stats
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === "active").length;
  const suspendedUsers = users.filter(u => u.status === "suspended").length;
  const pendingUsers = users.filter(u => u.status === "pending").length;
  
  // Property Stats
  const totalProperties = properties.length;
  const approvedProperties = properties.filter(p => p.status === "approved").length;
  const pendingProperties = properties.filter(p => p.status === "pending").length;
  const rejectedProperties = properties.filter(p => p.status === "rejected").length;
  
  // Booking Stats
  const totalBookings = bookings.length;
  const approvedBookings = bookings.filter(b => b.status === "approved" || b.status === "completed").length;
  const pendingBookings = bookings.filter(b => b.status === "pending").length;
  const rejectedBookings = bookings.filter(b => b.status === "rejected").length;
  
  // Revenue Stats
  const totalRevenue = transactions
    .filter(t => t.status === "completed")
    .reduce((sum, t) => sum + (t.amount || 0), 0);
  
  // Monthly Revenue Data (Last 12 months)
  const monthlyData = [];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  for (let i = 11; i >= 0; i--) {
    const monthIndex = (currentMonth - i + 12) % 12;
    const year = currentYear - (currentMonth - i < 0 ? 1 : 0);
    const monthName = months[monthIndex];
    
    const monthTransactions = transactions.filter(t => {
      const tDate = new Date(t.createdAt);
      return tDate.getMonth() === monthIndex && 
             tDate.getFullYear() === year && 
             t.status === "completed";
    });
    
    const monthAmount = monthTransactions.reduce((sum, t) => sum + (t.amount || 0), 0);
    const monthCount = monthTransactions.length;
    
    monthlyData.push({
      month: monthName,
      revenue: monthAmount,
      transactions: monthCount,
    });
  }

  // User Role Distribution
  const roleData = [
    { name: 'Admins', value: users.filter(u => u.role === "admin").length, color: '#8b5cf6' },
    { name: 'Owners', value: users.filter(u => u.role === "owner").length, color: '#3b82f6' },
    { name: 'Tenants', value: users.filter(u => u.role === "tenant").length, color: '#10b981' },
  ].filter(item => item.value > 0);

  // Booking Status Distribution
  const bookingStatusData = [
    { name: 'Approved', value: approvedBookings, color: '#10b981' },
    { name: 'Pending', value: pendingBookings, color: '#f59e0b' },
    { name: 'Rejected', value: rejectedBookings, color: '#ef4444' },
  ].filter(item => item.value > 0);

  // Property Status Distribution
  const propertyStatusData = [
    { name: 'Approved', value: approvedProperties, color: '#10b981' },
    { name: 'Pending', value: pendingProperties, color: '#f59e0b' },
    { name: 'Rejected', value: rejectedProperties, color: '#ef4444' },
  ].filter(item => item.value > 0);

  // Recent Activity
  const recentActivity = [
    ...bookings.slice(0, 3).map(b => ({
      type: 'booking',
      message: `New booking request for "${b.title || 'property'}"`,
      time: b.createdAt,
      status: b.status,
    })),
    ...properties.slice(0, 2).map(p => ({
      type: 'property',
      message: `New property "${p.title}" added`,
      time: p.createdAt,
      status: p.status,
    })),
    ...users.slice(0, 2).map(u => ({
      type: 'user',
      message: `New user "${u.name}" registered`,
      time: u.createdAt,
      status: u.status,
    })),
  ].sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 8);

  return (
    <AdminDashboardClient 
      stats={{
        totalUsers,
        activeUsers,
        suspendedUsers,
        pendingUsers,
        totalProperties,
        approvedProperties,
        pendingProperties,
        rejectedProperties,
        totalBookings,
        approvedBookings,
        pendingBookings,
        rejectedBookings,
        totalRevenue,
      }}
      chartData={{
        monthlyData,
        roleData,
        bookingStatusData,
        propertyStatusData,
      }}
      recentActivity={recentActivity}
      adminId={session.id}
    />
  );
}