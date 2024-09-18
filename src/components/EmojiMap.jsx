import { useEffect, useState } from "react";
import { CityData } from "@/app/actions/CItyMapData";
import "../OlaMapsWebSDK/style.css";
import { OlaMaps } from "../OlaMapsWebSDK/olamaps-js-sdk.es";
import { Skeleton } from "./ui/skeleton";

export default function EmojiMap({ CityProp }) {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [map, setMap] = useState(null);

  useEffect(() => {
    const getUserLocation = () => {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLat(latitude);
            setLong(longitude);
            resolve({ latitude, longitude });
          },
          (error) => {
            console.error("Error getting location:", error);
            reject(error);
          }
        );
      });
    };

    const fetchCityName = async (lat, lon) => {
      try {
        const response = await fetch(
          `https://api.olamaps.io/places/v1/reverse-geocode?latlng=${lat},${lon}&api_key=${process.env.NEXT_PUBLIC_MY_OLA_API_KEY}`
        );
        const data = await response.json();
        const extracted_city = data.results[0].address_components[4].long_name;
        return extracted_city;
      } catch (error) {
        console.error("Error fetching city name:", error);
        return null;
      }
    };

    const initializeMap = async () => {
      let cityData;
      if (!CityProp) {
        const { latitude, longitude } = await getUserLocation();
        const detectedCity = await fetchCityName(latitude, longitude);
        cityData = await CityData(detectedCity);
      } else {
        cityData = await CityData(CityProp);
        setLat(cityData[0].lat);
        setLong(cityData[0].long);
      }

      const olaMaps = new OlaMaps({
        apiKey: process.env.NEXT_PUBLIC_MY_OLA_API_KEY,
      });

      const myMap = olaMaps.init({
        style:
          "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
        container: "map",
        center: [long, lat],
        zoom: 11,
      });

      setMap(myMap);

      myMap.on("load", () => {
        addMarkersToMap(myMap, olaMaps, cityData);
        setLoaded(true);
      });
    };

    initializeMap();

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [CityProp, lat, long]);

  const addMarkersToMap = (myMap, olaMaps, data) => {
    olaMaps
      .addMarker({
        offset: [0, 6],
        anchor: "bottom",
        color: "red",
      })
      .setLngLat([long, lat])
      .addTo(myMap);

    data.forEach((item) => {
      const customMarker = document.createElement("div");
      customMarker.className = "w-10 h-10 bg-contain bg-no-repeat bg-center";
      customMarker.style.backgroundImage = `url('${getMarkerImage(
        item.crime_description
      )}')`;

      const popup = olaMaps.addPopup({ offset: [0, -30], anchor: "bottom" })
        .setHTML(`
          <div class="bg-black p-2 rounded shadow dark:bg-white">
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
        .setLngLat([addRandomOffset(long), addRandomOffset(lat)])
        .setPopup(popup)
        .addTo(myMap);
    });
  };

  const getMarkerImage = (crimeDescription) => {
    switch (crimeDescription.toLowerCase()) {
      case "vandalism":
      case "arson":
        return "/emoji/ARSON.png";
      case "traffic violation":
      case "vehicle - stolen":
        return "/emoji/VEHICLE.png";
      case "burglary":
      case "shoplifting":
      case "robbery":
        return "/emoji/BURGLARY.png";
      case "domestic violence":
      case "assault":
        return "/emoji/ASSAULT.png";
      case "sexual assault":
        return "/emoji/SEXUAL ASSAULT.png";
      case "homicide":
        return "/emoji/HOMICIDE.png";
      case "public intoxication":
        return "/emoji/PUBLIC INTOXICATION.png";
      case "kidnapping":
        return "/emoji/KIDNAPPING.png";
      case "drug offense":
        return "/emoji/DRUG.png";
      case "cybercrime":
        return "/emoji/CYBERCRIME.png";
      case "identity theft":
        return "/emoji/identitytheft.png";
      case "fraud":
        return "/emoji/FRAUD.png";
      case "extortion":
        return "/emoji/EXTORTION.png";
      case "firearm offense":
        return "/emoji/FIREARM OFFENSE.png";
      default:
        return "/emoji/ASSAULT.png";
    }
  };

  const addRandomOffset = (baseCoordinate) => {
    const cityRadius = 0.1;
    const angle = Math.random() * 2 * Math.PI;
    const radius = Math.sqrt(Math.random()) * cityRadius;

    const latOffset = radius * Math.cos(angle);
    const lngOffset =
      (radius * Math.sin(angle)) / Math.cos((baseCoordinate * Math.PI) / 180);

    return baseCoordinate + (Math.random() > 0.5 ? latOffset : -latOffset);
  };

  return (
    <>
      <div id="map" className="w-full h-full md:h-128 lg:h-144 rounded-lg p-4">
        {!loaded && (
          <Skeleton className="w-full h-full md:h-128 lg:h-144 rounded-lg p-4" />
        )}
      </div>
    </>
  );
}
