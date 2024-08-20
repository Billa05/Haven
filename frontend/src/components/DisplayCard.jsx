import Card from "./Card";

export default function DisplayCard() {
  return (
    <>
      <h1 class="mt-8 ml-4 text-xl font-bold leading-none tracking-tight text-gray-900 md:text-xl lg:text-xl dark:text-white">
        Objectives:
      </h1>
      <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-4">
        <Card
          pic={"./incident.webp"}
          title={"Real-Time Incident Reporting and Alerts"}
          about={
            "The app will alert users of significant incidents happening in their vicinity, enabling them to take timely action."
          }
        />
        <Card
          pic={"./crime.png"}
          title={"Crime Statistics and Analysis"}
          about={
            "Provide users with detailed analytics and visual representations of crime data in their area. This includes showing the types of crimes, their frequency, and their distribution, allowing residents to understand the safety dynamics of their neighborhoods."
          }
        />
        <Card
          pic={"./user.png"}
          title={"User-Driven Reporting"}
          about={
            "Empower users to report incidents through an easy-to-use interface. This crowdsourced data will be used to enhance the real-time information available to all users."
          }
        />
        <Card
          pic={"./community.png"}
          title={"Community Verification"}
          about={
            "Introduce a community message board where users can discuss and upvote incident reports. This feature will help verify the authenticity of reports and assist law enforcement in prioritizing their responses."
          }
        />
        <Card
          pic={"./safety.png"}
          title={"Safety Resources"}
          about={
            "Display the locations of nearby police stations and other emergency services on the map, providing users with quick access to help when needed."
          }
        />
        <Card
          pic={"./police.png"}
          title={"Nearby Police Stations"}
          about={
            "Show locations of nearby police stations on the map. Provide contact details and directions to the nearest police station."
          }
        />
      </div>
    </>
  );
}
