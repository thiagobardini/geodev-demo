"use client";

import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { LoadingDots, Google } from "@/components/shared/icons";
import Home from "@/components/home/home";

export default function Page() {
  const { data: session, status } = useSession();

  status === "loading" && (
    // Loading...
    <div className="z-10 w-full max-w-xl px-5 xl:px-0">
      <LoadingDots color="#808080" />
    </div>
  );

  return (
    <>
      {!session ? (
        <div className="z-10 mt-[240px] w-full max-w-md overflow-hidden rounded-2xl border px-5 md:px-0">
          <div>
            <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center md:px-16">
              <a href="https://www.tbardini.com">
                <Image
                  src="/images/tbtag.png"
                  alt="TB Logo"
                  className="h-10 w-10 rounded-full"
                  width={20}
                  height={20}
                />
              </a>
              <h3 className="font-display text-2xl font-bold">Sign In</h3>
              <p className="text-sm text-gray-500">
                This is strictly for demo purposes - only your email and profile
                picture will be stored.
              </p>
            </div>
            <div className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 md:px-16">
              <button
                onClick={() => signIn("google")}
                className="flex h-10 w-full items-center justify-center space-x-3 rounded-md border border-gray-200 bg-white text-sm text-black shadow-sm transition-all duration-75 hover:bg-gray-50 focus:outline-none"
              >
                {status === "loading" ? (
                  <LoadingDots color="#808080" />
                ) : (
                  <>
                    <Google className="h-5 w-5" />
                    <p>Sign In with Google</p>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="z-10 w-full max-w-xl px-5 pt-[120px] xl:px-0">
            <h1
              className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-3xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] md:text-7xl md:leading-[5rem]"
              style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
            >
              Welcome back, {session?.user?.name}
            </h1>
          </div>
          <Home />
        </>
      )}
    </>
  );
}
