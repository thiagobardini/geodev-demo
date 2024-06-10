"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  Suspense,
} from "react";
import ReactMapboxGl, {
  FullscreenControl,
  GeolocateControl,
  NavigationControl,
  Source,
  Layer,
  Marker,
  ScaleControl,
} from "react-map-gl";
import InstructionsDrawer from "./InstructionsDrawer";
import useMediaQuery from "@/lib/hooks/use-media-query";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import {
  lineStyle,
  startPointStyle,
  endPointStyle,
} from "./map-styles/trailLinesLayerProps";
import Header from "./Header";
import UserPin from "./map-styles/userPin";
import PinsTrailsEntrance from "./PinsTrailsEntrance";
import TrailPopup from "./TrailPopup";

const initialViewState = {
  latitude: 42.362,
  longitude: -71.075,
  zoom: 11,
  bearing: 0,
  pitch: 0,
  padding: { top: 0, bottom: 0, left: 0, right: 0 },
};

const TrailMap = () => {
  const [viewport, setViewport] = useState(initialViewState);
  const [start, setStart] = useState([-71.06231336746748, 42.36603734491197]);
  const [end, setEnd] = useState([-71.11004052997221, 42.352832707822245]);
  const [coords, setCoords] = useState([]);
  const [layerVisibility, setLayerVisibility] = useState({
    walkingTrails: "visible",
    bikeFacilities: "visible",
    landLineSystems: "visible",
    sharedUsePaths: "visible",
    trailEntrances: "visible",
    userLocation: "visible",
  });
  const [trailEntrancesData, setTrailEntrancesData] = useState(null);
  const [selectedPoint, setSelectedPoint] = useState("end");
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [travelMode, setTravelMode] = useState("walking");
  const [popupInfo, setPopupInfo] = useState(null);
  const [renderKey, setRenderKey] = useState(0);

  const { isMobile } = useMediaQuery();

  const GeolocateControlRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const fetchTrailEntrancesData = async () => {
      const response = await fetch("/data/trailEntrancesData.json");
      const data = await response.json();
      setTrailEntrancesData(data);
    };

    fetchTrailEntrancesData();
  }, []);

  useEffect(() => {
    setLayerVisibility((prevState) => ({
      ...prevState,
      trailEntrances: "none",
    }));
    setTimeout(() => {
      setLayerVisibility((prevState) => ({
        ...prevState,
        trailEntrances: "visible",
      }));
    }, 0);
  }, []);

  const getRoute = useCallback(async () => {
    const adjustedTravelMode =
      travelMode === "bicycling" ? "cycling" : travelMode;
    try {
      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/${adjustedTravelMode}/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}`,
      );
      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        const coords = route.geometry.coordinates;
        setCoords(coords);
        setDistance(route.distance);
        setDuration(route.duration / 60);
      } else {
        setCoords([]);
        setDistance(0);
        setDuration(0);
      }
    } catch (error) {
      console.error("Error fetching route data:", error);
      setCoords([]);
      setDistance(0);
      setDuration(0);
    }
  }, [start, end, travelMode]);

  useEffect(() => {
    getRoute();
  }, [start, end, travelMode, getRoute]);

  const toggleLayerVisibility = (layerId) => {
    setLayerVisibility((prevState) => {
      const newVisibility =
        prevState[layerId] === "visible" ? "none" : "visible";
      return {
        ...prevState,
        [layerId]: newVisibility,
      };
    });
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

  const startPoint = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: start,
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

  const handleMarkerDragEnd = (event, setPoint) => {
    const newLocation = [event.lngLat.lng, event.lngLat.lat];
    setPoint(newLocation);
  };

  const handleClick = (e) => {
    if (popupInfo) {
      setPopupInfo(null);
    }
  };

  const connectToEndpoint = (coordinates) => {
    setEnd(coordinates);
  };

  return (
    <>
      <section className="relative h-full w-full">
        <Suspense fallback={<LoadingSpinner />}>
          <ReactMapboxGl
            {...viewport}
            ref={mapRef}
            onClick={handleClick}
            onMove={(event) => setViewport(event.viewState)}
            mapStyle={process.env.NEXT_PUBLIC_MAPBOX_STYLE_MONOCHROME}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
            style={{ width: "100%", height: "100%" }}
            addControl={true}
          >
            <Header
              travelMode={travelMode}
              setTravelMode={setTravelMode}
              distance={distance}
              duration={duration}
            />

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
                  "line-color": "#214a2d",
                  "line-offset": 3,
                  "line-width": 2,
                }}
                layout={{ visibility: layerVisibility.sharedUsePaths }}
              />
            </Source>

            <Source id="routeSource" type="geojson" data={geojson}>
              <Layer {...lineStyle} />
            </Source>

            <Source id="startSource" type="geojson" data={startPoint}>
              <Layer {...startPointStyle} />
            </Source>

            <Source id="endSource" type="geojson" data={endPoint}>
              <Layer {...endPointStyle} />
            </Source>

            {trailEntrancesData && (
              <PinsTrailsEntrance
                trailEntrancesData={trailEntrancesData}
                setPopupInfo={setPopupInfo}
                layerVisibility={layerVisibility}
              />
            )}

            {layerVisibility.userLocation === "visible" && (
              <>
                <Marker
                  key={`start-marker-${renderKey}`}
                  longitude={start[0]}
                  latitude={start[1]}
                  anchor="bottom"
                  draggable
                  onDragEnd={(e) => handleMarkerDragEnd(e, setStart)}
                >
                  <UserPin text="Start Point" size="50px" />
                </Marker>

                <Marker
                  key={`end-marker-${renderKey}`}
                  longitude={end[0]}
                  latitude={end[1]}
                  anchor="bottom"
                  draggable
                  onDragEnd={(e) => handleMarkerDragEnd(e, setEnd)}
                >
                  <UserPin text="End Point" size="50px" />
                </Marker>
              </>
            )}

            {popupInfo && (
              <TrailPopup
                popupInfo={popupInfo}
                onClose={() => setPopupInfo(null)}
                connectToEndpoint={connectToEndpoint}
              />
            )}

            <ScaleControl
              position={isMobile ? "bottom-left" : "bottom-right"}
            />
            <div className="absolute h-full">
              <NavigationControl
                position="bottom-right"
                style={{
                  position: "relative",
                  bottom: isMobile ? "80px" : 0,
                  right: 0,
                }}
              />
              <GeolocateControl
                showAccuracyCircle={false}
                onGeolocate={(e) =>
                  setStart([e.coords.longitude, e.coords.latitude])
                }
                ref={GeolocateControlRef}
                position="bottom-right"
                style={{
                  position: "relative",
                  bottom: isMobile ? "80px" : 0,
                  right: 0,
                }}
              />
              <FullscreenControl
                position="bottom-right"
                style={{
                  position: "relative",
                  bottom: isMobile ? "80px" : 0,
                  right: 0,
                }}
              />
            </div>

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
          </ReactMapboxGl>
        </Suspense>
      </section>
    </>
  );
};

export default TrailMap;
