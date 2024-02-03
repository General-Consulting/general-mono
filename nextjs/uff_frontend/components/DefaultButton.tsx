"use client";

import { clsx } from "clsx";
import { ReactNode } from "react";

/* DefaultButton
 * - Can be used in anywhere that doesn't need emphasis (use HighlightButton) or a warning
 * - Typescript forces someone to enter a "type"
 * - Classname can be used to add or overwrite styling; e.g. can be used to create full-width button
 */

interface DefaultButtonProps {
  onClick: () => void;
  className: string;
  children: ReactNode;
}

// Define the HighlightButton component
const DefaultButton = ({
  onClick,
  children,
  className,
}: DefaultButtonProps) => {
  return (
    <div className="mt-4 sm:mt-0 sm:flex-none">
      <button
        type="button"
        onClick={onClick}
        className={clsx(
          // Display
          "block",

          // Shape
          "rounded-md",

          // Padding
          "px-3 py-2",

          // Text & font size, alignment, & color
          "text-center text-sm font-semibold text-gray-800",

          // Shadow
          "shadow-sm",

          // Button color
          "bg-white",

          // Ring color
          "ring-1 ring-inset ring-gray-300",

          // Hover styles
          "hover:bg-gray-50",

          // Focus-visible styles
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",

          // Add or overwrite Tailwind classes
          className,
        )}
      >
        {children}
      </button>
    </div>
  );
};

export default DefaultButton;
