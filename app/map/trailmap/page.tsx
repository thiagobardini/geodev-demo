import React from "react";
import TrailMap from "@/components/map/TrailMap";

export default function Page() {
  return (
    <>
      <meta name="Mapbox" content="Mapbox Integration" />
      <div className="absolute h-screen w-screen">
        <TrailMap />
      </div>
    </>
  );
}
