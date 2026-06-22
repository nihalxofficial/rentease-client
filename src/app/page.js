import CustomerReviews from "@/components/homepage/CustomerReviews";
import FeaturedProperties from "@/components/homepage/FeaturedProperties";
import HeroBanner from "@/components/homepage/HeroBanner";
import TopLocations from "@/components/homepage/TopLocations";
import WhyChooseUs from "@/components/homepage/WhyChooseUs";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <HeroBanner/>
      <FeaturedProperties/>
      <WhyChooseUs/>
      <CustomerReviews/>
      <TopLocations/>
    </div>
  );
}
