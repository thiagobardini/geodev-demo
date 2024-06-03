import React, { useRef } from "react";
import { formatDuration } from "@/lib/utils";
import TravelModeDropdown, { TravelModeDropdownHandle } from "./shared/TravelModeDropdown";
import classes from "./Map.module.css";

interface HeaderProps {
  travelMode: string;
  setTravelMode: (mode: string) => void;
  distance: number;
  duration: number;
}

const Header: React.FC<HeaderProps> = ({ travelMode, setTravelMode, distance, duration }) => {
  const dropdownRef = useRef<TravelModeDropdownHandle>(null);

  const RouteInfo: React.FC<{ distance: number; duration: number }> = ({ distance, duration }) => (
    <div onClick={() => dropdownRef.current?.toggleDropdown()} className="text-sm flex items-center justify-center gap-2 cursor-pointer">
      <p className="hidden sm:block">Distance: {(distance / 1609.34).toFixed(2)} miles</p>
      <p className="block sm:hidden">Dist: {(distance / 1609.34).toFixed(2)} mi</p>
      <span style={{color: "#e0e0e0"}}>|</span>
      <p className="hidden sm:block">Duration: {formatDuration(duration)}</p>
      <p className="block sm:hidden">Dur: {formatDuration(duration, true)}</p>
    </div>
  );

  return (
    <section className="fixed left-0 right-0 top-0 z-20 flex flex-col items-center justify-center px-4 pt-[64px] mt-1">
      <div className="flex items-center justify-center w-full">
        <div className="w-full max-w-screen-lg border-y-2 border-y-indigo-600 bg-opacity-50">
          <div className="flex h-auto items-center justify-center space-x-2 border-x border-b border-gray-200 bg-white/50 bg-opacity-50 px-2 text-black backdrop-blur-xl">
            <h1 className="text-2xl font-bold">TrailMap</h1>
            <div className={classes.divider}></div>
            <h2 className="text-sm">Metro Boston's Regional Walking and Cycling Map</h2>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center w-full mt-2 h-[70px]">
        <div className="w-full max-w-screen-sm border-b-2 bg-opacity-50">
          <div className="relative flex h-auto items-center justify-center space-x-2 border-x border-b border-gray-200 bg-white/50 bg-opacity-50 px-2 text-black backdrop-blur-xl">
            <TravelModeDropdown travelMode={travelMode} setTravelMode={setTravelMode} ref={dropdownRef} />
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-sm font-bold">{travelMode.charAt(0).toUpperCase() + travelMode.slice(1)} Travel Mode</h2>
              <RouteInfo distance={distance} duration={duration} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
