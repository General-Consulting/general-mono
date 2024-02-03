"use client";

import { FieldError } from "react-hook-form";

interface ErrorMessageProps {
  invalid: boolean;
  error: FieldError | undefined;
  errorId: string | undefined;
}

const ErrorMessage = ({ invalid, error, errorId }: ErrorMessageProps) => {
  if (invalid === false) return null;

  return (
    <p id={errorId} role="alert" className="mt-2 text-red-700">
      {error?.message}
    </p>
  );
};

export default ErrorMessage;
