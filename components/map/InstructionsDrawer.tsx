"use client";

import React, {
  useState,
  useEffect,
  useRef,
  SetStateAction,
  Dispatch,
} from "react";
import { X, Info, MapPin, Locate } from "lucide-react";
import Places from "./Places";
import Tooltip from "@/components/shared/tooltip";
import Layers from "./Layers";
import useMediaQuery from "@/lib/hooks/use-media-query";
import Image from "next/image";
import VersionModal from "./version-modal";
import { formatDuration } from "@/lib/utils";
import TravelModeButtons from "./TravelModeButtons";
import Link from "next/link";
import MapStyleSelector from "./MapStyleSelector";

interface InstructionsDrawerProps {
  getRoute: () => void;
  setStart: (point: [number, number]) => void;
  setEnd: (point: [number, number]) => void;
  start: [number, number]; // [longitude, latitude]
  end: [number, number]; // [longitude, latitude]
  selectedPoint: string;
  setSelectedPoint: (point: string) => void;
  layerVisibility: { [key: string]: string };
  toggleLayerVisibility: (layerId: string) => void;
  distance: number;
  duration: number;
  travelMode: string;
  setTravelMode: (mode: string) => void;
  data: any;
  setMapStyle: Dispatch<SetStateAction<string>>;
  mapStyle: string;
}

const InstructionsDrawer: React.FC<InstructionsDrawerProps> = ({
  getRoute,
  setStart,
  setEnd,
  start,
  end,
  layerVisibility,
  toggleLayerVisibility,
  distance,
  duration,
  travelMode,
  setTravelMode,
  setMapStyle,
  mapStyle,
}) => {
  const { isMobile } = useMediaQuery();
  const [isOpen, setIsOpen] = useState(false);
  const [showVersionModal, setShowVersionModal] = useState(true);
  const [startPlaceName, setStartPlaceName] = useState("Fetching location...");
  const [endPlaceName, setEndPlaceName] = useState("Fetching location...");
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsOpen(!isMobile);
  }, [isMobile]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobile &&
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isMobile) {
      document.addEventListener("mousedown", handleClickOutside, {
        passive: true,
      });
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobile]);

  const handleRedirect = () => {
    if (start && end) {
      const url = `https://www.google.com/maps/dir/?api=1&origin=${start[1]},${start[0]}&destination=${end[1]},${end[0]}&travelmode=${travelMode}`;
      window.open(url, "_blank");
    }
  };

  useEffect(() => {
    getRoute();
    fetchPlaceName(start, setStartPlaceName);
    fetchPlaceName(end, setEndPlaceName);
  }, [start, end, travelMode, getRoute]);

  const fetchPlaceName = async (
    coordinates: [number, number],
    setPlaceName: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates[0]},${coordinates[1]}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}`,
      );
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        setPlaceName(data.features[0].place_name);
      } else {
        setPlaceName("Unknown location");
      }
    } catch (error) {
      console.error("Error fetching place name: ", error);
      setPlaceName("Error fetching location");
    }
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newStart: [number, number] = [
            position.coords.longitude,
            position.coords.latitude,
          ];
          setStart(newStart);
          fetchPlaceName(newStart, setStartPlaceName);
        },
        (error) => {
          console.error("Error getting user location: ", error);
        },
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const setAllLayerVisibility = (visibility: string) => {
    Object.keys(layerVisibility).forEach((layerId) => {
      if (layerId !== "userLocation") {
        toggleLayerVisibility(layerId);
      }
    });
  };

  return (
    <>
      <div
        ref={drawerRef}
        className={`fixed left-0 top-[64px] z-10 h-full transform transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-2/3 rounded-r-lg bg-[#1b1f23] shadow-lg sm:w-80`}
      >
        <Header onClose={() => setIsOpen(false)} />
        <div className="h-full min-h-full overflow-y-auto p-4">
          <LayersSection
            layerVisibility={layerVisibility}
            toggleLayerVisibility={toggleLayerVisibility}
            setAllLayerVisibility={setAllLayerVisibility}
          />
          <Divider />
          <div className="pb-2">
            <div className="flex items-center gap-2">
              <h3 className="text-white">Map Style</h3>
              <Tooltip content="Select the style of the map. Options are Mono, Outdoor, and Satellite.">
                <Info className="h-5 w-5 text-gray-400" />
              </Tooltip>
            </div>
            <div className="mt-2">
              <MapStyleSelector mapStyle={mapStyle} setMapStyle={setMapStyle} />
            </div>
          </div>

          <Divider />

          <DirectionsSection
            setStart={setStart}
            setEnd={setEnd}
            getUserLocation={getUserLocation}
            startPlaceName={startPlaceName}
            endPlaceName={endPlaceName}
          />
          <section className="relative my-4">
            <div className="mb-2 flex items-center">
              <h3 className="text-white">Choose Travel Mode</h3>
              <Tooltip content="Select the mode of travel. Options are driving, walking, and bicycling.">
                <Info className="ml-2 h-5 w-5 text-gray-400" />
              </Tooltip>
            </div>
            <TravelModeButtons
              travelMode={travelMode}
              setTravelMode={setTravelMode}
            />
            <RouteInfo
              distance={distance}
              duration={duration}
              isMobile={isMobile}
            />
          </section>

          <section className="mt-6">
            <OpenInGoogleMapsButton onClick={handleRedirect} />
          </section>
          <VersionInfo onClick={() => setShowVersionModal(true)} />
        </div>
        {!isOpen && <OpenDrawerButton onClick={() => setIsOpen(true)} />}
      </div>
      {showVersionModal && (
        <VersionModal
          showModal={showVersionModal}
          setShowModal={setShowVersionModal}
        />
      )}
    </>
  );
};

