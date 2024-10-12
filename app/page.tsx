import FaqSectionHome from "@/components/faq-section-home";
import ProductCartHome from "@/components/product-cart-home";
import HeroBanner from "@/components/hero-banner";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <ProductCartHome />
      <FaqSectionHome />
    </>
  );
}
