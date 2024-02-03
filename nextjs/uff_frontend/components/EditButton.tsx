"use client";

import { PencilIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

interface EditButtonProps {
  onClick: () => void;
}

const EditButton = ({ onClick }: EditButtonProps) => {
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
        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600",
      )}
    >
      <PencilIcon className="h-4 w-4" aria-hidden="true" />
    </button>
  );
};

export default EditButton;
