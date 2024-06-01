"use client";

import { useState } from "react";
import Card from "@/components/shared/card";
import Modal from "@/components/shared/modal";
import { content } from "./homeContent";
import { useRouter } from "next/navigation";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  const router = useRouter();

  const openModal = (content: React.ReactNode) => {
    if (content !== "") {
      setModalContent(content);
      setShowModal(true);
    }
  };

  return (
    <>
      <div className="z-10 w-full max-w-xl px-5 pt-[120px] xl:px-0">
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
        {content.map(({ title, description, demo, large, modal, mapName }) => (
          <Card
            key={title}
            title={title}
            description={description}
            demo={demo}
            large={large}
            onClick={() => {
              modal === "" ? router.push(`/map/${mapName}`) : openModal(modal);
            }}
          />
        ))}
      </div>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        className="mt-24 h-full max-w-full"
      >
        <div>{modalContent}</div>
      </Modal>
    </>
  );
}
