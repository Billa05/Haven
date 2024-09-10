"use client"
import { useEffect } from "react";
import "../OlaMapsWebSDK/style.css";
import { OlaMaps } from "../OlaMapsWebSDK/olamaps-js-sdk.es";

export default function Olamaps() {
  useEffect(() => {
    const olaMaps = new OlaMaps({
      apiKey: process.env.MY_OLA_API_KEY,
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
      <div
        id="map"
        className="w-full h-full md:h-128 lg:h-144 rounded-lg p-4"
      ></div>
    </>
  );
}
