import React, { useRef } from "react";
import { formatDuration } from "@/lib/utils";
import TravelModeDropdown, {
  TravelModeDropdownHandle,
} from "./shared/TravelModeDropdown";

interface HeaderProps {
  travelMode: string;
  setTravelMode: (mode: string) => void;
  distance: number;
  duration: number;
}

const Header: React.FC<HeaderProps> = ({
  travelMode,
  setTravelMode,
  distance,
  duration,
}) => {
  const dropdownRef = useRef<TravelModeDropdownHandle>(null);

  const RouteInfo: React.FC<{ distance: number; duration: number }> = ({
    distance,
    duration,
  }) => (
    <div
      onClick={() => dropdownRef.current?.toggleDropdown()}
      className="flex cursor-pointer items-center justify-center gap-2 text-sm"
    >
      <p className="hidden sm:block">
        Distance: {(distance / 1609.34).toFixed(2)} miles
      </p>
      <p className="block sm:hidden">
        Dist: {(distance / 1609.34).toFixed(2)} mi
      </p>
      <span style={{ color: "#e0e0e0" }}>|</span>
      <p className="hidden sm:block">Duration: {formatDuration(duration)}</p>
      <p className="block sm:hidden">Dur: {formatDuration(duration, true)}</p>
    </div>
  );

  return (
    <section className="fixed left-0 right-0 top-0 z-20 mt-1 flex flex-col items-center justify-center px-4 pt-[64px]">
      <div className="flex w-full items-center justify-center">
        <div className="w-full max-w-screen-lg border-y-2 border-y-indigo-600 bg-opacity-50">
          <div className="flex h-auto items-center justify-center space-x-2 border-x border-b border-gray-200 bg-white/50 bg-opacity-50 px-2 text-black backdrop-blur-xl">
            <h1 className="text-2xl font-bold">TrailMap</h1>
            <div className="divider"></div>
            <h2 className="text-sm">
              Metro Boston&#39;s Regional Walking and Cycling Map
            </h2>
          </div>
        </div>
      </div>

      <div className="mt-1 flex h-full w-full items-center justify-center">
        <div className="w-full max-w-screen-sm border-b-2 bg-opacity-50">
          <div className="relative flex h-[50px] items-center justify-center space-x-2 border-x border-b border-gray-200 bg-white/50 bg-opacity-50 px-2 text-black backdrop-blur-xl">
            <div className="min-w-[70px]">
              <div className="absolute top-[-3px]">
                <TravelModeDropdown
                  travelMode={travelMode}
                  setTravelMode={setTravelMode}
                  ref={dropdownRef}
                />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-sm font-bold">
                {travelMode.charAt(0).toUpperCase() + travelMode.slice(1)}{" "}
                Travel Mode
              </h2>
              <RouteInfo distance={distance} duration={duration} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
