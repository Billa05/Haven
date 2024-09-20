"use client";

import { useEffect, useState } from "react";
import "../OlaMapsWebSDK/style.css";
import { OlaMaps } from "../OlaMapsWebSDK/olamaps-js-sdk.es";
import {EmojiMap} from "./EmojiMap";
import { Suspense } from "react";
import { Skeleton } from "./ui/skeleton";

export default function Olamaps() {
  const [loc, setLoc] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLoc(true);
        },
        (error) => {
          console.log(error);
          initializeMap();
        }
      );
    } else {
      initializeMap();
    }
  }, []);

  const initializeMap = () => {
    const olaMaps = new OlaMaps({
      apiKey: process.env.NEXT_PUBLIC_MY_OLA_API_KEY,
    });

    const myMap = olaMaps.init({
      style:
        "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
      container: "map",
      center: [78.9629, 20.5937],
      zoom: 4,
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
      .setLngLat([78.9629, 20.5937])
      .setPopup(popup)
      .addTo(myMap);

    return () => {
      if (myMap) {
        myMap.remove();
      }
    };
  };

  return (
    <>
      {loc ? (
        <EmojiMap />
      ) : (
        <div
          id="map"
          className="w-full h-full md:h-128 lg:h-144 rounded-lg p-4"
        ></div>
      )}
    </>
  );
}
