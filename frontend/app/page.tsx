import { Navbar } from "@/components/layout/navbar";
import { Contact } from "@/components/sections/contact";
import { Features } from "@/components/sections/features";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { Products } from "@/components/sections/products";
import { Solutions } from "@/components/sections/solutions";
import { WhyAotms } from "@/components/sections/why-aotms";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main" className="flex-1">
        <Hero />
        <WhyAotms />
        <Products />
        <Solutions />
        <Features />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
