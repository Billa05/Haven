import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "./ui/label";
import { FaRocketchat } from "react-icons/fa6";
import Link from "next/link";

function BellIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function FileTextIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </svg>
  );
}

function MapIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z" />
      <path d="M15 5.764v15" />
      <path d="M9 3.236v15" />
    </svg>
  );
}

export default function Box() {
  return (
    <>
      <div className="p-10">
        <Label>Comprehensive Crime Data and Reporting</Label>
        <div className="grid md:grid-cols-4 gap-8 mt-3">
          <Card>
            <Link href={"/map"}>
              <CardHeader>
                <MapIcon />
                <CardTitle>Interactive Crime Map</CardTitle>
              </CardHeader>
            </Link>
            <CardContent>
              <ul className="list-disc pl-5">
                <li>
                  Visualize crime data on an interactive map, down to the
                  neighborhood level.
                </li>
                <li>
                  Use filters to view specific types of crimes and see trends
                  over time.
                </li>
                <li>
                  Stay aware of the safety of your surroundings with real-time
                  updates.
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <FileTextIcon />
              <CardTitle>Detailed Crime Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5">
                <li>
                  Access comprehensive crime reports and statistics for your
                  city or region.
                </li>
                <li>
                  Get detailed information on crime types, locations, and times.
                </li>
                <li>
                  Use this data to understand crime patterns and make informed
                  decisions.
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <BellIcon />
              <CardTitle>Crime Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5">
                <li>
                  Receive timely alerts about criminal incidents in your area to
                  stay informed and safe.
                </li>
                <li>
                  Customize alert settings to receive notifications for specific
                  types of crimes.
                </li>
                <li>
                  Stay one step ahead with real-time crime alerts delivered to
                  your device.
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <FaRocketchat size={25} />
              <CardTitle>Community Report</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5">
                <li>
                  Stay informed and keep your community safe by reporting any
                  crime or incidents.
                </li>
                <li>Your reports help others stay aware and vigilant.</li>
                <li>
                  Together, we can make our neighborhood a safer place for
                  everyone.
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
