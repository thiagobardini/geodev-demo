import React from "react";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

function TrailEntrancesPin({
  text,
  tooltip,
  isTooltip = true,
  size = "30px",
  frame = [20, 117],
  className = "top-0 -translate-y-[170%] translate-x-[0px] transform whitespace-nowrap p-1 "
}: {
  text: string;
  tooltip?: string;
  isTooltip?: boolean;
  size?: string;
  frame?: [number, number];
  className?: string;
}) {
  const bgColor = text === "walking"
    ? "bg-purple-100"
    : text === "biking"
    ? "bg-blue-100"
    : "bg-green-100";

  const animationData =
    text === "walking"
      ? require("@/components/animations/walking-pin.json")
      : text === "biking"
      ? require("@/components/animations/bike-pin.json")
      : require("@/components/animations/shared-pin.json");

  return (
    <div className="group relative flex items-center justify-center">
      {isTooltip && (
        <div
          className={`absolute w-auto max-w-fit rounded-md text-xs font-bold text-gray-800 ${bgColor} ${className}  transform whitespace-nowrap p-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
        >
          {tooltip}
        </div>
      )}
      <Lottie
        animationData={animationData}
        loop={true}
        initialSegment={frame}
        style={{
          height: size,
          width: size,
          transition: "all 0.3s ease-in-out",
          position: "absolute",
        }}
      />
    </div>
  );
}

export default TrailEntrancesPin;


// import React from "react";
// import dynamic from "next/dynamic";
// import Tooltip from "@/components/shared/tooltip";

// const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

// function TrailEntrancesPin({
//   text,
//   tooltip,
//   isTooltip = true,
//   size = "30px",
//   frame = [20, 117],
//   className = "top-0 -translate-y-[170%] translate-x-[0px] transform whitespace-nowrap p-1 ",
// }: {
//   text: string;
//   tooltip?: string;
//   isTooltip?: boolean;
//   size?: string;
//   frame?: [number, number];
//   className?: string;
// }) {
//   const bgColor =
//     text === "walking"
//       ? "bg-purple-100"
//       : text === "biking"
//       ? "bg-blue-100"
//       : "bg-green-100";

//   const animationData =
//     text === "walking"
//       ? require("@/components/animations/walking-pin.json")
//       : text === "biking"
//       ? require("@/components/animations/bike-pin.json")
//       : require("@/components/animations/shared-pin.json");

//   return (
//     <>
//       {isTooltip && (
//         <Tooltip content={tooltip}>
//           <Lottie
//             animationData={animationData}
//             loop={true}
//             initialSegment={frame}
//             style={{
//               height: size,
//               width: size,
//               transition: "all 0.3s ease-in-out",
//             }}
//           />
//         </Tooltip>
//       )}
//     </>
//   );
// }

// export default TrailEntrancesPin;
