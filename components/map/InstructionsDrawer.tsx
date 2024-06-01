import React, { useState, useEffect } from "react";
import { X, Info } from "lucide-react";
import Places from "./Places";
import Tooltip from "@/components/shared/tooltip";
import Layers from "./Layers";
import useMediaQuery from "@/lib/hooks/use-media-query";
import Image from "next/image";
import VersionModal from "./version-modal";

interface Coordinates {
  lat: number;
  lng: number;
}

interface InstructionsDrawerProps {
  getRoute: () => void;
  setStart: (point: Coordinates) => void;
  setEnd: (point: Coordinates) => void;
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
}) => {
  const { isMobile } = useMediaQuery();
  const [isOpen, setIsOpen] = useState(false);
  const [showVersionModal, setShowVersionModal] = useState(true);

  useEffect(() => {
    setIsOpen(!isMobile);
  }, [isMobile]);

  const handleRedirect = () => {
    if (start && end) {
      const url = `https://www.google.com/maps/dir/?api=1&origin=${start[1]},${start[0]}&destination=${end[1]},${end[0]}&travelmode=${travelMode}`;
      window.open(url, "_blank");
    }
  };

  useEffect(() => {
    getRoute();
  }, [travelMode, getRoute]);

  const formatDuration = (minutes: number) => {
    const h = Math.floor(minutes / 60);
    const m = Math.ceil(minutes % 60);
    if (h > 0) {
      return `${h} hour${h > 1 ? "s" : ""} ${m} minute${m > 1 ? "s" : ""}`;
    }
    return `${m} minute${m > 1 ? "s" : ""}`;
  };

  return (
    <>
      <div
        className={`fixed left-0 top-[64px] z-20 h-full transform transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-2/3 bg-slate-800 shadow-lg sm:w-80`}
      >
        <Header onClose={() => setIsOpen(false)} />
        <div className="h-full min-h-screen overflow-y-auto p-4 pb-40">
          <LayersSection
            layerVisibility={layerVisibility}
            toggleLayerVisibility={toggleLayerVisibility}
          />
          <Divider />
          <DirectionsSection setStart={setStart} setEnd={setEnd} />
          <DraggableMarkersSection />
          <TravelModeSection
            travelMode={travelMode}
            setTravelMode={setTravelMode}
          />
          <RouteInfo
            distance={distance}
            duration={duration}
            formatDuration={formatDuration}
          />
          <OpenInGoogleMapsButton onClick={handleRedirect} />
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

// Subcomponents
const Header: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="relative flex items-center justify-between bg-slate-900 p-4">
    <h2 className="text-lg font-semibold text-white">Instructions</h2>
    <button onClick={onClose} className="absolute right-3 top-5 text-white">
      <X className="h-6 w-6" />
    </button>
  </div>
);

const LayersSection: React.FC<{
  layerVisibility: { [key: string]: string };
  toggleLayerVisibility: (layerId: string) => void;
}> = ({ layerVisibility, toggleLayerVisibility }) => (
  <section>
    <div className="flex items-center">
      <h3 className="text-white">Layers</h3>
      <Tooltip content="You can hide or show the trails using the buttons below.">
        <Info className="ml-2 h-5 w-5 text-gray-400" />
      </Tooltip>
    </div>
    <Layers
      layerVisibility={layerVisibility}
      toggleLayerVisibility={toggleLayerVisibility}
    />
  </section>
);

const Divider: React.FC = () => (
  <div className="my-6 flex items-center">
    <div className="flex-grow border-t border-gray-100"></div>
  </div>
);

const DirectionsSection: React.FC<{
  setStart: (point: Coordinates) => void;
  setEnd: (point: Coordinates) => void;
}> = ({ setStart, setEnd }) => (
  <section className="mt-2">
    <div className="flex items-center">
      <h3 className="text-white">Directions</h3>
      <Tooltip content="You can change the start point and end point by entering the locations in the inputs below.">
        <Info className="ml-2 h-5 w-5 text-gray-400" />
      </Tooltip>
    </div>
    <Places
      placeholder="Enter Start Point"
      setEnd={(point: Coordinates) => setStart(point)}
    />
    <Places
      placeholder="Enter End Point"
      setEnd={(point: Coordinates) => setEnd(point)}
    />
  </section>
);

const DraggableMarkersSection: React.FC = () => (
  <section className="pt-2">
    <div className="flex items-center">
      <h3 className="text-white">Draggable Markers</h3>
      <Tooltip content="Drag the markers to change the start and end points.">
        <Info className="ml-2 h-5 w-5 text-gray-400" />
      </Tooltip>
    </div>
    <div className="mt-2 flex items-center justify-start gap-4">
      <div className="rounded-md bg-green-500 p-1 text-white">Start Point</div>
      <div className="rounded-md bg-red-500 p-1 text-white">End Point</div>
    </div>
  </section>
);

const TravelModeSection: React.FC<{
  travelMode: string;
  setTravelMode: (mode: string) => void;
}> = ({ travelMode, setTravelMode }) => (
  <section className="mt-4">
    <div className="flex items-center">
      <h3 className="text-white">Travel Mode</h3>
      <Tooltip content="Select the mode of travel. Options are driving, walking, and bicycling.">
        <Info className="ml-2 h-5 w-5 text-gray-400" />
      </Tooltip>
    </div>
    <select
      className="mt-2 w-full bg-slate-800 p-2 text-sm text-white shadow-inner"
      value={travelMode}
      onChange={(e) => setTravelMode(e.target.value)}
    >
      <option value="driving">Driving</option>
      <option value="walking">Walking</option>
      <option value="bicycling">Bicycling</option>
    </select>
  </section>
);

const RouteInfo: React.FC<{
  distance: number;
  duration: number;
  formatDuration: (minutes: number) => string;
}> = ({ distance, duration, formatDuration }) => (
  <div className="mt-4 text-sm text-white">
    <p>Distance: {(distance / 1609.34).toFixed(2)} miles</p>
    <p>Duration: {formatDuration(duration)}</p>
  </div>
);

const OpenInGoogleMapsButton: React.FC<{ onClick: () => void }> = ({
  onClick,
}) => (
  <button
    onClick={onClick}
    className="mt-4 w-full rounded-md bg-indigo-500 p-2 text-sm text-white"
  >
    Open in Google Maps
  </button>
);

const VersionInfo: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <div
    className="mt-8 cursor-pointer text-center text-sm font-semibold text-white underline"
    onClick={onClick}
  >
    Version 2.0
  </div>
);

const OpenDrawerButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    onClick={onClick}
    className={`absolute -right-12 top-1/2 h-12 w-12 -translate-y-1/2 transform rounded-r-md bg-slate-800 text-center shadow-md`}
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
