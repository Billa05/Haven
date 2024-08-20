import { useEffect } from "react";
import "../OlaMapsWebSDK/style.css";
import { OlaMaps } from "../OlaMapsWebSDK/olamaps-js-sdk.es";

export default function Olamaps() {
  useEffect(() => {
    const olaMaps = new OlaMaps({
      apiKey: "sW12r1rKlUn826Ehzutjk3DN3TmvisSCQvXglZo4",
    });

    const myMap = olaMaps.init({
      style:
        "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
      container: "map",
      center: [77.61648476788898, 12.931423492103944],
      zoom: 15,
    });

    return () => {
      if (myMap) {
        myMap.remove();
      }
    };
  }, []);

  return (
    <>
      <h1 class="mt-8 ml-4 text-xl font-bold leading-none tracking-tight text-gray-900 md:text-xl lg:text-xl dark:text-white">
        Check what's happening in your nearby
      </h1>
      <div className="mt-3 flex justify-center items-center ml-4 mr-4">
        <div
          id="map"
          className="w-full h-96 md:h-128 lg:h-144 rounded-lg p-4"
        ></div>
      </div>
    </>
  );
}
