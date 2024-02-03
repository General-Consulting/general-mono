"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

interface DeleteButtonProps {
  onClick: () => void;
}

{
  /* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>

<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg> */
}

const DeleteButton = ({ onClick }: DeleteButtonProps) => {
  const handleClick = () => onClick();

  return (
    <button
      type="button"
      onClick={handleClick}
      className={clsx(
        // Circular rounding (for ring)
        "rounded-full",

        // Text color
        "text-zinc-950",

        // Hover
        "hover:text-zinc-700",

        // Focus visible outline
        "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-indigo-600",
      )}
    >
      <XMarkIcon className="h-4 w-4" aria-hidden="true" />
    </button>
  );
};

export default DeleteButton;
