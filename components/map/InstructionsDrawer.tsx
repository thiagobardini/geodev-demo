import React, { useState, useEffect, useRef } from "react";
import { X, Info, MapPin, Locate } from "lucide-react";
import Places from "./Places";
import Tooltip from "@/components/shared/tooltip";
import Layers from "./Layers";
import useMediaQuery from "@/lib/hooks/use-media-query";
import Image from "next/image";
import VersionModal from "./version-modal";
import TravelModeDropdown, {
  TravelModeDropdownHandle,
} from "./shared/TravelModeDropdown";
import { formatDuration } from "@/lib/utils";
import UserPin from "./map-styles/userPin";

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
  layerVisibility,
  toggleLayerVisibility,
  distance,
  duration,
  travelMode,
  setTravelMode,
}) => {
  const { isMobile } = useMediaQuery();
  const [isOpen, setIsOpen] = useState(false);
  const [showVersionModal, setShowVersionModal] = useState(true);
  const dropdownRef = useRef<TravelModeDropdownHandle>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsOpen(!isMobile);
  }, [isMobile]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobile &&
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isMobile) {
      document.addEventListener("mousedown", handleClickOutside, {
        passive: true,
      });
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobile]);

  const handleRedirect = () => {
    if (start && end) {
      const url = `https://www.google.com/maps/dir/?api=1&origin=${start[1]},${start[0]}&destination=${end[1]},${end[0]}&travelmode=${travelMode}`;
      window.open(url, "_blank");
    }
  };

  useEffect(() => {
    getRoute();
  }, [travelMode, getRoute]);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStart([position.coords.longitude, position.coords.latitude]);
        },
        (error) => {
          console.error("Error getting user location: ", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <>
      <div
        ref={drawerRef}
        className={`fixed left-0 top-[64px] z-20 h-full transform transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-2/3 bg-[#1b1f23] shadow-lg sm:w-80 rounded-r-lg`}
      >
        <Header onClose={() => setIsOpen(false)} />
        <div className="h-full min-h-screen overflow-y-auto p-4">
          <LayersSection
            layerVisibility={layerVisibility}
            toggleLayerVisibility={toggleLayerVisibility}
          />
          <Divider />
          <DirectionsSection
            setStart={setStart}
            setEnd={setEnd}
            start={start}
            end={end}
            getUserLocation={getUserLocation}
          />
          <DraggableMarkersSection />

          <section className="relative my-4">
            <div className="flex items-center">
              <h3 className="text-white">Travel Mode</h3>
              <Tooltip content="Select the mode of travel. Options are driving, walking, and bicycling.">
                <Info className="ml-2 h-5 w-5 text-gray-400" />
              </Tooltip>
            </div>
            <div className="flex h-auto items-center space-x-2 ">
              <div className="min-w-[70px]">
                <div className="absolute top-[25px]">
                  <TravelModeDropdown
                    travelMode={travelMode}
                    setTravelMode={setTravelMode}
                    ref={dropdownRef}
                  />
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <RouteInfo
                  distance={distance}
                  duration={duration}
                  onClick={() => dropdownRef.current?.toggleDropdown()}
                  isMobile={isMobile}
                />
              </div>
            </div>
          </section>
          <section className="mt-6">
            <OpenInGoogleMapsButton onClick={handleRedirect} />
          </section>
          <VersionInfo onClick={() => setShowVersionModal(true)} />
        </div>
        {!isOpen && <OpenDrawerButton onClick={() => setIsOpen(true)} />}
      </div>
      {showVersionModal && (
        <VersionModal
          showModal={showVersionModal}
          setShowModal={setShowVersionModal}
        />
      )}
    </>
  );
};

const Header: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="relative flex items-center justify-between bg-[#282c34] p-4 rounded-t-lg">
    <h2 className="text-lg font-semibold text-white">Instructions</h2>
    <button onClick={onClose} className="absolute right-3 top-5 text-white">
      <X className="h-6 w-6" />
    </button>
  </div>
);

const LayersSection: React.FC<{
  layerVisibility: { [key: string]: string };
  toggleLayerVisibility: (layerId: string) => void;
}> = ({ layerVisibility, toggleLayerVisibility }) => (
  <section className="drawer-section">
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
  </section>
);

