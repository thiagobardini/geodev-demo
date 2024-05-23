"use client";

import { useState } from "react";
import Link from "next/link";
import { LayoutDashboard, LogIn } from "lucide-react";
import Popover from "@/components/shared/popover";
import Image from "next/image";
import { useSignInModal } from "./sign-in-modal";

export default function UserDropdownSignIn() {
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const [openPopover, setOpenPopover] = useState(false);

  return (
    <>
      <SignInModal />
      <div className="relative inline-block text-left">
        <Popover
          content={
            <div className="w-full rounded-md bg-white p-2 sm:w-56">
              <div className="p-2">
                <p className="truncate text-sm font-medium text-gray-900">
                  Hi there,
                </p>
                <p className="truncate text-sm text-gray-500">
                Sign in to your dashboard.
                </p>
              </div>
              <button
                className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
                onClick={() => {
                  setShowSignInModal(true);
                  setOpenPopover(false); 
                }}
              >
                <LogIn className="h-4 w-4" />
                <p className="text-sm">Sign In</p>
              </button>
            </div>
          }
          align="end"
          openPopover={openPopover}
          setOpenPopover={setOpenPopover}
        >
          <button
            onClick={() => setOpenPopover(!openPopover)}
            className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-gray-300 transition-all duration-75 focus:outline-none active:scale-95 sm:h-9 sm:w-9"
          >
            <Image
              alt="Self portrait"
              src="/images/self.jpg"
              width={40}
              height={40}
            />
          </button>
        </Popover>
      </div>
    </>
  );
}
