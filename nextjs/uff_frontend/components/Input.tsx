"use client";

import { forwardRef } from "react";
import { clsx } from "clsx";
import {
  ChangeHandler,
  FieldErrors,
  UseFormGetFieldState,
  useFormContext,
} from "react-hook-form";

import ErrorIcon from "./ErrorIcon";
import ErrorMessage from "./ErrorMessage";
import HelperText from "./HelperText";
import { handleErrors } from "./utils/handleErrors";

/*
 * Types for Input component; used for formatting.
 */
const dateTypes = ["date", "datetime-local", "month", "time", "week"];
type DateType = (typeof dateTypes)[number];
type InputType =
  | "email"
  | "number"
  | "password"
  | "search"
  | "tel"
  | "text"
  | "url"
  | DateType;

interface InputComponentProps {
  type: InputType;
  label: string;
  name: string;
  helperText?: string;
  placeholder?: string;
  isRequired?: boolean;
}

// TODO - remove & move elsewhere if needed
const requiredObj = {
  required: {
    value: true,
    message: "This is required.",
  },
};

const Input = ({
  type,
  label,
  name,
  helperText,
  placeholder,
  isRequired,
}: InputComponentProps) => {
  // Get form methods & subscribe to formState
  const {
    getFieldState,
    register,
    formState: { errors },
  } = useFormContext();

  // Register field, including validation and disabled state
  const fieldProps = register(name);

  // Check if errors exist
  const { invalid, error } = getFieldState(name);
  const errorId = invalid ? `${name}-error` : undefined;

  // Create ID if need to display helper text
  const helperTextId = helperText ? `${name}-description` : undefined;

  return (
    <span>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-zinc-900"
      >
        {label}
        {isRequired ? <span aria-hidden="true"> *</span> : null}
      </label>

      <span
        className={clsx([
          // className, TODO - decide what overrides make sense

          // Basic layout
          "relative block w-full",

          // Background color + shadow applied to inset pseudo element, so shadow blends with border in light mode
          "before:absolute before:inset-px before:rounded-[calc(theme(borderRadius.lg)-1px)] before:bg-white before:shadow",

          // Background color is moved to control and shadow is removed in dark mode so hide `before` pseudo
          "dark:before:hidden",

          // Focus ring
          "after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:ring-inset after:ring-transparent sm:after:focus-within:ring-2 sm:after:focus-within:ring-amber-600",

          // Disabled state
          "has-[:disabled]:opacity-50 before:has-[:disabled]:bg-zinc-950/5 before:has-[:disabled]:shadow-none",

          // Invalid state
          invalid
            ? "before:shadow-red-500/30 focus-within:before:shadow-none"
            : "",
        ])}
      >
        <input
          id={name}
          {...fieldProps}
          placeholder={placeholder}
          aria-invalid={invalid ? "true" : "false"}
          aria-errormessage={errorId}
          aria-required={isRequired ? "true" : "false"}
          aria-describedby={helperTextId}
          className={clsx([
            // Date classes
            dateTypes.includes(type) && [
              "[&::-webkit-datetime-edit-fields-wrapper]:p-0",
              "[&::-webkit-date-and-time-value]:min-h-[1.5em]",
              "[&::-webkit-datetime-edit]:inline-flex",
              "[&::-webkit-datetime-edit]:p-0",
              "[&::-webkit-datetime-edit-year-field]:p-0",
              "[&::-webkit-datetime-edit-month-field]:p-0",
              "[&::-webkit-datetime-edit-day-field]:p-0",
              "[&::-webkit-datetime-edit-hour-field]:p-0",
              "[&::-webkit-datetime-edit-minute-field]:p-0",
              "[&::-webkit-datetime-edit-second-field]:p-0",
              "[&::-webkit-datetime-edit-millisecond-field]:p-0",
              "[&::-webkit-datetime-edit-meridiem-field]:p-0",
            ],

            // Basic layout
            "relative block w-full appearance-none rounded-lg px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing[3])-1px)] sm:py-[calc(theme(spacing[1.5])-1px)]",

            // Typography
            "text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 dark:text-white",

            // Border
            "border border-zinc-950/10 hover:border-zinc-950/20 dark:border-white/10 dark:hover:border-white/20",

            // Background color
            "bg-transparent dark:bg-white/5",

            // Hide default focus styles
            "focus:outline-none focus-visible:outline-none focus:ring-0 focus:border-zinc-950/10 focus-visible:border-zinc-950/10",

            // Invalid state
            invalid
              ? "border-red-500 hover:border-red-600 dark:border-red-500 dark:hover:border-red-400"
              : "",

            // Disabled state
            "disabled:bg-zinc-100 disabled:text-zinc-500 disabled:border-zinc-950/20 dark:hover:disabled:border-white/15 disabled:dark:border-white/15 disabled:dark:bg-white/[2.5%]",
          ])}
        />
        <ErrorIcon invalid={invalid} />
      </span>
      <HelperText helperText={helperText} helperTextId={helperTextId} />
      {/* <ErrorMessage
        invalid={invalid}
        errorId={errorId}
        error={error}
      />   */}
    </span>
  );
};

// Input.displayName = 'Input'

export default Input;

// disabled={disabled}
// { ...(helperText ? { 'aria-describedby': helperTextId } : {})}
// { ...(invalid ? { 'data-invalid': true } : {}) }
