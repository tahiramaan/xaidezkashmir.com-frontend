export const revalidate = 2;

import HeroSection from "@/components/Hero";
import CategoriesSection from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts";
import WhyChooseUsSection  from "@/components/WhyChooseUs";
import { MetricsSection } from "@/components/MetricsSection";
import MapSection from "@/components/Map";
import TestimonialsSection from "@/components/Testimonials";

export default async function Homepage() {

  let sliders = [];
  let categories = [];
  let products = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/home`, {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_TOKEN || "",
      },
    });

    const json = await res.json();
    const data = json?.data;

    sliders = data?.sliders || [];
    categories = data?.categories || [];
    products = data?.products || [];

  } catch (error) {
    console.error("Homepage data fetch failed:", error);
  }

  return (
    <div>
      <HeroSection slides={sliders} />
      <CategoriesSection items={categories} />
      <div className="hidden md:block">

        <WhyChooseUsSection />
        <FeaturedProducts products={products} />
      </div>
      <div className="block md:hidden">
        <FeaturedProducts products={products} />
        <WhyChooseUsSection />
      </div>
      <MetricsSection />
      <TestimonialsSection/>
      <MapSection/>
    </div>
  );
}
