"use server"

import client from "@/db";

export async function CityData(City) {
  try {
    const data = await client.crime.findMany({
      where: {
        city: City,
        crime_description: {
          in: ["VANDALISM", "ARSON", "TRAFFIC VIOLATION", "VEHICLE-STOLEN", "BURGLARY", "SHOPLIFTING", "DOMESTIC VIOLENCE", "SEXUAL ASSAULT"]
        }
      },
      take: 100
    });

    return data;
  } catch (e) {
    return e;
  }
}