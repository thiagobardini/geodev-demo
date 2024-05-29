import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X, Info } from "lucide-react";
import Places from "./Places";
import Tooltip from "@/components/shared/tooltip";
import Layers from "./Layers";
import useMediaQuery from "@/lib/hooks/use-media-query";

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
  selectedPoint,
  setSelectedPoint,
  layerVisibility,
  toggleLayerVisibility,
  distance,
  duration,
  travelMode,
  setTravelMode,
}) => {
  const { isMobile } = useMediaQuery();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isMobile) {
      setIsOpen(true);
    }
  }, [isMobile]);

  const handleRedirect = () => {
    if (start && end) {
      const url = `https://www.google.com/maps/dir/?api=1&origin=${start[1]},${start[0]}&destination=${end[1]},${end[0]}&travelmode=${travelMode}`;
      window.open(url, "_blank");
    }
  };

  useEffect(() => {
    if (travelMode) {
      // Recalculate route when travel mode changes
      getRoute();
    }
  }, [travelMode]);

  const formatDuration = (minutes: number) => {
    const h = Math.floor(minutes / 60);
    const m = Math.ceil(minutes % 60);
    if (h > 0) {
      return `${h} hour${h > 1 ? "s" : ""} ${m} minute${m > 1 ? "s" : ""}`;
    }
    return `${m} minute${m > 1 ? "s" : ""}`;
  };

  return (
    <div
      className={`fixed left-0 top-0 z-50 h-full transform transition-transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } w-80 bg-slate-800 shadow-lg`}
    >
      <div className="flex items-center justify-between bg-slate-900 p-4">
        <h2 className="text-lg font-semibold text-white">Instructions</h2>
        <button onClick={() => setIsOpen(false)}>
          <X className="h-6 w-6 text-white" />
        </button>
      </div>
      <div className="h-full min-h-screen overflow-y-auto p-4">
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
        <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-gray-100"></div>
        </div>
        <div className="mt-4 flex items-center">
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

        <div className="mt-4 flex items-center">
          <h3 className="text-white">Select Point to Change on Map</h3>
          <Tooltip content="Select 'Start Point' or 'End Point' below to set the corresponding marker on the map when you click instead of entering the address.">
            <Info className="ml-2 h-5 w-5 text-gray-400" />
          </Tooltip>
        </div>
        <select
          className="mt-2 w-full bg-slate-800 p-2 text-sm text-white shadow-inner"
          value={selectedPoint}
          onChange={(e) => setSelectedPoint(e.target.value)}
        >
          <option className="text-sm" value="start">
            Start Point
          </option>
          <option value="end">End Point</option>
        </select>

        <div className="mt-4 flex items-center">
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
        <div className="mt-4 text-sm text-white">
          <p>Distance: {(distance / 1609.34).toFixed(2)} miles</p>
          <p>Duration: {formatDuration(duration)}</p>
        </div>
        <button
          onClick={handleRedirect}
          className="mt-4 w-full rounded-md bg-blue-500 p-2 text-sm text-white"
        >
          Open in Google Maps
        </button>
      </div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-8 top-1/2 -translate-y-1/2 transform rounded-r-md bg-slate-800 p-2 text-white shadow-md"
      >
        {!isOpen ? <ChevronLeft /> : <ChevronRight />}
      </button>
    </div>
  );
};

export default InstructionsDrawer;
