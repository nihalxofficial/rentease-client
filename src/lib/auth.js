import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGO_URI);
const db = client.db("rentease_db");

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "tenant",
      },
      plan: {
        type: "string",
        defaultValue: "free",
      },
      status: {
        type: "string",
        defaultValue: "active",
      },
    },
  },
  plugins: [
        jwt(), 
    ],
  socialProviders: {
        discord: { 
            clientId: process.env.DISCORD_CLIENT_ID, 
            clientSecret: process.env.DISCORD_CLIENT_SECRET, 
        }, 
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID , 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
        }, 
    },
    account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "email-password"], // add all your providers
    },
  },
});
