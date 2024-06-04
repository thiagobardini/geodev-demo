import React, { ReactNode, Suspense } from "react";
import ReactMarkdown from "react-markdown";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

export default function Card({
  title,
  description,
  demo,
  large,
  onClick,
}: {
  title: string;
  description: string;
  demo: ReactNode;
  large?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      className={`relative col-span-1 h-96 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md ${
        large ? "md:col-span-2" : ""
      }`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <div className="flex h-60 items-center justify-center overflow-hidden">
        <Suspense fallback={<LoadingSpinner />}>{demo}</Suspense>
      </div>
      <div className="relative mx-auto flex h-[141px] max-w-full flex-col items-center justify-center pt-2 text-center">
        <h2 className="bg-white/50 bg-gradient-to-br from-black to-stone-500 bg-clip-text pl-2 pr-4 font-display text-xl font-bold text-transparent backdrop-blur-xl [text-wrap:balance] md:text-3xl md:font-normal">
          {title}
        </h2>
        <div className="prose-sm mt-1 bg-white/50 px-2 leading-normal text-gray-500 backdrop-blur-xl [text-wrap:balance] md:prose">
          <ReactMarkdown
            components={{
              a: ({ node, ...props }) => (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  {...props}
                  className="font-medium text-gray-800 underline transition-colors"
                />
              ),
              code: ({ node, ...props }) => (
                <code
                  {...props}
                  // @ts-ignore (to fix "Received `true` for a non-boolean attribute `inline`." warning)
                  inline="true"
                  className="rounded-sm bg-gray-100 px-1 py-0.5 font-mono font-medium text-gray-800"
                />
              ),
            }}
          >
            {description}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
