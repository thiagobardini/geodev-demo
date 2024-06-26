"use client";

import Image from "next/image";
import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";
import UserDropdownSignIn from "./user-dropdown-signin";
import { usePathname } from "next/navigation";

import { Session } from "next-auth";

export default function NavBar({ session }: { session: Session | null }) {
  const { SignInModal } = useSignInModal();
  const scrolled = useScroll(50);

  const pathname = usePathname();
  const isMapRoute = pathname.includes("");
  // const isMapRoute = pathname.includes("map");

  return (
    <>
      <SignInModal />
      <div
        className={`fixed top-0 flex w-full justify-center ${
          isMapRoute
            ? "bg-white/50 backdrop-blur-xl"
            : scrolled
            ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
            : "bg-white/0"
        } z-30 transition-all`}
      >
        <div className="mx-5 flex h-16 w-full max-w-screen-xl items-center justify-between">
          <Link href="/" className="flex items-center font-display text-2xl">
            <Image
              src="/images/tbtag.png"
              alt="TB logo"
              width="30"
              height="30"
              className="mr-2 rounded-sm"
            ></Image>
            <p>GeoDev | Demo</p>
          </Link>
          <div className="flex items-center space-x-4">
            <>
              {session ? (
                <>
                  <UserDropdown session={session} />
                </>
              ) : (
                <UserDropdownSignIn />
              )}
            </>
          </div>
        </div>
      </div>
    </>
  );
}
