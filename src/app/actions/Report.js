"use server"

import client from "@/db"

export async function CreateReport(reportdata,userid,locationid){
    const response = await client.report.create({
        data:{
            ...reportdata,
            userId : userid,
            locationID : locationid
        }
    })
    console.log(response);
}

export async function CerateLocation(locationdata) {
    const result = await client.location.create({
        data: locationdata
    });
    return result.id;
}

export async function fetchReports(city) {
    try {
        const cityRecord = await client.location.findUnique({
            where: {
                city: city
            },
            select: {
                id: true
            }
        });

        if (!cityRecord) {
            throw new Error(`City ${city} not found`);
        }

        const reports = await client.report.findMany({
            where: {
                locationId: cityRecord.id
            }
        });

        return reports;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch reports');
    }
}