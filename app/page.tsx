import { GallerySection } from "@/components/GallerySection";
import { HeroIntro } from "@/components/HeroIntro";
import { PricesSection } from "@/components/PricesSection";
import { ReviewsContacts } from "@/components/ReviewsContacts";
import { MobileStickyCta, SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TeamSection } from "@/components/TeamSection";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroIntro />
        <TeamSection />
        <GallerySection />
        <PricesSection />
        <ReviewsContacts />
      </main>
      <SiteFooter />
      <MobileStickyCta />
    </>
  );
}
