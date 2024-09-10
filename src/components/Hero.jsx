import { MoveRight, PhoneCall, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Olamaps from "./OlaMap";
import Link from "next/link";

export const Hero38 = () => {
  return (
    <>
      <div className="w-full p-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-8 items-center lg:grid-cols-2">
            <div className="flex gap-4 flex-col">
              <div>
                <Badge variant="outline">We&apos;re live!</Badge>
              </div>
              <div className="flex gap-4 flex-col">
                <h1 className="text-5xl md:text-7xl max-w-lg tracking-tighter text-left font-regular">
                  Stay Informed, Stay Safe
                </h1>
                <p className="text-xl leading-relaxed tracking-tight text-muted-foreground max-w-md text-left">
                  Our crime map and alert service provides real-time, accurate
                  information on criminal activity in your area. Stay informed
                  and take proactive measures to ensure your safety.
                </p>
              </div>
              <div className="flex flex-row gap-4">
                <Link href={"/map"}>
                  <Button size="lg" className="gap-4" variant="outline">
                    Explore Crime Map <Map className="w-4 h-4" />
                  </Button>
                </Link>
                <Button size="lg" className="gap-4">
                  View Crime Reports <MoveRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="rounded-md aspect-square">
              <Olamaps />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
