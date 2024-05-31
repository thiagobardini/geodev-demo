import WebVitals from "./web-vitals";
import MultiLineChart from "@/components/charts/multi-line-chart";
import Image from "next/image";

const demoTech = (
  <div className="grid grid-flow-col grid-rows-3 gap-10 p-10">
    <span className="font-mono font-semibold">Typescript</span>
    <span className="font-mono font-semibold">React</span>
    <span className="font-mono font-semibold">Mapbox API</span>
    <span className="font-mono font-semibold">Mapbox Studio</span>
    <span className="font-mono font-semibold">Mapbox GL JS</span>
    <span className="font-mono font-semibold">Geospatial data</span>
    <span className="font-mono font-semibold">D3.js</span>
    <span className="font-mono font-semibold">Prisma - ORM</span>
    <span className="font-mono font-semibold">Postgres</span>
    <span className="font-mono font-semibold">NextAuth</span>
    <span className="font-mono font-semibold">Vercel</span>
    <span className="font-mono font-semibold">Framer Motion</span>
  </div>
);

export const content = [
  {
    title: "TrailMap",
    description: "Metro Boston's Regional Walking and Cycling Map",
    demo: (
      <Image
        alt="TrailMap Demo"
        src="/gif/trailmap.gif"
        objectFit="cover"
        fill={true}
      />
    ),
    large: true,
    isNotMobileModal: true,
    mapName: "trailmap",
    modal: "",
  },
  {
    title: "D3.js integration",
    description: "Showcasing my skills by integrating D3.js.",
    demo: <WebVitals />,
    large: false,
    isNotMobileModal: false,
    mapName: "",
    modal: (
      <>
        <div className="relative mx-auto flex h-[141px] max-w-full flex-col items-center justify-center bg-gray-50 pt-2 text-center">
          <h2 className="bg-gradient-to-br from-black to-stone-500 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent drop-shadow-md md:text-4xl">
            D3.js integration
          </h2>
          <h3 className="mt-2 text-lg font-medium text-gray-600 md:text-xl">
            Showcasing my skills by integrating D3.js.
          </h3>
        </div>
        <div className="flex justify-center">
          <MultiLineChart />
        </div>
      </>
    ),
  },
  {
    title: "Core Skills",
    description: "Key Technologies Utilized in This Project",
    demo: demoTech,
    large: true,
    isNotMobileModal: false,
    mapName: "",
    modal: (
      <>
        <div className="relative mx-auto flex h-[141px] max-w-full flex-col items-center justify-center bg-gray-50 pt-2 text-center">
          <h2 className="bg-gradient-to-br from-black to-stone-500 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent drop-shadow-md md:text-4xl">
            Core Skills
          </h2>
          <h3 className="mt-2 text-lg font-medium text-gray-600 md:text-xl">
            Key Technologies Utilized in This Project
          </h3>
        </div>
        {demoTech}
      </>
    ),
  },
];
