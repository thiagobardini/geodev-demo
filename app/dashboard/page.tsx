"use client";

import Card from "@/components/shared/card";
import { DEPLOY_URL } from "@/lib/constants";
import WebVitals from "@/components/home/web-vitals";
import ComponentGrid from "@/components/shared/component-grid";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { LoadingDots, Google } from "@/components/shared/icons";

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
        <div className="z-10 w-full max-w-md px-5 md:px-0 overflow-hidden rounded-2xl border">
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
          <div className="z-10 w-full max-w-xl px-5 xl:px-0">
            <h1
              className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-3xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] md:text-7xl md:leading-[5rem]"
              style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
            >
              Welcome back, {session?.user?.name}
            </h1>
          </div>
          <div className="my-10 grid w-full max-w-screen-xl animate-fade-up grid-cols-1 gap-5 px-5 md:grid-cols-3 xl:px-0">
            {features.map(({ title, description, demo, large }) => (
              <Card
                key={title}
                title={title}
                description={description}
                demo={
                  title === "Beautiful, reusable components" ? (
                    <ComponentGrid />
                  ) : (
                    demo
                  )
                }
                large={large}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}

const features = [
  {
    title: "Beautiful, reusable components",
    description:
      "Pre-built beautiful, a11y-first components, powered by [Tailwind CSS](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/), and [Framer Motion](https://framer.com/motion)",
    large: true,
  },
  {
    title: "Performance first",
    description:
      "Built on [Next.js](https://nextjs.org/) primitives like `@next/font` and `next/image` for stellar performance.",
    demo: <WebVitals />,
  },
  {
    title: "One-click Deploy",
    description:
      "Jumpstart your next project by deploying Precedent to [Vercel](https://vercel.com/) in one click.",
    demo: (
      <a href={DEPLOY_URL}>
        <Image
          src="https://vercel.com/button"
          alt="Deploy with Vercel"
          width={120}
          height={30}
          unoptimized
        />
      </a>
    ),
  },
  {
    title: "Built-in Auth + Database",
    description:
      "Precedent comes with authentication and database via [Auth.js](https://authjs.dev/) + [Prisma](https://prisma.io/)",
    demo: (
      <div className="flex items-center justify-center space-x-20">
        <Image alt="Auth.js logo" src="/authjs.webp" width={50} height={50} />
        <Image alt="Prisma logo" src="/prisma.svg" width={50} height={50} />
      </div>
    ),
  },
  {
    title: "Hooks, utilities, and more",
    description:
      "Precedent offers a collection of hooks, utilities, and `@vercel/og`",
    demo: (
      <div className="grid grid-flow-col grid-rows-3 gap-10 p-10">
        <span className="font-mono font-semibold">useIntersectionObserver</span>
        <span className="font-mono font-semibold">useLocalStorage</span>
        <span className="font-mono font-semibold">useScroll</span>
        <span className="font-mono font-semibold">nFormatter</span>
        <span className="font-mono font-semibold">capitalize</span>
        <span className="font-mono font-semibold">truncate</span>
      </div>
    ),
  },
];
