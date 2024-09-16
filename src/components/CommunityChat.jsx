import DisplayCard from "./DisplayCard";
import { ReportCard } from "./ReportCard";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

export default function Chat() {
  return (
    <>
      <div className="p-10 flex flex-col min-h-screen">
        <div className="bg-white text-black w-full rounded">
          <Label className="ml-3">Locality:</Label>
        </div>
        <div>
          <DisplayCard />
          <DisplayCard />
        </div>
        <div className="w-full flex justify-end">
          <div className="">
            <DisplayCard />
          </div>
        </div>
        <div className="w-full flex justify-center items-end mt-auto">
          {/* <Button size="lg" variant="outline">▲</Button> */}
          <ReportCard label={"▲"}/>
        </div>
      </div>
    </>
  );
}