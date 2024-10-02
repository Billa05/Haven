import { CityProvider } from "@/components/CityContext";
import Report from "@/components/CommunityChat";
import { LocationProvider } from "@/components/LocationContext";
export default function Home() {
  return (
    <>
      <LocationProvider>
        <CityProvider>
          <Report />
        </CityProvider>
      </LocationProvider>
    </>
  );
}
