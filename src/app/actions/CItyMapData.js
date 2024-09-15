"use server"

import client from "@/db";

export async function CityData(City) {
  try {
    const data = await client.crime.findMany({
      where: {
        city: City,
      },
      take: 100,
    });
    return data;
  } catch (e) {
    return e;
  }
}