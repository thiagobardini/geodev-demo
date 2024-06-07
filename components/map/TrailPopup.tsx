import React from "react";
import { Popup } from "react-map-gl";
import Image from "next/image";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { ArrowRight, Info, CheckCircle } from "lucide-react";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

type Coordinates = [number, number];

type Properties = {
  name: string;
  activities: string[];
  imageUrl: string;
  url: string;
};

type Geometry = {
  coordinates: Coordinates;
};

type PopupInfo = {
  geometry: Geometry;
  properties: Properties;
};

type ImageWithFallbackProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
};

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  width,
  height,
  className,
}) => (
  <React.Suspense fallback={<LoadingSpinner />}>
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  </React.Suspense>
);

type TrailPopupProps = {
  popupInfo: PopupInfo | null;
  onClose: () => void;
  connectToEndpoint: (coordinates: Coordinates) => void;
};

const TrailPopup: React.FC<TrailPopupProps> = ({
  popupInfo,
  onClose,
  connectToEndpoint,
}) => {
  if (!popupInfo) return null;

  return (
    <Popup
      longitude={popupInfo.geometry.coordinates[0]}
      latitude={popupInfo.geometry.coordinates[1]}
      onClose={onClose}
      closeOnClick={false}
      closeButton={false}
      anchor="top"
      className="custom-popup" 
    >
      <div className="max-w-xs p-3 bg-blue-50 border-2 border-blue-200 rounded-lg shadow-md">
        <h3 className="mb-1 text-lg font-semibold text-blue-800">
          {popupInfo.properties.name}
        </h3>
        <p className="mb-2 flex items-center text-sm text-gray-600">
          <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
          {popupInfo.properties.activities.join(", ")} allowed
        </p>
        <div className="my-2">
          <ImageWithFallback
            src={popupInfo.properties.imageUrl.replace("./", "/")}
            alt={popupInfo.properties.name}
            className="rounded-md"
            width={200}
            height={100}
          />
        </div>
        <div className="flex justify-between mt-2">
          <a
            href={popupInfo.properties.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
          >
            <Info className="w-4 h-4 mr-1" />
            More info
          </a>
          <div
            className="flex cursor-pointer items-center text-blue-600 hover:text-blue-800"
            onClick={() => connectToEndpoint(popupInfo.geometry.coordinates)}
          >
            <Lottie
              animationData={require("@/components/animations/end-point.json")}
              loop={true}
              initialSegment={[20, 117]}
              style={{
                height: 20,
                width: 20,
                marginRight: "5px",
              }}
            />
            <span className="text-sm">Directions</span>
            <ArrowRight className="w-5 h-5 ml-1" />
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default TrailPopup;
