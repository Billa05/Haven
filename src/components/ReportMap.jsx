"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useDebounce } from "use-debounce";
import "../OlaMapsWebSDK/style.css";
import { OlaMaps } from "../OlaMapsWebSDK/olamaps-js-sdk.es";
import { fetchCityName } from "./EmojiMap";
import { Input } from "./ui/input";
import { Skeleton } from "./ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { MapPin } from "lucide-react";
import { LocationContext } from "./LocationContext";
import { useContext } from "react";
import { CityContext, CityProvider } from "./CityContext";

export async function AutoCompleteApi(city, input) {
  try {
    const query = city ? `${city} ${input}` : input;
    const response = await fetch(
      `https://api.olamaps.io/places/v1/autocomplete?input=${encodeURIComponent(
        query
      )}&api_key=${process.env.NEXT_PUBLIC_MY_OLA_API_KEY}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.predictions || [];
  } catch (error) {
    console.error("Error fetching autocomplete data:", error);
    throw error;
  }
}

export async function fetchlandmark(lat, lon) {
  try {
    const response = await fetch(
      `https://api.olamaps.io/places/v1/reverse-geocode?latlng=${lat},${lon}&api_key=${process.env.NEXT_PUBLIC_MY_OLA_API_KEY}`
    );
    const data = await response.json();
    const extracted_landmark = data.results[0].formatted_address;
    return extracted_landmark;
  } catch (error) {
    console.error("Error fetching city name:", error);
    return null;
  }
}

export function ReportMap() {
  const {location, setLocation} = useContext(LocationContext);
  const {landmark, setLandmark} = useContext(LocationContext);
  const [loaded, setLoaded] = useState(false);
  const [map, setMap] = useState(null);
  const [input, setInput] = useState("");
  const [debouncedInput] = useDebounce(input, 300);
  const {city, setCity} = useContext(CityContext);
  const [sugg, setSugg] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const markerRef = useRef(null);
  const dragTimeoutRef = useRef(null);

  useEffect(() => {
    const getUserLocation = () => {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
            resolve({ latitude, longitude });
          },
          (error) => {
            console.error("Error getting location:", error);
            reject(error);
          }
        );
      });
    };

    const initializeMap = async () => {
      try {
        const { latitude, longitude } = await getUserLocation();
        if (!city) {
          const res = await fetchCityName(latitude, longitude);
          setCity(res);
        }
        const olaMaps = new OlaMaps({
          apiKey: process.env.NEXT_PUBLIC_MY_OLA_API_KEY,
        });

        const myMap = olaMaps.init({
          style:
            "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
          container: "map",
          center: [longitude, latitude],
          zoom: 15,
        });

        setMap(myMap);

        const marker = olaMaps
          .addMarker({
            offset: [0, 6],
            anchor: "bottom",
            color: "red",
            draggable: true,
          })
          .setLngLat([longitude, latitude])
          .addTo(myMap);

        markerRef.current = marker;

        function onDragEnd() {
          const { lng, lat } = marker.getLngLat();
          debouncedSetLocation(lat, lng);
        }

        marker.on("dragend", onDragEnd);

        myMap.on("load", () => {
          setLoaded(true);
        });
      } catch (error) {
        console.error("Error initializing map:", error);
        setError("Failed to initialize map. Please try again.");
      }
    };

    initializeMap();

    return () => {
      if (map) {
        map.remove();
      }
      if (dragTimeoutRef.current) {
        clearTimeout(dragTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedInput) {
        setLoading(true);
        setError(null);
        try {
          const results = await AutoCompleteApi(city, debouncedInput);
          setSugg(results);
        } catch (error) {
          setError("Failed to fetch suggestions. Please try again.");
        } finally {
          setLoading(false);
        }
      } else {
        setSugg([]);
      }
    };

    fetchSuggestions();
  }, [debouncedInput, city]);

  useEffect(() => {
    const fetchLandmarkData = async () => {
      const res = await fetchlandmark(location.latitude, location.longitude);
      setLandmark(res);
    };

    if (location.latitude && location.longitude) {
      fetchLandmarkData();
    }
  }, [location]);

  function handleSelectSuggestion(suggestion) {
    setSugg([]);
    setInput("");
    console.log(suggestion);
    const newLocation = {
      longitude: suggestion.geometry.location.lng,
      latitude: suggestion.geometry.location.lat,
    };
    setLocation(newLocation);

    // Update map and marker position
    if (map && markerRef.current) {
      map.flyTo({
        center: [newLocation.longitude, newLocation.latitude],
        zoom: 15,
        essential: true,
      });
      markerRef.current.setLngLat([
        newLocation.longitude,
        newLocation.latitude,
      ]);
    }
  }

  const debouncedSetLocation = useCallback((lat, lng) => {
    if (dragTimeoutRef.current) {
      clearTimeout(dragTimeoutRef.current);
    }
    dragTimeoutRef.current = setTimeout(() => {
      setLocation({ latitude: lat, longitude: lng });
    }, 3000);
  }, []);

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl text-gray-800 dark:text-gray-200">
          <MapPin className="mr-2 h-6 w-6 text-primary dark:text-primary-dark" />
          Incident Location: {location.latitude}, {location.longitude}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="">
          <div className="relative">
            <Input
              placeholder="search nearby location"
              className="bg-gray-50 dark:bg-gray-700 pr-10"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            {loading && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {/* Add a spinner component here */}
                Loading...
              </div>
            )}
            <p className="text-gray-500">
              Drag the marker to the closest location of the incident
            </p>
            {sugg.length > 0 && (
              <ul className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-auto">
                {sugg.map((suggestion) => (
                  <li
                    key={suggestion.place_id}
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                    onClick={() => handleSelectSuggestion(suggestion)}
                  >
                    {suggestion.description}
                  </li>
                ))}
              </ul>
            )}
            {error && (
              <div className="absolute mt-1 w-full bg-red-100 text-red-700 p-2 rounded-md">
                {error}
              </div>
            )}
          </div>
          <div className="mt-4 aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <div
              id="map"
              className="w-full h-full md:h-128 lg:h-144 rounded-lg p-4"
            >
              {!loaded && (
                <Skeleton className="w-full h-full md:h-128 lg:h-144 rounded-lg p-4 bg-gray-300" />
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
