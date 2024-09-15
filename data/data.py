import pandas as pd
from sqlalchemy import create_engine, text

# PostgreSQL connection URL
DATABASE_URL= ""
# Path to the CSV file
csv_file_path = 'merged_crime_cities.csv'

print("Loading CSV data...")
# Load the CSV data using pandas
df = pd.read_csv(csv_file_path, keep_default_na=False)

# Rename DataFrame columns to match lowercase naming in SQL
df.columns = df.columns.str.lower().str.replace(" ", "_")

print("CSV data loaded successfully.")

# Create the database engine
print("Creating database engine...")
engine = create_engine(DATABASE_URL)
print("Database engine created.")

# Create table SQL (if it doesn't exist) with VARCHAR for timestamps
create_table_query = text('''
CREATE TABLE IF NOT EXISTS crime (
    id SERIAL PRIMARY KEY,
    report_number INT,
    date_reported VARCHAR(50),
    date_of_occurrence VARCHAR(50),
    time_of_occurrence VARCHAR(50),
    city VARCHAR(100),
    crime_code INT,
    crime_description VARCHAR(255),
    victim_age INT,
    victim_gender VARCHAR(10),
    weapon_used VARCHAR(100),
    crime_domain VARCHAR(100),
    police_deployed INT,
    case_closed VARCHAR(10),
    date_case_closed VARCHAR(50),
    lat FLOAT,
    long FLOAT,
    country VARCHAR(100),
    iso2 VARCHAR(10),
    state VARCHAR(100)
);
''')

print("Connecting to the database and creating the table if it doesn't exist...")
# Connect to the database and create the table
with engine.connect() as connection:
    connection.execute(create_table_query)
print("Table created or already exists.")

print("Inserting data into the table...")

# Insert data into the table row by row with logging
with engine.connect() as connection:
    for index, row in df.iterrows():
        try:
            # Insert each row individually and log progress
            row.to_frame().T.to_sql('crime', connection, if_exists='append', index=False)
            print(f"Inserted row {index + 1}/{len(df)}: {row.to_dict()}")
        except Exception as e:
            print(f"Error inserting row {index + 1}: {e}")
            break

print("CSV data has been successfully inserted into the database!")