const Header: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="relative flex items-center justify-between rounded-t-lg bg-[#282c34] p-4">
    <h2 className="text-lg font-semibold text-white">Instructions</h2>
    <button onClick={onClose} className="absolute right-3 top-5 text-white">
      <X className="h-6 w-6" />
    </button>
  </div>
);

const LayersSection: React.FC<{
  layerVisibility: { [key: string]: string };
  toggleLayerVisibility: (layerId: string) => void;
  setAllLayerVisibility: (visibility: string) => void;
}> = ({ layerVisibility, toggleLayerVisibility, setAllLayerVisibility }) => (
  <section className="drawer-section">
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <h3 className="text-white">Layers</h3>
        <Tooltip content="You can hide or show the trails using the buttons below.">
          <Info className="ml-2 h-5 w-5 text-gray-400" />
        </Tooltip>
      </div>
      <button
        onClick={() =>
          setAllLayerVisibility(
            Object.values(layerVisibility).every((v) => v === "visible")
              ? "none"
              : "visible",
          )
        }
        className="text-sm text-indigo-600 hover:text-indigo-400"
      >
        Select All
      </button>
    </div>
    <Layers
      layerVisibility={layerVisibility}
      toggleLayerVisibility={toggleLayerVisibility}
    />
  </section>
);

const Divider: React.FC = () => (
  <div className="mb-4 mt-3 flex items-center">
    <div className="flex-grow border-t border-gray-700"></div>
  </div>
);

const DirectionsSection: React.FC<{
  setStart: (point: [number, number]) => void;
  setEnd: (point: [number, number]) => void;
  getUserLocation: () => void;
  startPlaceName: string;
  endPlaceName: string;
}> = ({ setStart, setEnd, getUserLocation, startPlaceName, endPlaceName }) => (
  <section className="mt-2">
    <div className="flex items-center">
      <h3 className="text-white">Directions</h3>
      <Tooltip content="You can change the start point and end point by entering the locations in the inputs below. The markers are draggable.">
        <Info className="ml-2 h-5 w-5 text-gray-400" />
      </Tooltip>
    </div>
    <div className="flex items-start">
      <Places
        placeholder={startPlaceName}
        setEnd={(point: [number, number]) => setStart(point)}
        isEndPoint={false}
      />
      <div className="relative h-full">
        <button
          onClick={getUserLocation}
          className="ml-2 mr-1 mt-[8px] rounded bg-indigo-600 p-2 text-white hover:bg-indigo-700"
        >
          <Locate className="h-5 w-5" />
        </button>
      </div>
    </div>
    <div className="flex items-center">
      <Places
        placeholder={endPlaceName}
        setEnd={(point: [number, number]) => setEnd(point)}
        isEndPoint={true}
      />
    </div>
  </section>
);

const RouteInfo: React.FC<{
  distance: number;
  duration: number;
  isMobile?: boolean;
}> = ({ distance, duration, isMobile }) => (
  <div className="mt-5 cursor-pointer text-sm text-white">
    {isMobile ? (
      <div className="flex w-full justify-center gap-2">
        <p>Dist: {(distance / 1609.34).toFixed(2)} mi</p>
        <span style={{ color: "#e0e0e0" }}>|</span>
        <p>Dur: {formatDuration(duration, true)}</p>
      </div>
    ) : (
      <div className="flex w-full justify-center gap-2">
        <p>Distance: {(distance / 1609.34).toFixed(2)} miles</p>
        <span style={{ color: "#e0e0e0" }}>|</span>
        <p>Duration: {formatDuration(duration, true)}</p>
      </div>
    )}
  </div>
);

const OpenInGoogleMapsButton: React.FC<{ onClick: () => void }> = ({
  onClick,
}) => (
  <button
    onClick={onClick}
    className="mt-2 flex w-full items-center justify-center rounded-md bg-indigo-600 p-2 text-sm text-white hover:bg-indigo-700"
  >
    <MapPin className="mr-2 h-5 w-5" />
    Open in Google Maps
  </button>
);

const VersionInfo: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const [versionLabel, setVersionLabel] = useState<string>("");

  useEffect(() => {
    const fetchVersionLabel = async () => {
      const response = await fetch("/data/versionTexts.json");
      const data = await response.json();
      setVersionLabel(data.versionLabel);
    };

    fetchVersionLabel();
  }, []);

  return (
    <div
      className="mb-[124px] mt-8 cursor-pointer  text-center text-sm font-semibold text-white underline sm:pb-0"
      onClick={onClick}
    >
      {versionLabel ? versionLabel : "Loading..."}
    </div>
  );
};


const OpenDrawerButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    onClick={onClick}
    className={`absolute -right-12 top-[45vh] h-12 w-12 -translate-y-1/2 transform rounded-r-md bg-[#1b1f23] text-center shadow-md`}
    style={{ boxShadow: "0 0 0 2px rgba(0, 0, 0, .1)" }}
  >
    <Image
      src="/icons/filter-icon-white.svg"
      alt="Filter Icon"
      width={42}
      height={42}
    />
  </button>
);

export default InstructionsDrawer;
