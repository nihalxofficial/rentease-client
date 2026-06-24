// src/app/properties/page.jsx (Server Component - Data Fetching)
import { getProperties } from "@/lib/api/properties";
import PropertiesClient from "./PropertiesClient";
import { getToken } from "@/lib/core/session";

// ==================== PROPERTIES PAGE (SERVER COMPONENT) ====================
// This component handles data fetching from your API/backend
export default async function PropertiesPage({searchParams}) {
  const filter = await searchParams;

  const querySearch = new URLSearchParams(filter);
  const queryString = querySearch.toString();
  // Fetch properties from API
  // Replace this with your actual API call
  const {properties, total} = await getProperties(queryString);
  // console.log(properties);

//   const properties = await fetchProperties();
const token = await getToken();
console.log(token);

  return <PropertiesClient properties={properties} filter={filter} total={total} />;
}