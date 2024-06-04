import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import bicycle from "../../../public/animations/Bicycle.json";
import car from "../../../public/animations/Car.json";
import walking from "../../../public/animations/Running.json";

interface TravelModeDropdownProps {
  travelMode: string;
  setTravelMode: (mode: string) => void;
}

export interface TravelModeDropdownHandle {
  toggleDropdown: () => void;
}

const TravelModeDropdown = forwardRef<TravelModeDropdownHandle, TravelModeDropdownProps>(
  ({ travelMode, setTravelMode }, ref) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const travelOptions = [
      { mode: 'driving', label: 'Driving', animationData: car, mainSize: { height: "60px", width: "60px" }, dropdownSize: { height: "30px", width: "30px" } },
      { mode: 'walking', label: 'Walking', animationData: walking, mainSize: { height: "50px", width: "50px", marginLeft: "10px" }, dropdownSize: { height: "25px", width: "25px" } },
      { mode: 'bicycling', label: 'Bicycling', animationData: bicycle, mainSize: { height: "70px", width: "70px" }, dropdownSize: { height: "35px", width: "35px" } },
    ];

    const currentOption = travelOptions.find(option => option.mode === travelMode);
    const otherOptions = travelOptions.filter(option => option.mode !== travelMode);

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    useEffect(() => {
      if (dropdownOpen) {
        document.addEventListener("mousedown", handleClickOutside, { passive: true });
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [dropdownOpen]);

    useImperativeHandle(ref, () => ({
      toggleDropdown: () => setDropdownOpen(prev => !prev),
    }));

    return (
      <div className="relative flex-shrink-0" ref={dropdownRef}>
        <div onClick={() => setDropdownOpen(!dropdownOpen)} className="cursor-pointer">
          <Lottie
            animationData={currentOption?.animationData}
            style={{
              ...currentOption?.mainSize,
              transition: "all 0.3s ease-in-out",
            }}
          />
        </div>
        {dropdownOpen && (
          <div className="absolute top-12 left-0 bg-white border border-gray-200 rounded shadow-lg z-10 transition-opacity duration-300 ease-in-out" style={{ opacity: dropdownOpen ? 1 : 0 }}>
            {otherOptions.map(option => (
              <div key={option.mode} onClick={() => { setTravelMode(option.mode); setDropdownOpen(false); }} className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                <Lottie animationData={option.animationData} style={{ ...option.dropdownSize, transition: "all 0.3s ease-in-out" }} />
                <span className="ml-2">{option.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

TravelModeDropdown.displayName = "TravelModeDropdown";

export default TravelModeDropdown;
