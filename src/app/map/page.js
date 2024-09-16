"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import EmojiMap from "@/components/EmojiMap";

export default function Home() {
  const [city, setCity] = useState("");
  const [dcity, setdCity] = useState("");
  const [isBlurred, setIsBlurred] = useState(true);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (dcity.trim() !== "") {
      setIsBlurred(false);
      setCity(capitalizeFirstLetter(dcity));
    }
  };

  return (
    <>
      <div className="p-4 z-10 relative">
        <Link href={"/"}>
          <Button>BACK</Button>
        </Link>
      </div>
      <div className={`${isBlurred ? "filter blur-md" : ""}`}>
        <div className="flex justify-center items-center">
          <form
            onSubmit={handleSearch}
            className="w-full max-w-sm space-y-2 flex justify-center items-center"
          >
            <Input
              type="text"
              placeholder="Enter a city"
              value={dcity}
              onChange={(e) => setdCity(e.target.value)}
              className="w-full text-white"
            />
            <Button type="submit" className="w-full ml-3">
              Search
            </Button>
          </form>
        </div>
        <div className="p-10">
          <div className="rounded-md aspect-square">
            {city && <EmojiMap CityProp={city} />}
          </div>
        </div>
      </div>
      {isBlurred && (
        <div className="absolute inset-0 flex items-center justify-center">
          <form onSubmit={handleSearch} className="w-full max-w-sm space-y-2">
            <Input
              type="text"
              placeholder="Enter a city"
              value={dcity}
              onChange={(e) => setdCity(e.target.value)}
              className="w-full text-white"
            />
            <Button type="submit" className="w-full">
              Search
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
