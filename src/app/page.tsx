import Hero from "@/components/hero/hero"
import OurProcess from "@/components/our-process/our-process"
import FeaturedProducts from "@/components/featured-products/featured-products"
import AboutUs from "@/components/about-us/about-us"
import RecommendedCombos from "@/components/recommended-combos/recommended-combos"
import FAQ from "@/components/faq/faq"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <AboutUs />
      <RecommendedCombos />
      <OurProcess />
      <FeaturedProducts />
      <FAQ />
    </main>
  )
}
