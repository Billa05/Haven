"use client"
import React, { createContext, useState } from "react";

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [landmark, setLandmark] = useState(null);

  return (
    <LocationContext.Provider
      value={{ location, setLocation, landmark, setLandmark }}
    >
      {children}
    </LocationContext.Provider>
  );
};
