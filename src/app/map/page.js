import Map from "@/components/map";
import { CityProvider } from "@/components/CityContext";

export default function Home() {
  return (
    <>
      <CityProvider>
        <Map/>
      </CityProvider>
    </>
  );
}