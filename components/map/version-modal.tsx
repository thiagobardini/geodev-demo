import { FC, Dispatch, SetStateAction, useEffect, useState } from "react";
import Modal from "@/components/shared/modal";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";

interface VersionModalProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

interface VersionTexts {
  versionLabel: string;
  modalTitle: string;
  implementedFeaturesTitle: string;
  implementedFeaturesList: string[];
  currentFeaturesTitle: string;
  currentVersionLabel: string;
  currentFeaturesList: string[];
  upcomingFeaturesTitle: string;
  upcomingVersions: {
    versionLabel: string;
    featuresList: string[];
  }[];
}

const VersionModal: FC<VersionModalProps> = ({ showModal, setShowModal }) => {
  const [texts, setTexts] = useState<VersionTexts | null>(null);
  const [openSection, setOpenSection] = useState<
    "implemented" | "current" | "upcoming" | null
  >("current");

  useEffect(() => {
    const fetchTexts = async () => {
      const response = await fetch("/data/versionTexts.json");
      const data = await response.json();
      setTexts(data);
    };

    fetchTexts();
  }, []);

  const handleToggle = (section: "implemented" | "current" | "upcoming") => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  if (!texts) {
    return null;
  }

  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <div className="custom-scrollbar relative z-50 max-h-screen w-full overflow-y-auto rounded-2xl border border-gray-200 bg-white shadow-xl">
        <div className="relative p-4">
          <div className="absolute left-2 top-3 text-sm font-semibold text-gray-600">
            {texts.versionLabel}
          </div>
          <div className="mb-4 flex justify-center">
            <Image
              src="/images/tbtag.png"
              alt="GeoDev"
              width="100"
              height="100"
              className="rounded-full border-2 border-gray-200"
            />
          </div>
          <h2 className="mb-4 text-center text-xl font-bold text-gray-800">
            {texts.modalTitle}
          </h2>
        </div>

        <div className="custom-scrollbar max-h-[calc(100vh-150px)] overflow-y-auto px-4 pb-4">
          <div className="space-y-6">
            <details
              open={openSection === "implemented"}
              className="rounded-md border border-gray-200 p-3"
            >
              <summary
                className="flex cursor-pointer items-center justify-between text-lg font-semibold text-gray-700"
                onClick={(e) => {
                  e.preventDefault();
                  handleToggle("implemented");
                }}
              >
                {texts.implementedFeaturesTitle}
                {openSection === "implemented" ? (
                  <ChevronUp />
                ) : (
                  <ChevronDown />
                )}
              </summary>
              {openSection === "implemented" && (
                <div className="custom-scrollbar mt-2 max-h-60 overflow-y-auto">
                  <ul className="mt-2 list-inside list-none text-sm text-gray-600">
                    {texts.implementedFeaturesList.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </details>

            <details
              open={openSection === "current"}
              className="rounded-md border border-gray-200 p-3"
            >
              <summary
                className="flex cursor-pointer items-center justify-between text-lg font-semibold text-gray-700"
                onClick={(e) => {
                  e.preventDefault();
                  handleToggle("current");
                }}
              >
                {texts.currentFeaturesTitle}
                {openSection === "current" ? <ChevronUp /> : <ChevronDown />}
              </summary>
              {openSection === "current" && (
                <div className="custom-scrollbar mt-2 max-h-60 overflow-y-auto">
                  <h3 className="text-md font-semibold text-gray-700">
                    {texts.currentVersionLabel}
                  </h3>
                  <ul className="mt-2 list-inside list-none text-sm text-gray-600">
                    {texts.currentFeaturesList.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </details>

            <details
              open={openSection === "upcoming"}
              className="rounded-md border border-gray-200 p-3"
            >
              <summary
                className="flex cursor-pointer items-center justify-between text-lg font-semibold text-gray-700"
                onClick={(e) => {
                  e.preventDefault();
                  handleToggle("upcoming");
                }}
              >
                {texts.upcomingFeaturesTitle}
                {openSection === "upcoming" ? <ChevronUp /> : <ChevronDown />}
              </summary>
              {openSection === "upcoming" && (
                <div className="custom-scrollbar mt-2 max-h-60 overflow-y-auto">
                  {texts.upcomingVersions.map((version, index) => (
                    <div key={index} className="mb-4">
                      <h3 className="text-md font-semibold text-gray-700">
                        {version.versionLabel}
                      </h3>
                      <ul className="mt-2 list-inside list-none text-sm text-gray-600">
                        {version.featuresList.map((feature, i) => (
                          <li key={i}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </details>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default VersionModal;
