import React from "react";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

function UserPin({ text, tooltip = true }: { text: string, tooltip?: boolean }) {
  const bgColor = text === "End Point" ? "bg-red-100" : "bg-green-100";

  const animationData = text === "End Point"
    ? require('@/components/animations/end-point.json')
    : require('@/components/animations/start-point.json');

  return (
    <div className="relative flex items-center justify-center group">
      {tooltip && (
        <div
          className={`absolute font-bold w-auto max-w-fit text-xs text-gray-800 rounded-md ${bgColor} p-1 -top-4 transform translate-x-[0px] -translate-y-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        >
          {text}
        </div>
      )}
      <Lottie
        animationData={animationData}
        loop={true}
        initialSegment={[20, 117]}
        style={{
          height: "40px",
          width: "40px",
          paddingBottom: "5px",
          transition: "all 0.3s ease-in-out",
        }}
      />
    </div>
  );
}

export default UserPin;
