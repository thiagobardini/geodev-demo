import React from "react";

interface LayersProps {
  layerVisibility: { [key: string]: string };
  toggleLayerVisibility: (layerId: string) => void;
}

const Layers: React.FC<LayersProps> = ({ layerVisibility, toggleLayerVisibility }) => {
  return (
    <div className="">
      <div className="mt-2 flex items-center">
        <div className="mr-2 h-4 w-4" style={{ backgroundColor: "#913368" }}></div>
        <button className="text-white" onClick={() => toggleLayerVisibility("walkingTrails")}>
          {layerVisibility.walkingTrails === "visible" ? "Hide" : "Show"} Walking Trails
        </button>
      </div>
      <div className="mt-2 flex items-center">
        <div className="mr-2 h-4 w-4" style={{ backgroundColor: "#92c6df" }}></div>
        <button className="text-white" onClick={() => toggleLayerVisibility("bikeFacilities")}>
          {layerVisibility.bikeFacilities === "visible" ? "Hide" : "Show"} Bike Facilities
        </button>
      </div>
      <div className="mt-2 flex items-center">
        <div className="mr-2 h-4 w-4" style={{ backgroundColor: "hsl(50, 100%, 66%)" }}></div>
        <button className="text-white" onClick={() => toggleLayerVisibility("landLineSystems")}>
          {layerVisibility.landLineSystems === "visible" ? "Hide" : "Show"} Land Line Systems
        </button>
      </div>
      <div className="mt-2 flex items-center">
        <div className="mr-2 h-4 w-4" style={{ backgroundColor: "#41ec74" }}></div>
        <button className="text-white" onClick={() => toggleLayerVisibility("sharedUsePaths")}>
          {layerVisibility.sharedUsePaths === "visible" ? "Hide" : "Show"} Shared Use Paths
        </button>
      </div>
    </div>
  );
};

export default Layers;
