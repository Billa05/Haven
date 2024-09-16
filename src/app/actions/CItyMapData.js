"use server"

import client from "@/db";
import { Prisma } from "@prisma/client"; // Import Prisma error types if needed

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
  } catch (error) {
    return handleDatabaseError(error);
  }
}

// ERROR HANDLER FOR DATABASE
export async function handleDatabaseError(error) {
  try {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Handle known Prisma errors
      if (error.code === "P2002") {
        return { message: "Unique constraint failed.", statusCode: 409 };
      }
      // Other specific errors can be handled similarly
    }
    
    if (error instanceof Prisma.PrismaClientUnknownRequestError) {
      // Handle unknown Prisma errors
      return { message: "Unknown database error. Please try again later.", statusCode: 500 };
    }

    if (error.code === "ECONNREFUSED") {
      return { message: "Database connection refused. Please check the database server.", statusCode: 500 };
    }

    return { message: "An unexpected error occurred. Please try again later.", statusCode: 500 };
  } catch (catchError) {
    return { message: catchError.message, statusCode: 500 };
  }
}
