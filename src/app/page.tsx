import { HeroSection } from "@/components/home/HeroSection";
import { SpecsStrip } from "@/components/home/SpecsStrip";
import { FeaturedVehicles } from "@/components/home/FeaturedVehicles";
import { BrandStory } from "@/components/home/BrandStory";
import { TechnologyShowcase } from "@/components/home/TechnologyShowcase";
import { NewsSection } from "@/components/home/NewsSection";
import { CTASection } from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SpecsStrip />
      <FeaturedVehicles />
      <BrandStory />
      <TechnologyShowcase />
      <NewsSection />
      <CTASection />
    </>
  );
}
