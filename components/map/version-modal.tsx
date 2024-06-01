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
      <div className="w-full max-h-screen overflow-y-auto z-50 shadow-xl md:max-w-lg md:rounded-2xl md:border md:border-gray-200 bg-white">
        <div className="relative p-4 md:p-6">
          <div className="absolute top-3 left-2 text-sm font-semibold text-gray-600">
            Version 1.7
          </div>
          <div className="flex justify-center mb-4">
            <Image
              src="/images/tbtag.png"
              alt="GeoDev 2021"
              width="100"
              height="100"
              className="rounded-full border-2 border-gray-200"
            />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 text-center">Current and Upcoming Versions</h2>

          <div className="space-y-6">
            <details open className="border border-gray-200 p-3 rounded-md">
              <summary className="cursor-pointer text-lg md:text-xl font-semibold text-gray-700">Current Version:</summary>
              <div className="mt-2">
                <h3 className="text-md md:text-lg font-semibold text-gray-700">Version 1 (Implemented):</h3>
                <ul className="list-disc list-inside mt-2 text-gray-600 text-sm md:text-base">
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

            <details className="border border-gray-200 p-3 rounded-md">
              <summary className="cursor-pointer text-lg md:text-xl font-semibold text-gray-700">Upcoming Versions:</summary>
              <div className="mt-2">
                <div className="mb-4 md:mb-6">
                  <h3 className="text-md md:text-lg font-semibold text-gray-700">Version 2:</h3>
                  <ul className="list-disc list-inside mt-2 text-gray-600 text-sm md:text-base">
                    <li>Pin and display a popup card with the main entrance bike/walking trails in Massachusetts</li>
                    <li>UI improvements</li>
                  </ul>
                </div>

                <div className="mb-4 md:mb-6">
                  <h3 className="text-md md:text-lg font-semibold text-gray-700">Version 3:</h3>
                  <ul className="list-disc list-inside mt-2 text-gray-600 text-sm md:text-base">
                    <li>After signing in, you will be able to save your best routes with start and end points</li>
                    <li>After signing in, you will be able to save entrance bike/walking trails</li>
                    <li>On the dashboard, you can visualize all your saved routes for different types: driving, walking, cycling</li>
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
