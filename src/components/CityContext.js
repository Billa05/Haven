"use client"
import React, { createContext, useState } from 'react';

export const CityContext = createContext(null);

export const CityProvider = ({ children }) => {
  const [city, setCity] = useState();

  return (
    <CityContext.Provider value={{ city, setCity }}>
      {children}
    </CityContext.Provider>
  );
};