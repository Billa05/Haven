import React from "react";

import { Tweet } from "react-tweet";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const tweetIds = [
  "1841439160529494278",
  "1841040881291292676",
  "1840936925022105787",
  "1840797838634336677",
  "1840752093830766765",
  "1840405046682607766",
  "1840403263801135295",
  "1840401915521220937",
  "1840400873962324323",
  "1840400586589585852",
  "1840156032951071132",
  "1840756283672350749",
  "1841313627737141441",
  "1841536689367548007",
  "1841828243415916616",
];

const TweetCarousel = () => {
  return (
    <div className="flex justify-center items-center">
    <Carousel className="w-full max-w-4xl">
      <CarouselContent className="-ml-4">
        {tweetIds.map((id) => (
          <CarouselItem key={id} className="pl-4">
            <div className="flex justify-center items-center">
              <Tweet id={id} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    </div>
  );
};

export default TweetCarousel;
