import React, { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Instructions from "./Instructions";
import Places from "./Places";

interface Coordinates {
  lat: number;
  lng: number;
}

interface InstructionsDrawerProps {
  steps: Array<{ maneuver: { instruction: string } }>;
  setStart: (point: Coordinates) => void;
  setEnd: (point: Coordinates) => void;
  start: [number, number];  // [longitude, latitude]
  end: [number, number];    // [longitude, latitude]
  selectedPoint: string;
  setSelectedPoint: (point: string) => void;
}

const InstructionsDrawer: React.FC<InstructionsDrawerProps> = ({ steps, setStart, setEnd, start, end, selectedPoint, setSelectedPoint }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [travelMode, setTravelMode] = useState("driving");

  const handleRedirect = () => {
    if (start && end) {
      const url = `https://www.google.com/maps/dir/?api=1&origin=${start[1]},${start[0]}&destination=${end[1]},${end[0]}&travelmode=${travelMode}`;
      window.open(url, "_blank");
    }
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
      <div className="p-4">
        <p className="text-sm text-gray-400">
          You can change the start point and end point by entering the locations in the inputs below. Click on the map to set the location. Use the selector to choose which point you want to change when clicking on the map.
        </p>
        <h3 className="mt-4 text-white">Directions</h3>
        <h3 className="text-white">Start Point</h3>
        <Places placeholder="Enter Start Point" setEnd={(point: Coordinates) => setStart(point)} />
        <h3 className="mt-4 text-white">End Point</h3>
        <Places placeholder="Enter End Point" setEnd={(point: Coordinates) => setEnd(point)} />
        
        <h3 className="mt-4 text-white">Select Point to Change on Map</h3>
        <select
          className="mt-2 w-full p-2 rounded-md"
          value={selectedPoint}
          onChange={(e) => setSelectedPoint(e.target.value)}
        >
          <option value="start">Start Point</option>
          <option value="end">End Point</option>
        </select>

        <h3 className="mt-4 text-white">Travel Mode</h3>
        <select
          className="mt-2 w-full p-2 rounded-md"
          value={travelMode}
          onChange={(e) => setTravelMode(e.target.value)}
        >
          <option value="driving">Driving</option>
          <option value="walking">Walking</option>
          <option value="bicycling">Bicycling</option>
        </select>
        <button
          onClick={handleRedirect}
          className="mt-4 w-full bg-blue-500 text-white p-2 rounded-md"
        >
          Open in Google Maps
        </button>
      </div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-8 top-1/2 -translate-y-1/2 transform rounded-r-md bg-slate-900 p-2 text-white shadow-md"
      >
        {isOpen ? <ChevronLeft /> : <ChevronRight />}
      </button>
    </div>
  );
};

export default InstructionsDrawer;
