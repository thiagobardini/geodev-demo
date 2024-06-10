import React from "react";
import dynamic from "next/dynamic";
import Tooltip from "@/components/shared/tooltip";
import useMediaQuery from "@/lib/hooks/use-media-query";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const bicycle = require("@/components/animations/Bicycle.json");
const car = require("@/components/animations/Car.json");
const walking = require("@/components/animations/Running.json");

interface TravelModeButtonsProps {
  travelMode: string;
  setTravelMode: (mode: string) => void;
}

const TravelModeButtons: React.FC<TravelModeButtonsProps> = ({
  travelMode,
  setTravelMode,
}) => {
  const { isMobile } = useMediaQuery();

  const travelOptions = [
    {
      mode: "driving",
      label: "Driving",
      animationData: car,
      size: "60px",
    },
    {
      mode: "walking",
      label: "Walking",
      animationData: walking,
      size: "50px",
    },
    {
      mode: "bicycling",
      label: "Bicycling",
      animationData: bicycle,
      size: "70px",
    },
  ];

  return (
    <div className="grid w-full grid-cols-3 justify-items-center gap-4">
      {travelOptions.map((option) => (
        <div key={option.mode} className="flex flex-col items-center">
          {!isMobile ? (
            <Tooltip content={option.label}>
              <div
                onClick={() => setTravelMode(option.mode)}
                className={`cursor-pointer p-2 ${
                  travelMode === option.mode ? "border-2 border-blue-500" : ""
                }`}
                style={{
                  width: "70px",
                  height: "70px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Lottie
                  animationData={option.animationData}
                  style={{
                    height: option.size,
                    width: option.size,
                    transition: "all 0.3s ease-in-out",
                  }}
                />
              </div>
            </Tooltip>
          ) : (
            <div
              onClick={() => setTravelMode(option.mode)}
              className={`cursor-pointer p-2 ${
                travelMode === option.mode ? "border-2 border-blue-500" : ""
              }`}
              style={{
                width: "70px",
                height: "70px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Lottie
                animationData={option.animationData}
                style={{
                  height: option.size,
                  width: option.size,
                  transition: "all 0.3s ease-in-out",
                }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TravelModeButtons;
