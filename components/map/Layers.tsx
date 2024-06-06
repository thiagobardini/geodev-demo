import React from "react";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

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
    label: "Park Multi-Use Trail Entrances",
    pin: require("@/components/animations/shared-pin.json"),
    size: 65,
    right: "12px",
  },
  {
    id: "bikeParkTrails",
    label: "Park Bike-Only Trails",
    pin: require("@/components/animations/bike-pin.json"),
    size: 50,
  },
  {
    id: "walkingParkTrails",
    label: "Park Walking-Only Trails",
    pin: require("@/components/animations/walking-pin.json"),
    size: 50,
  },
];

const Layers: React.FC<LayersProps> = ({
  layerVisibility,
  toggleLayerVisibility,
}) => {
  const handleChange = (layerId: string) => () => {
    toggleLayerVisibility(layerId);
  };

  return (
    <div className="mt-1">
      {layersConfig.map(({ id, label, color, pin, size, right = 20 }) => (
        <div key={id} className="xs:pt-0 relative flex items-center sm:pt-2">
          <div className="flex h-[40px]  items-center sm:h-6">
            <input
              id={id}
              onChange={handleChange(id)}
              name={id}
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              checked={layerVisibility[id] === "visible"}
            />
          </div>
          <div className="ml-3 flex items-center text-sm leading-6 sm:h-6">
            <label htmlFor={id} className="font-medium text-white">
              {label}
            </label>
            {color && (
              <div
                className="ml-2 h-2 w-6"
                style={{ backgroundColor: color }}
              ></div>
            )}
            {pin && (
              <>
                <div className="w-20"></div>
                <Lottie
                  animationData={pin}
                  loop={true}
                  style={{
                    height: size,
                    width: size,
                    marginLeft: "0px",
                    position: "absolute",
                    right: right,
                  }}
                />
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Layers;
