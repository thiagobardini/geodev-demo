"use client";

import { useState, useEffect, useRef } from "react";
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
    latitude: 42.395043,
    longitude:  -71.161471,
    zoom: 8,
    transitionDuration: 1000,
  });

  const [start, setStart] = useState([-71.061471, 42.355043]);
  const [end, setEnd] = useState([-71.511931, 42.481902]); 
  const [coords, setCoords] = useState([]);
  const [steps, setSteps] = useState([]);

  const GeolocateControlRef = useRef();

  useEffect(() => {
    getRoute();
    // GeolocateControlRef.current?.trigger()
  }, [end, GeolocateControlRef]);

  const getRoute = async () => {
    const response = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/cycling/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}`,
      // `https://api.mapbox.com/tilesets/v1/sources/tbardini/tbardini.4p8uspq3?access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}`
      // `https://api.mapbox.com/datasets/v1/tbardini?access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}`
    );
    const data = await response.json();
    console.log(data, "DATA");
    const coords = data.routes[0].geometry.coordinates;
    setCoords(coords);
    const steps = data.routes[0].legs[0].steps;
    setSteps(steps);
  };

  // 1. geojson
  const geojson = {
    type: "FeatureCollection",
    features: [
      {
        type: "feature",
        geometry: {
          type: "LineString",
          coordinates: [...coords],
        },
      },
    ],
  };
  // Route styles
  const lineStyle = {
    id: "roadLayer",
    type: "line",
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": "blue",
      "line-width": 3,
      "line-opacity": 0.75,
    },
  };
  const sharedLineStyle = {    
    id: "shared-tileset",
    type: "line",
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": "blue",
      "line-width": 3,
      "line-opacity": 0.75,
    },
  };

  // 3. endPoint
  const endPoint = {
    type: "FeatureCollection",
    features: [
      {
        type: "feature",
        geometry: {
          type: "Point",
          coordinates: [...end],
        },
      },
    ],
  };

  const layerEndpoint = {
    id: "end",
    type: "circle",
    source: {
      type: "geojson",
      data: end,
    },
    paint: {
      "circle-radius": 10,
      "circle-color": "#f30",
    },
  };

  const handleClick = (e) => {
    const newEnd = e.lngLat;
    const endPoint = Object.keys(newEnd).map((item, i) => newEnd[item]);
    setEnd(endPoint);
  };

  return (
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

      <Source
        id="shared-tileset"
        type="vector"
        url="mapbox://tbardini.4p8uspq3"
        data={endPoint}
      >
        <Layer
          // id="trans-walking-trails"
          // type="line"
          source="shared-tileset"
          // Aqui você precisa especificar a camada correta que deseja usar
          // Esta camada deve corresponder ao nome da camada no Mapbox Studio
          // Para seu caso específico, substitua `source-layer-name` pelo nome real da camada
          source-layer="trans-shared-use-paths-9a2oo6"
          // paint={{
          //   "line-color": "#FF0000", // Mude a cor de acordo com sua preferência
          //   "line-width": 10,
          // }}
          {...sharedLineStyle}
        />
      </Source>

      <GeolocateControl
        onGeolocate={(e) => setStart([e.coords.longitude, e.coords.latitude])}
        ref={GeolocateControlRef}
        // positionOptions={{ enableHighAccuracy: true }}
        // showUserHeading={false}
        // showAccuracyCircle={false}
        showUserLocation={true}
        // trackUserLocation={false}
        position="bottom-right"
      />
      <NavigationControl
        position="bottom-right"
        style={{ bottom: "30px !important" }}
      />

      <FullscreenControl />
    </ReactMapGl>
  );
};

export default Map;
