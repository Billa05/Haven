import { useEffect, useRef, useState } from "react";
import { CityData } from "@/app/actions/CItyMapData";

import "../OlaMapsWebSDK/style.css";
import { OlaMaps } from "../OlaMapsWebSDK/olamaps-js-sdk.es";

export default function EmojiMap({ City }) {
  const [city, setCity] = useState(null);
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);

  useEffect(() => {
    const getUserLocation = async () => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLat(latitude);
          setLong(longitude);
          await fetchCityName(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    };

    const fetchCityName = async (lat, lon) => {
      try {
        const response = await fetch(
          `https://api.olamaps.io/places/v1/reverse-geocode?latlng=${lat},${lon}&api_key=${process.env.NEXT_PUBLIC_MY_OLA_API_KEY}`
        );

        const data = await response.json();
        const extracted_city = data.results[0].address_components[4].long_name;
        setCity(extracted_city);
      } catch (error) {
        console.error("Error fetching city name:", error);
      }
    };

    const fetchData = async () => {
      if (!City) {
        await getUserLocation();
        if (city) {
          const data = await CityData(city);
          initializeMap(data);
        }
      } else {
        const data = await CityData(City);
        initializeMap(data);
      }
    };

    fetchData();
  }, [City, city]);

  const initializeMap = (data) => {
    const olaMaps = new OlaMaps({
      apiKey: process.env.NEXT_PUBLIC_MY_OLA_API_KEY,
    });

    const myMap = olaMaps.init({
      style:
        "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
      container: "map",
      center: [long,lat], 
      zoom: 10,
    });

    myMap.scrollZoom.disable();

    // Function to get marker image based on crime description
    const getMarkerImage = (crimeDescription) => {
      switch (crimeDescription.toLowerCase()) {
        case "vandalism":
        case "arson":
          return "/emoji/ARSON.png";
        case "traffic violation":
        case "vehicle stolen":
          return "/emoji/VEHICLE.png";
        case "burglary":
        case "shoplifting":
          return "/emoji/BURGLARY.png"
        case "domestic violence":
        case "sexual assault":
          return "/emoji/ASSAULT.png"
        default:
          return "/emoji/EXTORTION.png";
      }
    };

    // Function to add small random offset to coordinates
    const addRandomOffset = (coordinate) => {
      return coordinate + (Math.random() * 0.2 - 0.01); // Random value between -0.01 and 0.01
    };

    data.forEach((item) => {
      const customMarker = document.createElement("div");
      customMarker.className = "w-10 h-10 bg-contain bg-no-repeat bg-center";
      customMarker.style.backgroundImage = `url('${getMarkerImage(
        item.crime_description
      )}')`;

      const popup = olaMaps.addPopup({ offset: [0, -30], anchor: "bottom" })
        .setHTML(`
          <div class="bg-white p-2 rounded shadow">
            <h3 class="font-bold">${item.crime_description}</h3>
            <p>${item.additional_info || ""}</p>
          </div>
        `);

      olaMaps
        .addMarker({
          element: customMarker,
          offset: [0, -20],
          anchor: "bottom",
        })
        .setLngLat([addRandomOffset(item.long), addRandomOffset(item.lat)])
        .setPopup(popup)
        .addTo(myMap);
    });

    return () => {
      if (myMap) {
        myMap.remove();
      }
    };
  };

  return (
    <>
      <div
        id="map"
        className="w-full h-full md:h-128 lg:h-144 rounded-lg p-4"
      ></div>
    </>
  );
}
