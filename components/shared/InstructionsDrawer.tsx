import React, { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Instructions from "./Instructions";
import Places from "./Places";

interface InstructionsDrawerProps {
  steps: Array<{ maneuver: { instruction: string } }>;
  setStart: (point: string) => void;
  setEnd: (point: string) => void;
}

const InstructionsDrawer: React.FC<InstructionsDrawerProps> = ({ steps, setStart, setEnd }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`fixed left-0 top-0 z-50 h-full transform transition-transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } w-80 bg-slate-800 shadow-lg`}
    >
      <div className="flex items-center justify-between bg-slate-900 p-4">
        <h2 className="text-lg font-semibold text-white">Instructions</h2>
        <button onClick={() => setIsOpen(false)}>
          <X className="h-6 w-6 text-white" />
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-white">Start Point</h3>
        <Places setEnd={setStart} />
        <h3 className="mt-4 text-white">End Point</h3>
        <Places setEnd={setEnd} />
        <div className="mt-4 max-h-[calc(100vh-64px)] overflow-y-auto">
          {steps.map((item, i) => (
            <Instructions
              key={i}
              no_={i + 1}
              step={item.maneuver.instruction}
            />
          ))}
        </div>
      </div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-8 top-1/2 -translate-y-1/2 transform rounded-r-md bg-slate-900 p-2 text-white shadow-md"
      >
        {isOpen ? <ChevronLeft /> : <ChevronRight />}
      </button>
    </div>
  );
};

export default InstructionsDrawer;
