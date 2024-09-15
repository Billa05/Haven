"use client";
import { useEffect } from "react";
import "../OlaMapsWebSDK/style.css";
import { OlaMaps } from "../OlaMapsWebSDK/olamaps-js-sdk.es";

export default function Olamaps() {
  useEffect(() => {
    const olaMaps = new OlaMaps({
      apiKey: process.env.NEXT_PUBLIC_MY_OLA_API_KEY,
    });

    const myMap = olaMaps.init({
      style:
        "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
      container: "map",
      center: [80.248357, 13.084622],
      zoom: 10,
    });

    myMap.scrollZoom.disable();
    // myMap.doubleClickZoom.disable();
    // myMap.boxZoom.disable();

    const popup = olaMaps
      .addPopup({ offset: [0, -30], anchor: "bottom" })
      .setHTML("<div>This is Popup</div>");

    olaMaps
      .addMarker({
        offset: [0, 6],
        anchor: "bottom",
        color: "red",
        draggable: true,
      })
      .setLngLat([80.248357, 13.084622])
      .setPopup(popup)
      .addTo(myMap);

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
