import { getProperties } from "@/lib/api/properties";
import PropertiesClient from "./PropertiesClient";

export default async function PropertiesPage({searchParams}) {
  const filter = await searchParams;

  const querySearch = new URLSearchParams(filter);
  const queryString = querySearch.toString();

  const {properties, total} = await getProperties(queryString);

  return <PropertiesClient properties={properties} filter={filter} total={total} />;
}