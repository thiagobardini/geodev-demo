import React from "react";
import useMediaQuery from "@/lib/hooks/use-media-query";
import Image from "next/image";

interface MapStyleSelectorProps {
  mapStyle: string;
  setMapStyle: (style: string) => void;
}

const MapStyleSelector: React.FC<MapStyleSelectorProps> = ({
  mapStyle,
  setMapStyle,
}) => {
  const { isMobile } = useMediaQuery();

  const mapStyles = [
    {
      style: process.env.NEXT_PUBLIC_MAPBOX_STYLE_MONOCHROME as string,
      label: "Mono",
      image: "/images/monochrome.png",
    },
    {
      style: process.env.NEXT_PUBLIC_MAPBOX_STYLE_OUTDOOR as string,
      label: "Outdoor",
      image: "/images/outdoors.png",
    },
    {
      style: process.env.NEXT_PUBLIC_MAPBOX_STYLE_STREETS as string,
      label: "Satellite",
      image: "/images/satellite.png",
    },
  ];

  return (
    <div className="grid w-full grid-cols-3 gap-2">
      {mapStyles.map((option) => (
        <div
          key={option.style}
          className={`relative cursor-pointer ${
            mapStyle === option.style ? "border-4 border-blue-600" : "border-2 border-gray-500"
          }`}
          onClick={() => setMapStyle(option.style)}
          style={{
            width: "100%",
            height: "70px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <Image
            unoptimized
            alt={option.label}
            src={option.image}
            layout="fill"
            objectFit="cover"
            style={{
              transition: "border 0.3s ease-in-out",
            }}
            className="opacity-70"
          />
          <span className="absolute text-sm text-white">{option.label}</span>
        </div>
      ))}
    </div>
  );
};

export default MapStyleSelector;
