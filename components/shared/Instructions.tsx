import React from "react";

const Instructions = ({ step, no_ }) => {
  return (
    <article className="flex items-center justify-start gap-5">
      <div className="text-gray-400">{no_}</div>
      <p className="text-sm font-semibold text-gray-400">{step}</p>
    </article>
  );
};

export default Instructions;
