import React from "react";

interface LayersProps {
  layerVisibility: { [key: string]: string };
  toggleLayerVisibility: (layerId: string) => void;
}

const Layers: React.FC<LayersProps> = ({
  layerVisibility,
  toggleLayerVisibility,
}) => {
  return (
    <div className="mt-1">
      {/* Walking Trails */}
      <div className="relative flex items-start">
        <div className="flex h-6 items-center">
          <input
            id="walking"
            onClick={() => toggleLayerVisibility("walkingTrails")}
            name="walking"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            checked={layerVisibility.walkingTrails === "visible"}
          />
        </div>
        <div className="ml-3 flex items-center text-sm leading-6">
          <label htmlFor="walking" className="font-medium text-white">
            Walking Trails
          </label>
          <div
            className="ml-2 h-1 w-6"
            style={{ backgroundColor: "#913368" }}
          ></div>
        </div>
      </div>
      {/* Bike Trails */}
      <div className="relative flex items-start">
        <div className="flex h-6 items-center">
          <input
            id="bike"
            onClick={() => toggleLayerVisibility("bikeFacilities")}
            name="bike"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            checked={layerVisibility.bikeFacilities === "visible"}
          />
        </div>
        <div className="ml-3 flex items-center text-sm leading-6">
          <label htmlFor="bike" className="font-medium text-white">
            Bike Trails
          </label>
          <div
            className="ml-2 h-1 w-6"
            style={{ backgroundColor: "#92c6df" }}
          ></div>
        </div>
      </div>
      {/* Land Line Systems */}
      <div className="relative flex items-start">
        <div className="flex h-6 items-center">
          <input
            id="landLine"
            onClick={() => toggleLayerVisibility("landLineSystems")}
            name="landLine"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            checked={layerVisibility.landLineSystems === "visible"}
          />
        </div>
        <div className="ml-3 flex items-center text-sm leading-6">
          <label htmlFor="landLine" className="font-medium text-white">
            Land Line Systems
          </label>
          <div
            className="ml-2 h-1 w-6"
            style={{ backgroundColor: "hsl(50, 100%, 66%)" }}
          ></div>
        </div>
      </div>
      {/* Shared Use Paths */}
      <div className="relative flex items-start">
        <div className="flex h-6 items-center">
          <input
            id="sharedUsePaths"
            onClick={() => toggleLayerVisibility("sharedUsePaths")}
            name="sharedUsePaths"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            checked={layerVisibility.sharedUsePaths === "visible"}
          />
        </div>
        <div className="ml-3 flex items-center text-sm leading-6">
          <label htmlFor="sharedUsePaths" className="font-medium text-white">
            Shared Use Paths
          </label>
          <div
            className="ml-2 h-1 w-6"
            style={{ backgroundColor: "#41ec74" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Layers;
