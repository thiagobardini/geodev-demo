import React from "react";
import Image from "next/image";

interface LayersProps {
  layerVisibility: { [key: string]: string };
  toggleLayerVisibility: (layerId: string) => void;
}

const layersConfig = [
  { id: "walkingTrails", label: "Walking Trails", color: "#913368" },
  { id: "bikeFacilities", label: "Biking Trails", color: "#92c6df" },
  { id: "sharedUsePaths", label: "Shared Use Paths", color: "#214a2d" },
  {
    id: "landLineSystems",
    label: "LandLine Systems",
    color: "hsl(50, 100%, 66%)",
  },
  {
    id: "trailEntrances",
    label: "Trail Park",
    icon: <Image alt="TrailMap Demo" src="/icons/trail-pin.png" width="20" height="20" />
  }

];

const Layers: React.FC<LayersProps> = ({
  layerVisibility,
  toggleLayerVisibility,
}) => {
  const handleChange = (layerId: string) => () => {
    toggleLayerVisibility(layerId);
  };

  return (
    <div className="relative mt-1">
      {layersConfig.map(({ id, label, color, icon }) => (
        <div
          key={id}
          className="grid grid-cols-[auto_1fr_auto] items-center py-1"
        >
          <input
            id={id}
            onChange={handleChange(id)}
            name={id}
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            checked={layerVisibility[id] === "visible"}
          />
          <label
            htmlFor={id}
            className="ml-2 flex-1 text-sm font-medium text-white"
          >
            {label}
          </label>
          {color && (
            <div
              className="ml-2 h-2 w-6 rounded-md"
              style={{ backgroundColor: color }}
            ></div>
          )}
         {icon && (
            <div className="ml-2">
              {icon}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Layers;
