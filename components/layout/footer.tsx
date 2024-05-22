import { BuyMeACoffee } from "../shared/icons";
import Image from "next/image";

export default function Footer() {
  return (
    <div className="absolute w-full py-5 text-center">
      <p className="text-gray-500">
        A project by{" "}
        <a
          className="font-semibold text-gray-600 underline-offset-4 transition-colors hover:underline"
          href="https://www.tbardini.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Thiago Bardini
        </a>
      </p>
      <a
        href="https://www.buymeacoffee.com/tbardini"
        target="_blank"
        rel="noopener noreferrer"
        className="mx-auto mt-2 flex max-w-fit items-center justify-center space-x-2 rounded-lg border border-gray-200 bg-white px-6 py-2 transition-all duration-75 hover:scale-105"
      >
        <Image
          src="/images/TBardini-dot-dark.png"
          alt="Tbardini logo"
          width="100"
          height="30"
          className="mr-2 rounded-sm"
        ></Image>
        <p className="font-medium text-gray-600">Buy me a coffee</p>
      </a>
    </div>
  );
}
