"use server"

import client from "@/db";

export async function CityData(City) {
  try {
    const allData = await client.crime.findMany({
      where: {
        city: City,
      },
    });

    // Shuffle the array to get random records
    const shuffledData = allData.sort(() => 0.5 - Math.random());

    // Take the first 100 records from the shuffled array
    const data = shuffledData.slice(0, 100);

    return data;
  } catch (e) {
    return e;
  }
}