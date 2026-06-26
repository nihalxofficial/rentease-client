"use server";
import stripe from "@/lib/stripe";
import { MongoClient } from "mongodb";
import { serverMutation } from "../core/server";

const client = new MongoClient(process.env.MONGO_URI);

export async function addProperty(propertyData) {
  try {
    // 1. Create Stripe Product
    const stripeProduct = await stripe.products.create({
      name: propertyData.title,
      description: propertyData.description,
      metadata: {
        location: propertyData.location,
        propertyType: propertyData.propertyType,
        bedrooms: String(propertyData.bedrooms),
        bathrooms: String(propertyData.bathrooms),
      },
      images: propertyData.mainImage ? [propertyData.mainImage] : [],
    });

    // 2. Create Stripe Price
    const stripePrice = await stripe.prices.create({
      product: stripeProduct.id,
      unit_amount: Math.round(propertyData.price * 100),
      currency: "usd",
      ...(propertyData.rentType === "monthly"
        ? { recurring: { interval: "month" } }
        : propertyData.rentType === "weekly"
          ? { recurring: { interval: "week" } }
          : {}),
    });

    const result = await serverMutation(`/properties`, {
      ...propertyData,
      stripe_product_id: stripeProduct.id,
      stripe_price_id: stripePrice.id,
      createdAt: new Date(),
    });

    return { insertedId: result.insertedId.toString() };
  } catch (error) {
    console.error("Error adding property:", error);
    return { error: error.message };
  } finally {
    await client.close();
  }
}
