"use client";

import { useState } from "react";
import ReactMapGl, {
  FullscreenControl,
  GeolocateControl,
  NavigationControl,
  Marker,
  Source,
  Layer,
} from "react-map-gl";


const Map = () => {
  const [viewport, setViewport] = useState({
    latitude: 42.3772,
    longitude: -71.0244,
    zoom: 10,
    transitionDuration: 1000,
  });

  return (
    <ReactMapGl
      {...viewport}
      onMove={(event) => setViewport(event.viewState)}
      mapStyle="mapbox://styles/tbardini/clwfn2zwn02ei01qg6v221qw3"
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
      style={{ width: "100%", height: "100%" }}
    >
      <div className="mb-20">
      <GeolocateControl
        positionOptions={{ enableHighAccuracy: true }}
        showUserHeading={false}
        showAccuracyCircle={false}
        showUserLocation={true}
        trackUserLocation={false}
        position="bottom-right"
      />
      <NavigationControl position="bottom-right" style={{bottom: "30px !important"}}/>
      </div>
      <FullscreenControl />
    </ReactMapGl>
  );
};

export default Map;
