import { NextResponse } from "next/server";
import { headers } from "next/headers";
import stripe from "@/lib/stripe";
import { getUserSession } from "@/lib/core/session";

export async function POST(request) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    const user = await getUserSession();
    const formData = await request.formData();

    const price = formData.get("propertyPrice");
    const title = formData.get("propertyTitle");
    const propertyId = formData.get("propertyId");
    const ownerId = formData.get("ownerId");
    const moveInDate = formData.get("moveInDate");
    const contactNumber = formData.get("contactNumber");
    const additionalNotes = formData.get("additionalNotes");

    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: Number(price) * 100,
            product_data: {
              name: title,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        propertyId,
        ownerId,
        price: Number(price),
        userId: user?.id,
        userRole: user?.role,
        title,
        moveInDate,
        contactNumber,
        additionalNotes,
      },
      mode: "payment",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    console.error("Stripe error:", err);
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
