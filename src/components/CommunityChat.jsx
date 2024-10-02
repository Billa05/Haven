"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MapPin,
  ThumbsUp,
  Shield,
  AlertTriangle,
  Clock,
  Loader2,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ReportMap } from "./ReportMap";
import {
  CreateLocation,
  CreateReport,
  fetchReports,
  FindLocation,
  updateVote,
} from "@/app/actions/Report";
import { CityContext, CityProvider } from "./CityContext";
import { useContext } from "react";
import { LocationContext, LocationProvider } from "./LocationContext";
import { useSession } from "next-auth/react";

const crimeTypes = [
  { value: "theft", label: "Theft", icon: <i className="fas fa-mask" /> },
  {
    value: "vandalism",
    label: "Vandalism",
    icon: <i className="fas fa-spray-can" />,
  },
  {
    value: "assault",
    label: "Assault",
    icon: <i className="fas fa-fist-raised" />,
  },
  {
    value: "burglary",
    label: "Burglary",
    icon: <i className="fas fa-door-open" />,
  },
  {
    value: "suspicious_activity",
    label: "Suspicious Activity",
    icon: <i className="fas fa-eye" />,
  },
  {
    value: "other",
    label: "Other",
    icon: <i className="fas fa-question-circle" />,
  },
];

export default function Report() {
  const [newReport, setNewReport] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    time: "",
    crimeType: "",
  });
  const { city } = useContext(CityContext);
  const [reports, setReports] = useState([]);
  const { landmark, location } = useContext(LocationContext);
  const { data: session } = useSession();
  const [create, setCreate] = useState(false);
  const [voted,setVoted] = useState(false);

  useEffect(() => {
    const fetchReportsAsync = async () => {
      try {
        if (city) {
          const res = await fetchReports(city);
          setReports(res);
        }
      } catch (error) {
        console.error("Failed to fetch reports:", error);
      }
    };

    fetchReportsAsync();
  }, [city, create, voted]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const report = {
      ...newReport,
      date: format(newReport.date, "yyyy-MM-dd"),
      upvotes: 0,
      author: session.user.name,
      city: city,
      location: landmark,
    };
    CreateReport(report);
    setCreate(true);
    setNewReport({
      title: "",
      description: "",
      location: "",
      date: "",
      time: "",
      crimeType: "",
    });
  };

  const handleUpvote = async (reportid) => {
    const res = await updateVote(reportid, session.user.email);
    if (res == 1) setVoted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b  dark:from-gray-900 dark:to-gray-800 text-gray-900">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12 dark:text-black text-white">
          <h1 className="text-5xl font-bold mb-4">Haven Community Watch</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Together, we can make our community safer. Report incidents, stay
            informed, and help keep our neighborhood secure.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-white dark:bg-gray-800 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-gray-800 dark:text-gray-200">
                <Shield className="mr-2 h-6 w-6 text-primary dark:text-primary-dark" />
                Submit a Report
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  placeholder="Title"
                  value={newReport.title}
                  onChange={(e) =>
                    setNewReport({ ...newReport, title: e.target.value })
                  }
                  required
                  className="bg-gray-50 dark:bg-gray-700"
                />
                <Textarea
                  placeholder="Description"
                  value={newReport.description}
                  onChange={(e) =>
                    setNewReport({ ...newReport, description: e.target.value })
                  }
                  required
                  className="bg-gray-50 dark:bg-gray-700"
                />
                <Textarea
                  placeholder="Location"
                  value={landmark ? landmark : ""}
                  readOnly
                  className="bg-gray-50 dark:bg-gray-700"
                />
                <div className="flex space-x-1">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !newReport.date && "text-gray-500 dark:text-gray-400"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newReport.date ? (
                          format(newReport.date, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white dark:bg-gray-800">
                      <Calendar
                        mode="single"
                        selected={newReport.date}
                        onSelect={(date) =>
                          setNewReport({
                            ...newReport,
                            date: date,
                          })
                        }
                        initialFocus
                        className="bg-white dark:bg-gray-800"
                      />
                    </PopoverContent>
                  </Popover>
                  <Input
                    type="time"
                    value={newReport.time}
                    onChange={(e) =>
                      setNewReport({ ...newReport, time: e.target.value })
                    }
                    required
                    className="bg-gray-50 dark:bg-gray-700"
                  />
                </div>
                <Select
                  value={newReport.crimeType}
                  onValueChange={(value) =>
                    setNewReport({ ...newReport, crimeType: value })
                  }
                  required
                >
                  <SelectTrigger className="bg-gray-50 dark:bg-gray-700">
                    <SelectValue placeholder="Select crime type" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800">
                    {crimeTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <span className="flex items-center">
                          {type.icon}
                          <span className="ml-2">{type.label}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button type="submit" className="w-full">
                  Submit Report
                </Button>
              </form>
            </CardContent>
          </Card>

          <ReportMap />
        </div>

        <h2 className="text-3xl font-semibold mb-6 text-center dark:text-gray-800 text-gray-200">
          Recent Reports
        </h2>
        <div className="space-y-6 text-white">
          {reports
            ? reports.map((report) => (
                <Card
                  key={report.id}
                  className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between text-gray-800 dark:text-gray-200">
                      <span>{report.title}</span>
                      <Badge variant="outline" className="text-sm">
                        {crimeTypes.find(
                          (type) => type.value === report.crimeType
                        )?.label || "Unknown"}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-gray-600 dark:text-gray-400">
                      {report.description}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <MapPin className="mr-1 h-4 w-4 text-primary dark:text-primary-dark" />
                        <span>{report.location}</span>
                      </div>
                      <div className="flex items-center">
                        <CalendarIcon className="mr-1 h-4 w-4 text-primary dark:text-primary-dark" />
                        <span>{report.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-1 h-4 w-4 text-primary dark:text-primary-dark" />
                        <span>{report.time}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8 bg-primary text-primary-foreground dark:bg-primary-dark dark:text-primary-dark-foreground">
                        {/* <AvatarFallback>{report.author[0]}</AvatarFallback> */}
                        <img src={session.user ? session.user.image : ""}></img>
                      </Avatar>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {report.author}
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUpvote(report.id)}
                      className="text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <ThumbsUp className="mr-1 h-4 w-4" />
                      Upvote ({report.upvotes})
                    </Button>
                  </CardFooter>
                </Card>
              ))
            : "no reports yet"}
        </div>
      </div>
    </div>
  );
}
