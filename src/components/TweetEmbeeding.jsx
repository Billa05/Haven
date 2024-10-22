// "use client";
import * as React from "react";
// import { useEffect } from "react";
// import { useState } from "react";

import { Tweet } from "react-tweet";
import { Label } from "./ui/label";

export function CarouselSpacing() {
//   const [tweets, setTweets] = useState();

//   useEffect(() => {
//     const fetchTweets = async () => {
//       try {
//         const response = await fetch(
//           'https://api.socialdata.tools/twitter/search?query=to:chennaipolice_ since:2024-9-1 please OR pls OR robbery OR theft OR assault OR accident OR crash OR emergency OR police OR sirens OR flood OR storm OR danger OR warning OR alert OR traffic OR road OR "power outage" OR incident OR breaking OR urgent OR help OR witness',
//           {
//             headers: {
//               Authorization:
//                 "Bearer ",
//             },
//           }
//         );
//         const data = await response.json();
//         // console.log(data.tweets);
//         setTweets(data.tweets);
//         console.log(tweets);
//       } catch (error) {
//         console.error("Error fetching tweets:", error);
//       }
//     };

//     fetchTweets();
//   }, []);

  return (
    <div className="p-10" id="tweets">
        <Label>Incidents reported on twitter</Label>
      <div className="grid md:grid-cols-3 gap-8 mt-3">
        {/* {tweets && tweets.map((tweet) => (
          <Tweet id={tweet.id_str} key={tweet.id_str} />
        ))} */}

        <Tweet id="1841439160529494278" />
        <Tweet id="1841040881291292676" />
        <Tweet id="1840936925022105787" />
        <Tweet id="1840797838634336677" />
        <Tweet id="1840752093830766765" />
        <Tweet id="1840405046682607766" />
        <Tweet id="1840403263801135295" />
        <Tweet id="1840401915521220937" />
        <Tweet id="1840400873962324323" />
        <Tweet id="1840400586589585852" />

        <Tweet id="1840156032951071132" />
        <Tweet id="1840756283672350749" />
        {/* <Tweet id="1841313627737141441" /> */}
        <Tweet id="1841536689367548007" />
        <Tweet id="1841828243415916616" />
      </div>
    </div>
  );
}
