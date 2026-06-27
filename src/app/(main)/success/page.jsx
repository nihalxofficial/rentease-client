// app/payment/success/page.js
import stripe from '@/lib/stripe';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Home, ArrowRight, Mail, Calendar, Building2, Receipt } from 'lucide-react';
import { getUserSession } from '@/lib/core/session';
import { addBooking } from '@/lib/action/bookings';

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;
  const user = await getUserSession();

  if (!session_id) {
    redirect("/properties")
  }

  const {
    status,
    metadata,
    customer_details: { email: customerEmail },
    amount_total,
    currency,
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  });

  // If payment is still open, redirect to home
  if (status === 'open') {
    return redirect('/');
  }

  // If payment is complete
  if (status === 'complete') {
    // Api call for Post subscription and change user plan
    const bookingResult = await addBooking({...metadata, session_id});

    const formattedAmount = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'usd',
    }).format(amount_total / 100);


    // console.log(metadata);

    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50/50 via-white to-white flex items-center justify-center px-4 py-20 md:py-28">
        {/* Background Decorations */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-2xl w-full mx-auto">
          <div className="bg-white rounded-3xl border-2 border-emerald-100/50 shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden">
            {/* Header */}
            <div className="relative bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 px-8 py-10 text-center">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
              
              <div className="relative z-10">
                <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white/30 shadow-xl">
                  <CheckCircle className="w-12 h-12 text-white" strokeWidth={2} />
                </div>
                <h1 className="text-3xl font-extrabold text-white">Payment Successful!</h1>
                <p className="text-emerald-100/90 mt-2">Your booking has been confirmed</p>
              </div>
            </div>

            {/* Body */}
            <div className="p-8 space-y-6">
              {/* Success Message */}
              <div className="text-center">
                <p className="text-gray-600 text-sm">
                  We appreciate your business! A confirmation email will be sent to{' '}
                  <span className="font-medium text-gray-900">{customerEmail}</span>.
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  If you have any questions, please email{' '}
                  <a href="mailto:orders@rentease.com" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                    orders@rentease.com
                  </a>.
                </p>
              </div>

              {/* Booking Details */}
              <div className="bg-gray-50/80 rounded-2xl p-5 border border-gray-100">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Receipt className="w-4 h-4 text-emerald-500" strokeWidth={2} />
                  Booking Details
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Property</span>
                    <span className="font-medium text-gray-900">{metadata?.title || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Amount Paid</span>
                    <span className="font-bold text-emerald-600">{formattedAmount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Transaction ID</span>
                    <span className="font-mono text-xs text-gray-600 truncate max-w-[150px]">{session_id}</span>
                  </div>
                </div>
              </div>

              {/* What's Next */}
              <div className="bg-blue-50/50 rounded-2xl p-5 border border-blue-100/50">
                <h3 className="text-sm font-semibold text-blue-700 mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4" strokeWidth={2} />
                  What's Next?
                </h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-600 text-xs font-bold">1</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Check Your Email</p>
                      <p className="text-gray-500 text-xs">You'll receive a confirmation email with all booking details</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-600 text-xs font-bold">2</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Property Owner Notification</p>
                      <p className="text-gray-500 text-xs">The property owner has been notified of your booking</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-600 text-xs font-bold">3</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Move-in Preparation</p>
                      <p className="text-gray-500 text-xs">You&apos;ll hear from the property owner regarding move-in details</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href={`/dashboard/${user?.role}/bookings`}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-[0_4px_14px_rgba(37,99,235,0.35)] hover:shadow-[0_8px_24px_rgba(37,99,235,0.45)] transition-all duration-300 hover:-translate-y-1"
                >
                  <span>View My Bookings</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                </Link>
                <Link
                  href="/properties"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl border-2 border-blue-100 hover:border-blue-400 shadow-sm hover:shadow-[0_8px_24px_rgba(37,99,235,0.12)] transition-all duration-300 hover:-translate-y-1 group"
                >
                  <Home className="w-4 h-4" strokeWidth={2.5} />
                  <span>Browse More Properties</span>
                </Link>
              </div>

              {/* Support */}
              <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1">
                <Mail className="w-3 h-3" strokeWidth={2} />
                <span>Need help? </span>
                <Link href="/contact" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                  Contact Support
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Fallback for other statuses
  return redirect('/');
}