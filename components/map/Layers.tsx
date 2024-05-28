import React from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface LayersProps {
  layerVisibility: { [key: string]: string };
  toggleLayerVisibility: (layerId: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Layers: React.FC<LayersProps> = ({ layerVisibility, toggleLayerVisibility, isOpen, setIsOpen }) => {
  return (
    <div
      className={`fixed bottom-16 right-0 z-50 h-fit transform transition-transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } w-80 bg-slate-800 p-2 text-white shadow-lg`}
    >
      <div className="flex items-center justify-between bg-gray-900 p-4">
        <h2 className="text-lg font-semibold text-white">Layers</h2>
        <button onClick={() => setIsOpen(false)}>
          <X className="h-6 w-6 text-white" />
        </button>
      </div>
      <div className="p-4">
        <div className="mt-2 flex items-center">
          <div className="mr-2 h-4 w-4" style={{ backgroundColor: "#913368" }}></div>
          <button onClick={() => toggleLayerVisibility("walkingTrails")}>
            {layerVisibility.walkingTrails === "visible" ? "Hide" : "Show"} Walking Trails
          </button>
        </div>
        <div className="mt-2 flex items-center">
          <div className="mr-2 h-4 w-4" style={{ backgroundColor: "#92c6df" }}></div>
          <button onClick={() => toggleLayerVisibility("bikeFacilities")}>
            {layerVisibility.bikeFacilities === "visible" ? "Hide" : "Show"} Bike Facilities
          </button>
        </div>
        <div className="mt-2 flex items-center">
          <div className="mr-2 h-4 w-4" style={{ backgroundColor: "hsl(50, 100%, 66%)" }}></div>
          <button onClick={() => toggleLayerVisibility("landLineSystems")}>
            {layerVisibility.landLineSystems === "visible" ? "Hide" : "Show"} Land Line Systems
          </button>
        </div>
        <div className="mt-2 flex items-center">
          <div className="mr-2 h-4 w-4" style={{ backgroundColor: "#41ec74" }}></div>
          <button onClick={() => toggleLayerVisibility("sharedUsePaths")}>
            {layerVisibility.sharedUsePaths === "visible" ? "Hide" : "Show"} Shared Use Paths
          </button>
        </div>
      </div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -left-8 top-1/2 -translate-y-1/2 transform rounded-l-md bg-gray-900 p-2 text-white shadow-md"
      >
        {isOpen ? <ChevronRight /> : <ChevronLeft />}
      </button>
    </div>
  );
};

export default Layers;
