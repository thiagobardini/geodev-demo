import React from "react";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

function UserPin({
  text,
  tooltip = true,
  size = "30px",
}: {
  text: string;
  tooltip?: boolean;
  size?: string;
}) {
  const bgColor = text === "End Point" ? "bg-red-100" : "bg-green-100";

  const animationData =
    text === "End Point"
      ? require("@/components/animations/end-point.json")
      : require("@/components/animations/start-point.json");

  return (
    <div className="group relative flex items-center justify-center z-50">
      {tooltip && (
        <div
          className={`absolute w-auto max-w-fit rounded-md text-xs font-bold text-gray-800 ${bgColor} -top-4 -translate-y-1/2 translate-x-[0px] transform whitespace-nowrap p-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
        >
          {text}
        </div>
      )}
      <Lottie
        animationData={animationData}
        loop={true}
        initialSegment={[20, 117]}
        style={{
          height: size,
          width: size,
          paddingBottom: "5px",
          transition: "all 0.3s ease-in-out",
        }}
      />
    </div>
  );
}

export default UserPin;
