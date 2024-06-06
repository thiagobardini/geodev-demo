"use client";

import { usePathname } from "next/navigation";
import { BuyMeACoffee } from "../shared/icons";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const pathname = usePathname();
  const hideFooter = pathname === "/map/trailmap";
  const hideFooterHome = pathname === "/";

  if (hideFooter || hideFooterHome) {
    return null;
  }

  return (
    <div className="absolute w-full py-5 text-center">
      <div className="mb-4 flex items-end justify-center gap-1">
        <p className="relative bottom-[-4px] text-gray-500">A project by</p>
        <Link
          className="font-semibold text-gray-600 underline-offset-4 transition-colors hover:underline"
          href="https://www.tbardini.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/images/TBardini-dot-dark.png"
            alt="Tbardini logo"
            width="100"
            height="30"
            className=" transition-all duration-75 hover:scale-105"
          />
        </Link>
      </div>
      <a
        href="https://www.buymeacoffee.com/tbardini"
        target="_blank"
        rel="noopener noreferrer"
        className="mx-auto mt-4 flex max-w-fit items-center justify-center gap-2 px-6 py-2 transition-all duration-75 hover:scale-105"
      >
        <BuyMeACoffee className="h-6 w-6" />
        <p className="font-medium text-gray-600">Buy me a coffee</p>
      </a>
    </div>
  );
}
