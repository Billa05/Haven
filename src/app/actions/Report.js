"use server"

import client from "@/db"

export async function CreateReport(reportdata){
    const response = await client.report.create({
        data:{
            ...reportdata
        }
    })
    console.log(response);
}

export async function CreateLocation(locationdata) {
    try {
        const result = await client.location.create({
            data: locationdata
        });
        return result.id;
    } catch (error) {
        console.error("Error creating location:", error);
        // throw error;
    }
}

export async function FindLocation(city) {
    try {
        const result = await client.location.findUnique({
            where: {
                city: city
            }
        });
        if (result) {
            return result.id;
        } else {
            console.warn("Location not found for city:", city);
            return null;
        }
    } catch (error) {
        console.error("Error finding location:", error);
        throw error;
    }
}

export async function fetchReports(city) {
    try {
        const reports = await client.report.findMany({
            where: {
                city: city
            }
        });

        if (reports.length==0) {
            return null;
        }

        return reports;
    } catch (error) {
        console.error(error);
        // throw new Error('Failed to fetch reports');
    }
}