import HeroSection from "../components/HeroSection";
import CategoryGrid from "../components/CategoryGrid";
import FeaturedProducts from "../components/FeaturedProducts";
import WhyChooseUs from "../components/WhyChooseUs";
import TestimonialSection from "../components/TestimonialSection";
import CTABanner from "../components/CTABanner";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategoryGrid />
      <FeaturedProducts />
      <WhyChooseUs />
      <TestimonialSection />
      <CTABanner />
    </>
  );
}
