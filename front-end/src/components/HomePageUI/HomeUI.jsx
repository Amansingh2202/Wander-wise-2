"use client";

import { BackgroundBeams } from "@/components/ui/background-beams";

import { Button } from "../ui/button";
import { Link } from "react-router-dom";

export function BackgroundBeamsDemo() {
  return (
    (<div
      className="h-full w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <h1
          className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
         WanderWise
        </h1>
        <p></p>
        <p
          className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
          Welcome to WanderWise,let AI guide you to personalized adventures. From dream destinations to tailored itineraries, WanderWise crafts journeys that match your unique style and interests. Discover hidden gems, optimize your budget, and enjoy stress-free planning—WanderWise makes every journey as unforgettable as it is effortless.
        </p>
        <Link to={'/travel'}>
        <Button className="ml-52 hover:backdrop:">Punch me </Button>
        </Link>
       
      </div>
      <BackgroundBeams />
      
      
    </div>)
  );
}
