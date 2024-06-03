"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  Suspense,
  useMemo,
} from "react";
import ReactMapboxGl, {
  FullscreenControl,
  GeolocateControl,
  NavigationControl,
  Popup,
  Source,
  Layer,
  Marker,
} from "react-map-gl";
import InstructionsDrawer from "./InstructionsDrawer";
import LabeledMarker from "./LabeledMarker";
import GeocoderControl from "./geocoder-control";
import VersionModal from "./version-modal";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import Image from "next/image";
import {
  lineStyle,
  startPointStyle,
  endPointStyle,
} from "./map-styles/trailLinesLayerProps";
import Pin from "./pin";
import Header from "./Header";

const initialViewState = {
  latitude: 42.395043,
  longitude: -71.161471,
  zoom: 10,
  bearing: 0,
  pitch: 0,
  padding: { top: 0, bottom: 0, left: 0, right: 0 },
};

const ImageWithFallback = ({ src, alt, width, height, className }) => (
  <Suspense fallback={<LoadingSpinner />}>
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  </Suspense>
);

const TrailMap = () => {
  const [viewport, setViewport] = useState(initialViewState);
  const [start, setStart] = useState([-71.061471, 42.355043]);
  const [end, setEnd] = useState([-71.22424322006663, 42.38078912464982]);
  const [coords, setCoords] = useState([]);
  const [layerVisibility, setLayerVisibility] = useState({
    walkingTrails: "visible",
    bikeFacilities: "visible",
    landLineSystems: "visible",
    sharedUsePaths: "visible",
    trailEntrances: "visible",
  });
  const [trailEntrancesData, setTrailEntrancesData] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [selectedPoint, setSelectedPoint] = useState("end");
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [travelMode, setTravelMode] = useState("walking");
  const [popupInfo, setPopupInfo] = useState(null);

  const GeolocateControlRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const fetchTrailEntrancesData = async () => {
      const response = await fetch("/data/trailEntrancesData.json");
      const data = await response.json();
      setTrailEntrancesData(data.features);
    };

    fetchTrailEntrancesData();
  }, []);

  const getRoute = useCallback(async () => {
    const adjustedTravelMode =
      travelMode === "bicycling" ? "cycling" : travelMode;
    try {
      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/${adjustedTravelMode}/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}`,
      );
      const data = await response.json();
      console.log("Route data:", data);

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

  useEffect(() => {
    console.log("Layer visibility state:", layerVisibility);
  }, [layerVisibility]);

  const handleMarkerClick = (longitude, latitude, text) => {
    setSelectedMarker({ longitude, latitude, text });
  };

  const pins = useMemo(
    () =>
      trailEntrancesData.map((trail, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={trail.geometry.coordinates[0]}
          latitude={trail.geometry.coordinates[1]}
          anchor="bottom"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            setPopupInfo(trail);
          }}
        >
          <Pin />
        </Marker>
      )),
    [trailEntrancesData],
  );

  return (
    <>
      {/* <VersionModal /> */}
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
            {/* <GeocoderControl
              mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
              position="bottom-right"
            /> */}

            <Source id="composite" type="vector" url="mapbox://composite">
              <Layer
                id="walkingTrailsLayer"
                source-layer="trans_walking_trails-1i81xd"
                type="line"
                paint={{
                  "line-color": "#913368",
                  "line-width": 1,
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
                  "line-width": 1,
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
                  "line-width": 1,
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
                  "line-width": 1,
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

            {layerVisibility.trailEntrances === "visible" && pins}

            <Marker
              longitude={start[0]}
              latitude={start[1]}
              anchor="bottom"
              draggable
              onDragEnd={(e) => handleMarkerDragEnd(e, setStart)}
            >
              <div className="rounded-md bg-green-500 p-1 text-white">
                Start Point
              </div>
            </Marker>

            <Marker
              longitude={end[0]}
              latitude={end[1]}
              anchor="bottom"
              draggable
              onDragEnd={(e) => handleMarkerDragEnd(e, setEnd)}
            >
              <div className="rounded-md bg-red-500 p-1 text-white">
                End Point
              </div>
            </Marker>

            {popupInfo && (
              <Popup
                longitude={popupInfo.geometry.coordinates[0]}
                latitude={popupInfo.geometry.coordinates[1]}
                onClose={() => setPopupInfo(null)}
                closeOnClick={false}
                anchor="top"
              >
                <div className="p-2">
                  <h3 className="text-lg font-semibold">
                    {popupInfo.properties.name}
                  </h3>
                  <p className="text-sm">
                    {popupInfo.properties.activities.join(", ")}
                  </p>
                  <div className="my-2">
                    <ImageWithFallback
                      src={popupInfo.properties.imageUrl.replace("./", "/")}
                      alt={popupInfo.properties.name}
                      className="rounded"
                      width={200}
                      height={100}
                    />
                  </div>
                  <a
                    href={popupInfo.properties.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-indigo-600 hover:text-indigo-800"
                  >
                    More info
                  </a>
                </div>
              </Popup>
            )}

            <GeolocateControl
              showAccuracyCircle={false}
              onGeolocate={(e) =>
                setStart([e.coords.longitude, e.coords.latitude])
              }
              ref={GeolocateControlRef}
              position="bottom-right"
            />
            <FullscreenControl position="bottom-right" />
            <NavigationControl
              position="bottom-right"
              style={{ bottom: "30px !important" }}
            />

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
