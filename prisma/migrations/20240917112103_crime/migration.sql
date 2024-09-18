-- CreateTable
CREATE TABLE "crime" (
    "report_number" BIGINT,
    "date_reported" TEXT,
    "date_of_occurrence" TEXT,
    "time_of_occurrence" TEXT,
    "city" TEXT,
    "crime_code" BIGINT,
    "crime_description" TEXT,
    "victim_age" BIGINT,
    "victim_gender" TEXT,
    "weapon_used" TEXT,
    "crime_domain" TEXT,
    "police_deployed" BIGINT,
    "case_closed" TEXT,
    "date_case_closed" TEXT,
    "lat" DOUBLE PRECISION,
    "long" DOUBLE PRECISION,
    "country" TEXT,
    "iso2" TEXT,
    "state" TEXT,
    "id" SERIAL NOT NULL,

    CONSTRAINT "crime_pkey" PRIMARY KEY ("id")
);
