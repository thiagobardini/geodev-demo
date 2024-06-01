import { FC, Dispatch, SetStateAction } from "react";
import Modal from "@/components/shared/modal";
import Image from "next/image";

interface VersionModalProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

const VersionModal: FC<VersionModalProps> = ({ showModal, setShowModal }) => {
  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <div className="z-50 max-h-screen w-full overflow-y-auto bg-white shadow-xl md:max-w-lg md:rounded-2xl md:border md:border-gray-200">
        <div className="relative p-4 md:p-6">
          <div className="absolute left-2 top-3 text-sm font-semibold text-gray-600">
            Version 2.0
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
          <h2 className="mb-4 text-center text-xl font-bold text-gray-800 md:text-2xl">
            Versions Overview
          </h2>

          <div className="space-y-6">
            <details className="rounded-md border border-gray-200 p-3">
              <summary className="cursor-pointer text-lg font-semibold text-gray-700 md:text-xl">
                Implemented Features:
              </summary>
              <div className="mt-2">
                <ul className="mt-2 list-inside list-disc text-sm text-gray-600 md:text-base">
                  <li>User signup/signin</li>
                  <li>Pin on the map for start and end points</li>
                  <li>Search input for start and end points</li>
                  <li>Legend: Show/hide trails</li>
                  <li>Types of routes: Driving, walking, cycling</li>
                  <li>Mobile and desktop views</li>
                  <li>Button to open the route on Google Maps</li>
                </ul>
              </div>
            </details>

            <details open className="rounded-md border border-gray-200 p-3">
              <summary className="cursor-pointer text-lg font-semibold text-gray-700 md:text-xl">
                Current Features:
              </summary>
              <div className="mt-2">
                <h3 className="text-md font-semibold text-gray-700 md:text-lg">
                  Version 2:
                </h3>
                <ul className="mt-2 list-inside list-disc text-sm text-gray-600 md:text-base">
                  <li>
                    Pin and display a popup card with the main entrance
                    bike/walking trails in Massachusetts
                  </li>
                  <li>Layer: Show/hide trail entrances</li>
                  <li>Show trail entrances name when approaching the pin</li>
                  <li>UI improvements</li>
                </ul>
              </div>
            </details>

            <details className="rounded-md border border-gray-200 p-3">
              <summary className="cursor-pointer text-lg font-semibold text-gray-700 md:text-xl">
                Upcoming Features:
              </summary>
              <div className="mt-2">
                <div className="mb-4 md:mb-6">
                  <h3 className="text-md font-semibold text-gray-700 md:text-lg">
                    Version 3:
                  </h3>
                  <ul className="mt-2 list-inside list-disc text-sm text-gray-600 md:text-base">
                    <li>
                      After signing in, you will be able to save your best
                      routes with start and end points
                    </li>
                    <li>
                      After signing in, you will be able to save entrance
                      bike/walking trails
                    </li>
                    <li>
                      On the dashboard, you can visualize all your saved routes
                      for different types: driving, walking, cycling
                    </li>
                    <li>UI improvements</li>
                  </ul>
                </div>
              </div>
            </details>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default VersionModal;
