import Box from "@/components/Box";
import { CityProvider } from "@/components/CityContext";
import Footer from "@/components/Footer";
import { Hero38 } from "@/components/Hero";
import Navbar1 from "@/components/Navbar";
import News from "@/components/News";

export default function Home() {
  return (
    <>
      <CityProvider>
        <Navbar1 />
        <Hero38 />
        <Box />
        <News />
        <Footer />
      </CityProvider>
    </>
  );
}
