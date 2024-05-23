"use client";

import { useState } from "react";
import Card from "@/components/shared/card";
import Map from "@/app/map/page";
import Modal from "@/components/shared/modal";
import WebVitals from "./web-vitals";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  const openModal = (content: React.ReactNode) => {
    setModalContent(content);
    setShowModal(true);
  };

  return (
    <>
      <div className="z-10 w-full max-w-xl px-5 xl:px-0">
        <h1
          className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] md:text-7xl md:leading-[5rem]"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          Full-Stack GeoDev
        </h1>
        <p
          className="mt-6 animate-fade-up text-center text-gray-500 opacity-0  md:text-xl"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          Designing Digital Tools for Urban Planning and Public Policy
        </p>
      </div>
      <div className="my-10 grid w-full max-w-screen-xl animate-fade-up grid-cols-1 gap-5 px-5 md:grid-cols-3 xl:px-0">
        {features.map(({ title, description, demo, large, modal }) => (
          <Card
            key={title}
            title={title}
            description={description}
            demo={demo}
            large={large}
            onClick={() => openModal(modal)}
          />
        ))}
      </div>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        className="max-h-[calc(100vh-100px)] max-w-full"
      >
        <div className="h-full">{modalContent}</div>
      </Modal>
    </>
  );
}

const demoTech = (
  <div className="grid grid-flow-col grid-rows-3 gap-10 p-10">
    <span className="font-mono font-semibold">Typescript</span>
    <span className="font-mono font-semibold">React</span>
    <span className="font-mono font-semibold">Mapbox API</span>
    <span className="font-mono font-semibold">Mapbox Studio</span>
    <span className="font-mono font-semibold">Mapbox GL JS</span>
    <span className="font-mono font-semibold">Geospatial data</span>
    <span className="font-mono font-semibold">Prisma - ORM</span>
    <span className="font-mono font-semibold">Postgres</span>
    <span className="font-mono font-semibold">NextAuth</span>
    <span className="font-mono font-semibold">Vercel</span>
  </div>
);

const features = [
  {
    title: "Mapbox integration",
    description: "Showcasing my skills by integrating Mapbox.",
    demo: <Map />,
    large: true,
    modal: <Map />,
  },
  {
    title: "D3.js integration",
    description: "Showcasing my skills by integrating D3.js.",
    demo: <WebVitals />,
    large: false,
    modal: <Map />,
  },
  {
    title: "Core Skills",
    description: "Key Technologies Utilized in This Project",
    demo: demoTech,
    large: true,
    modal: demoTech,
  },
];