const Divider: React.FC = () => (
  <div className="my-6 flex items-center">
    <div className="flex-grow border-t border-gray-700"></div>
  </div>
);

const DirectionsSection: React.FC<{
  setStart: (point: Coordinates) => void;
  setEnd: (point: Coordinates) => void;
  start: [number, number];
  end: [number, number];
  getUserLocation: () => void;
}> = ({ setStart, setEnd, start, end, getUserLocation }) => (
  <section className="mt-2">
    <div className="flex items-center">
      <h3 className="text-white">Directions</h3>
      <Tooltip content="You can change the start point and end point by entering the locations in the inputs below.">
        <Info className="ml-2 h-5 w-5 text-gray-400" />
      </Tooltip>
    </div>
    <div className="flex items-center">
      <Places
        placeholder={`Current: ${start[1].toFixed(6)}, ${start[0].toFixed(6)}`}
        setEnd={(point: Coordinates) => setStart(point)}
      />
      <button
        onClick={getUserLocation}
        className="ml-2 p-2 rounded bg-[#ff8c00] text-white hover:bg-[#ffa733]"
      >
        <Locate className="w-5 h-5" />
      </button>
    </div>
    <Places
      placeholder={`Current: ${end[1].toFixed(6)}, ${end[0].toFixed(6)}`}
      setEnd={(point: Coordinates) => setEnd(point)}
    />
  </section>
);

const DraggableMarkersSection: React.FC = () => (
  <section className="pt-2">
    <div className="flex items-center">
      <h3 className="text-white">Draggable Markers</h3>
      <Tooltip content="Drag the markers to change the start and end points.">
        <Info className="ml-2 h-5 w-5 text-gray-400" />
      </Tooltip>
    </div>
    <div className="mt-2 flex items-center justify-start gap-4">
      <div className="flex items-center mr-1">
        <UserPin text="Start Point" tooltip={false} />
        <div className="h-fit rounded-md text-white">Start Point</div>
      </div>
      <div className="flex items-center mr-1">
        <UserPin text="End Point" tooltip={false} />
        <div className="h-fit rounded-md text-white">End Point</div>
      </div>
    </div>
  </section>
);

const RouteInfo: React.FC<{
  distance: number;
  duration: number;
  onClick: () => void;
  isMobile?: boolean;
}> = ({ distance, duration, onClick, isMobile }) => (
  <div onClick={onClick} className="mt-4 cursor-pointer text-sm text-white">
    {isMobile ? (
      <>
        <p>Dist: {(distance / 1609.34).toFixed(2)} mi</p>
        <p>Dur: {formatDuration(duration, true)}</p>
      </>
    ) : (
      <>
        <p>Distance: {(distance / 1609.34).toFixed(2)} miles</p>
        <p>Duration: {formatDuration(duration)}</p>
      </>
    )}
  </div>
);

const OpenInGoogleMapsButton: React.FC<{ onClick: () => void }> = ({
  onClick,
}) => (
  <button
    onClick={onClick}
    className="mt-2 w-full flex items-center justify-center rounded-md bg-[#ff8c00] p-2 text-sm text-white hover:bg-[#ffa733]"
  >
    <MapPin className="w-5 h-5 mr-2" />
    Open in Google Maps
  </button>
);

const VersionInfo: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const [versionLabel, setVersionLabel] = useState<string>("");

  useEffect(() => {
    const fetchVersionLabel = async () => {
      const response = await fetch("/data/versionTexts.json");
      const data = await response.json();
      setVersionLabel(data.versionLabel);
    };

    fetchVersionLabel();
  }, []);

  return (
    <div
      className="mt-8 mb-[124px] cursor-pointer text-center text-sm font-semibold text-white underline pb-40 sm:pb-0"
      onClick={onClick}
    >
      {versionLabel ? versionLabel : "Loading..."}
    </div>
  );
};

const OpenDrawerButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    onClick={onClick}
    className={`absolute -right-12 top-[45vh] h-12 w-12 -translate-y-1/2 transform rounded-r-md bg-[#1b1f23] text-center shadow-md`}
    style={{ boxShadow: "0 0 0 2px rgba(0, 0, 0, .1)" }}
  >
    <Image
      src="/icons/filter-icon-white.svg"
      alt="Filter Icon"
      width={42}
      height={42}
    />
  </button>
);

export default InstructionsDrawer;
