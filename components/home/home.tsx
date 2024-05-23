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
          Maps
        </h1>
        <p
          className="mt-6 animate-fade-up text-center text-gray-500 opacity-0 [text-wrap:balance] md:text-xl"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          Showcasing my skills by integrating Mapbox, D3.js, and Airtable
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
      <Modal showModal={showModal} setShowModal={setShowModal} className="max-w-full max-h-[calc(100vh-100px)]">
        <div className="h-full">{modalContent}</div>{" "}
        {/* Adicionado classe h-full */}
      </Modal>
    </>
  );
}

const features = [
  {
    title: "Mapbox Integration",
    description: "Showcasing my skills by integrating Mapbox.",
    demo: <Map />,
    large: false,
    modal: <Map />,
  },
  {
    title: "D3.js Integration",
    description: "Showcasing my skills by integrating D3.js.",
    demo: <WebVitals />,
    large: false,
    modal: <Map />,
  },
  {
    title: "Airtable Integration",
    description: "Showcasing my skills by integrating Airtable.",
    demo: <Map />,
    large: false,
    modal: <Map />,
  },
];
