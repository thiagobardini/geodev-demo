import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Instructions from './Instructions';
import Places from './Places';

const InstructionsDrawer = ({ steps, setEnd }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`fixed top-0 left-0 h-full z-50 transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} bg-slate-800 shadow-lg w-80`}>
      <div className="flex items-center justify-between p-4 bg-slate-900">
        <h2 className="text-lg font-semibold text-white">Instructions</h2>
        <button onClick={() => setIsOpen(false)}>
          <X className="w-6 h-6 text-white" />
        </button>
      </div>
      <div className="p-4">
        <Places setEnd={setEnd} />
        <div className="mt-4 overflow-y-auto max-h-[calc(100vh-64px)]">
          {steps.map((item, i) => (
            <Instructions key={i} no_={i + 1} step={item.maneuver.instruction} />
          ))}
        </div>
      </div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-1/2 -right-8 transform -translate-y-1/2 bg-slate-900 text-white p-2 rounded-r-md shadow-md"
      >
        {isOpen ? <ChevronLeft /> : <ChevronRight />}
      </button>
    </div>
  );
};

export default InstructionsDrawer;
