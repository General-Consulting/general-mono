'use client'

import { clsx } from "clsx";
import { ButtonHTMLAttributes } from "react";

// Extend the ButtonHTMLAttributes to allow all button native props if needed
type BaseButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'>;

// Define exclusive props for submit and button types
type SubmitButtonProps = {
  type: 'submit';
  onClick?: never; // Disallow onClick when type is 'submit'
} & BaseButtonProps;

type ClickButtonProps = {
  type?: 'button'; // Make 'button' the default or only allowed type when onClick is provided
  onClick: () => void;
} & BaseButtonProps;

// Combine using a union type
type HighlightButtonProps = SubmitButtonProps | ClickButtonProps;

const HighlightButton = ({
  type = 'button', // Default type to 'button'
  onClick,
  className,
  children,
}: HighlightButtonProps) => {
  // Implementation remains the same
  return (
    <div className="mt-4 sm:mt-0 sm:flex-none">
      <button
        type={type}
        onClick={onClick}
        className={clsx(
          "block rounded-md px-3 py-2 text-center text-sm font-semibold text-white shadow-sm bg-indigo-600 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
          className,
        )}
      >
        {children}
      </button>
    </div>
  );
};

export default HighlightButton;
