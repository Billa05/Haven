"use server";

import client from "@/db";

export async function CreateReport(reportdata) {
  const response = await client.report.create({
    data: {
      ...reportdata,
    },
  });
  console.log(response);
}

export async function updateVote(reportId, emailId) {
  const existingVote = await client.vote.findUnique({
    where: {
      emailId_reportId: {
        emailId: emailId,
        reportId: reportId,
      },
    },
  });

  if (existingVote) {
    console.log("User has already upvoted this report.");
    return 0;
  }

  await client.vote.create({
    data: {
      emailId: emailId,
      reportId: reportId,
    },
  });

  const updatedReport = await client.report.update({
    where: {
      id: reportId,
    },
    data: {
      upvotes: {
        increment: 1,
      },
    },
  });

  if (updatedReport) {
    return 1;
  }
}

export async function fetchReports(city) {
  try {
    const reports = await client.report.findMany({
      where: {
        city: city,
      },
    });

    if (reports.length == 0) {
      return null;
    }

    return reports;
  } catch (error) {
    console.error(error);
    // throw new Error('Failed to fetch reports');
  }
}
