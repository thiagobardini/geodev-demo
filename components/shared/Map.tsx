"use client";

import { useState, useEffect, useRef } from "react";
import ReactMapGl, {
  FullscreenControl,
  GeolocateControl,
  NavigationControl,
  Marker,
  Source,
  Layer,
  ViewState,
} from "react-map-gl";
import InstructionsDrawer from "./InstructionsDrawer";

interface GeoJSONFeatureCollection {
  type: "FeatureCollection";
  features: GeoJSONFeature[];
}

interface GeoJSONFeature {
  type: "Feature";
  geometry: {
    type: "LineString";
    coordinates: number[][];
  };
  properties?: any;
}

interface GeoJSONPointFeatureCollection {
  type: "FeatureCollection";
  features: GeoJSONPointFeature[];
}

interface GeoJSONPointFeature {
  type: "Feature";
  geometry: {
    type: "Point";
    coordinates: number[];
  };
  properties?: any;
}

const initialViewState: ViewState = {
  latitude: 42.395043,
  longitude: -71.161471,
  zoom: 8,
  bearing: 0,
  pitch: 0,
  padding: { top: 0, bottom: 0, left: 0, right: 0 },
};

const Map = ({ showFeatures = false }) => {
  const [viewport, setViewport] = useState<ViewState>(initialViewState);
  const [start, setStart] = useState([-71.061471, 42.355043]);
  const [end, setEnd] = useState([-71.511931, 42.481902]);
  const [coords, setCoords] = useState<number[][]>([]);
  const [steps, setSteps] = useState<any[]>([]);

  const GeolocateControlRef = useRef(null);

  useEffect(() => {
    getRoute();
  }, [end, GeolocateControlRef]);

  const getRoute = async () => {
    const response = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/cycling/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}`
    );
    const data = await response.json();
    const coords = data.routes[0].geometry.coordinates;
    setCoords(coords);
    const steps = data.routes[0].legs[0].steps;
    setSteps(steps);
  };

  const geojson: GeoJSONFeatureCollection = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: coords,
        },
      },
    ],
  };

  const endPoint: GeoJSONPointFeatureCollection = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: end,
        },
      },
    ],
  };

  const lineStyle = {
    id: "roadLayer",
    type: "line" as const,
    layout: {
      "line-join": "round" as const,
      "line-cap": "round" as const,
    },
    paint: {
      "line-color": "blue",
      "line-width": 3,
      "line-opacity": 0.75,
    },
  };

  const sharedLineStyle = {
    id: "shared-tileset",
    type: "line" as const,
    layout: {
      "line-join": "round" as const,
      "line-cap": "round" as const,
    },
    paint: {
      "line-color": "blue",
      "line-width": 3,
      "line-opacity": 0.75,
    },
  };

  const layerEndpoint = {
    id: "end",
    type: "circle" as const,
    paint: {
      "circle-radius": 10,
      "circle-color": "#f30",
    },
  };

  const handleClick = (e: any) => {
    const newEnd = e.lngLat;
    setEnd([newEnd.lng, newEnd.lat]);
  };

  return (
    <section className="relative h-full w-full">
      <ReactMapGl
        {...viewport}
        onClick={handleClick}
        onMove={(event) => setViewport(event.viewState)}
        mapStyle="mapbox://styles/tbardini/clwfn2zwn02ei01qg6v221qw3"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
        style={{ width: "100%", height: "100%" }}
      >
        <Source id="routeSource" type="geojson" data={geojson}>
          <Layer {...lineStyle} />
        </Source>
        <Source id="endSource" type="geojson" data={endPoint}>
          <Layer {...layerEndpoint} />
        </Source>

        <Source id="shared-tileset" type="vector" url="mapbox://tbardini.4p8uspq3">
          <Layer
            {...sharedLineStyle}
            source-layer="trans-shared-use-paths-9a2oo6"
          />
        </Source>
        <GeolocateControl showAccuracyCircle={false} onGeolocate={(e) => setStart([e.coords.longitude, e.coords.latitude])} ref={GeolocateControlRef} />
        <FullscreenControl />
        <NavigationControl
          position="bottom-right"
          style={{ bottom: "30px !important" }}
        />
        <Marker longitude={start[0]} latitude={start[1]} />
        <FullscreenControl />
      </ReactMapGl>
      {showFeatures && <InstructionsDrawer steps={steps} setEnd={setEnd} />}
    </section>
  );
};

export default Map;
