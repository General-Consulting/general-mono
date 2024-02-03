"use client";

import { clsx } from "clsx";
import { useFormContext } from "react-hook-form";

/* NOTES ON USE:
 * HiddenInput is used to track values close to where they are entered.
 * The goal is to limit the need for manipulation to fields at the time of processing.
 *
 * Example: Watch MiddleName and return MiddleInitial.
 *
 * IMPORTANT: The values for HiddenInput are set in parent component, using `useWatch` and `setValue`.
 * IMPORTANT: Cannot call `setValue` on input with type of "hidden", so use `display: none` and aria-hidden.
 * Tailwind's "hidden" class is different than setting the type to "hidden".
 */

interface HiddenInputComponentProps {
  name: string;
}

const HiddenInput = ({ name }: HiddenInputComponentProps) => {
  // Get register from form context
  const { register } = useFormContext();

  // Register field
  const fieldProps = register(name);

  return (
    <input id={name} {...fieldProps} aria-hidden="true" className="hidden" />
  );
};

export default HiddenInput;
