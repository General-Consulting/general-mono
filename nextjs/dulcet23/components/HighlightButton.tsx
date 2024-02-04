'use client'

import { clsx } from "clsx";
import { ReactNode } from "react";

interface HighlightButtonProps {
  onClick: () => void;
  className?: string
  children: ReactNode
}

// Define the HighlightButton component
const HighlightButton = ({
  onClick,
  className,
  children 
}: HighlightButtonProps) => {
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
          "text-center text-sm font-semibold text-white",

          // Shadow
          "shadow-sm",

          // Button color
          "bg-indigo-600",

          // Hover styles
          "hover:bg-indigo-500",

          // Focus-visible styles
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",

          // Add or overwrite Tailwind classes
          className,
        )}
      >
        {children}
      </button>
    </div>
  )
}

export default HighlightButton