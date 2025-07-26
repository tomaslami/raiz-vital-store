import Hero from "@/components/hero/hero"
import OurProcess from "@/components/our-process/our-process"
import FeaturedProducts from "@/components/featured-products/featured-products"
import AboutUs from "@/components/about-us/about-us"
import WhyChooseUs from "@/components/why-choose-us/why-choose-us"
import Contact from "@/components/contact/contact"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <OurProcess />
      <FeaturedProducts />
      <AboutUs />
      <WhyChooseUs />
    </main>
  )
}
