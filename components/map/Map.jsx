"use client";

import { useState, useEffect, useRef } from "react";
import ReactMapGl, {
  FullscreenControl,
  GeolocateControl,
  NavigationControl,
  Marker,
  Popup,
  Source,
  Layer,
} from "react-map-gl";
import InstructionsDrawer from "./InstructionsDrawer";

const initialViewState = {
  latitude: 42.395043,
  longitude: -71.161471,
  zoom: 8,
  bearing: 0,
  pitch: 0,
  padding: { top: 0, bottom: 0, left: 0, right: 0 },
};

const Map = ({ showFeatures = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [viewport, setViewport] = useState(initialViewState);
  const [start, setStart] = useState([-71.061471, 42.355043]);
  const [end, setEnd] = useState([-71.511931, 42.481902]);
  const [coords, setCoords] = useState([]);
  const [steps, setSteps] = useState([]);
  const [layerVisibility, setLayerVisibility] = useState({
    walkingTrails: "none",
    bikeFacilities: "none",
    landLineSystems: "none",
    sharedUsePaths: "none",
  });
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [selectedPoint, setSelectedPoint] = useState("end");
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [travelMode, setTravelMode] = useState("driving");

  const GeolocateControlRef = useRef(null);

  useEffect(() => {
    getRoute();
  }, [start, end, travelMode]);

  const getRoute = async () => {
    console.log("Fetching route...");
    try {
      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/${travelMode}/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}`
      );
      const data = await response.json();
      console.log("Route data:", data);

      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        const coords = route.geometry.coordinates;
        setCoords(coords);
        const steps = route.legs[0].steps;
        setSteps(steps);
        const distance = route.distance;
        const duration = route.duration / 60; // Convertendo para minutos
        setDistance(distance);
        setDuration(duration);
        console.log("Distance:", distance);
        console.log("Duration:", duration);
      } else {
        setCoords([]);
        setSteps([]);
        setDistance(0);
        setDuration(0);
      }
    } catch (error) {
      console.error("Error fetching route data:", error);
      setCoords([]);
      setSteps([]);
      setDistance(0);
      setDuration(0);
    }
  };

  const toggleLayerVisibility = (layerId) => {
    console.log(`Toggling visibility for ${layerId}`);
    setLayerVisibility((prevState) => ({
      ...prevState,
      [layerId]: prevState[layerId] === "visible" ? "none" : "visible",
    }));
  };

  const geojson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: coords,
        },
        properties: {},
      },
    ],
  };

  const endPoint = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: end,
        },
        properties: {},
      },
    ],
  };

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

  const layerEndpoint = {
    id: "end",
    type: "circle",
    paint: {
      "circle-radius": 10,
      "circle-color": "#f30",
    },
  };

  const handleClick = (e) => {
    console.log("Map clicked at:", e.lngLat);
    const newLocation = [e.lngLat.lng, e.lngLat.lat];
    if (selectedPoint === "start") {
      setStart(newLocation);
    } else {
      setEnd(newLocation);
    }
  };

  useEffect(() => {
    console.log("Layer visibility state:", layerVisibility);
  }, [layerVisibility]);

  const handleMarkerClick = (longitude, latitude, text) => {
    console.log("Marker clicked at:", longitude, latitude);
    setSelectedMarker({ longitude, latitude, text });
    console.log("Selected marker:", selectedMarker);
  };

  return (
    <>
      <meta name="Mapbox" content="Mapbox Integration" />
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

          <Source id="composite" type="vector" url="mapbox://composite">
            <Layer
              id="walkingTrailsLayer"
              source-layer="trans_walking_trails-1i81xd"
              type="line"
              paint={{
                "line-color": "#913368",
                "line-width": 2,
              }}
              layout={{ visibility: layerVisibility.walkingTrails }}
            />
          </Source>

          <Source id="composite" type="vector" url="mapbox://composite">
            <Layer
              id="bikeFacilitiesLayer"
              source-layer="trans_bike_facilities-22p2zm"
              type="line"
              paint={{
                "line-color": "#92c6df",
                "line-offset": 1,
                "line-width": 2,
              }}
              layout={{ visibility: layerVisibility.bikeFacilities }}
            />
          </Source>

          <Source id="composite" type="vector" url="mapbox://composite">
            <Layer
              id="landLineSystemsLayer"
              source-layer="trans_land_line_systems-710cn0"
              type="line"
              paint={{
                "line-color": "hsl(50, 100%, 66%)",
                "line-width": 2,
              }}
              layout={{ visibility: layerVisibility.landLineSystems }}
            />
          </Source>

          <Source id="composite" type="vector" url="mapbox://composite">
            <Layer
              id="sharedUsePathsLayer"
              source-layer="trans_shared_use_paths-9a2oo6"
              type="line"
              paint={{
                "line-color": "#41ec74",
                "line-offset": 3,
                "line-width": 2,
              }}
              layout={{ visibility: layerVisibility.sharedUsePaths }}
            />
          </Source>

          <GeolocateControl
            showAccuracyCircle={false}
            onGeolocate={(e) =>
              setStart([e.coords.longitude, e.coords.latitude])
            }
            ref={GeolocateControlRef}
          />
          <FullscreenControl />
          <NavigationControl
            position="top-right"
            style={{ bottom: "30px !important" }}
          />
          <Marker
            longitude={start[0]}
            latitude={start[1]}
            onClick={() => handleMarkerClick(start[0], start[1], "Start Point")}
          />
          <Marker
            longitude={end[0]}
            latitude={end[1]}
            onClick={() => handleMarkerClick(end[0], end[1], "End Point")}
          />
          {selectedMarker && (
            <Popup
              longitude={selectedMarker.longitude}
              latitude={selectedMarker.latitude}
              onClose={() => setSelectedMarker(null)}
              closeOnClick={false}
              anchor="top"
            >
              <div>{selectedMarker.text}</div>
              <div>lat: {selectedMarker.latitude}</div>
              <div>lng: {selectedMarker.longitude}</div>
            </Popup>
          )}
        </ReactMapGl>
        {showFeatures && (
          <InstructionsDrawer
            getRoute={getRoute}
            setStart={setStart}
            setEnd={setEnd}
            start={start}
            end={end}
            selectedPoint={selectedPoint}
            setSelectedPoint={setSelectedPoint}
            layerVisibility={layerVisibility}
            toggleLayerVisibility={toggleLayerVisibility}
            distance={distance}
            duration={duration}
            travelMode={travelMode}
            setTravelMode={setTravelMode}
          />
        )}
      </section>
    </>
  );
};

export default Map;
