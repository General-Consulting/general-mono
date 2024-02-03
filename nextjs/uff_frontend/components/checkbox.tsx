"use client";

import { forwardRef } from "react";
import { clsx } from "clsx";
import { ChangeHandler, Control, FieldErrors, useWatch } from "react-hook-form";

import ErrorIcon from "./ErrorIcon";
import ErrorMessage from "./ErrorMessage";
import HelperText from "./HelperText";
import { handleErrors } from "./utils/handleErrors";

/*
 * Type for radio component props.
 */
interface Option {
  label: string;
  value: string;
}

interface CheckboxComponentProps {
  label: string;
  name: string;
  options: Option[];
  onChange: ChangeHandler;
  onBlur: ChangeHandler;
  control: Control;
  errors: FieldErrors;
  helperText?: string;
  disabled?: boolean;
  isRequired?: boolean;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxComponentProps>(
  (
    {
      label,
      name,
      options,
      onChange,
      onBlur,
      control,
      errors,
      helperText,
      disabled,
      isRequired,
    },
    ref,
  ) => {
    const { invalid, errorId } = handleErrors({ errors, name });
    const helperTextId = helperText ? `${name}-description` : undefined;

    const currentValue = useWatch({ control, name });

    return (
      <span>
        <fieldset
          className={clsx([
            "group",

            // Position and layout
            "mt-4",

            // Disabled state
            "disabled:opacity-50",
          ])}
          // disabled // TODO - add actual logic here
        >
          <legend
            className={clsx([
              // Font
              "text-base font-semibold leading-6 text-zinc-900",
            ])}
          >
            {label}
            {isRequired ? <span aria-hidden="true"> *</span> : null}
          </legend>

          <div className="grid gap-4 sm:grid-flow-col sm:auto-cols-fr">
            {options.map((option) => {
              const isChecked = currentValue.includes(option.value);

              return (
                <label
                  key={option.value}
                  htmlFor={option.value}
                  className={clsx([
                    // className,

                    // Basic layout
                    "flex gap-x-4 items-center",

                    // Shape of card
                    "rounded-lg",

                    // Border
                    "border border-zinc-950/10 dark:border-white/10",

                    // Padding
                    "px-4 py-2",

                    // Shadow
                    "group-enabled:shadow",

                    // Background color
                    "bg-white",

                    // Disabled
                    "group-disabled:bg-zinc-950/5",

                    // Based on checked status
                    isChecked
                      ? "bg-amber-600/10 hover:border-amber-600/40 border-amber-600/10 ring-2 ring-amber-600 shadow-none"
                      : "group-enabled:hover:border-zinc-950/20 group-enabled:dark:hover:border-white/20",
                  ])}

                  // {`cursor-pointer shadow-sm hover:drop-shadow-lg ${(isChecked) ? 'bg-emerald-300' : 'bg-white' }`}
                >
                  <input
                    id={option.value}
                    value={option.value}
                    type="checkbox"
                    name={name}
                    onChange={onChange}
                    onBlur={onBlur}
                    ref={ref}
                    className={clsx([
                      "peer",

                      // Size of checkbox box
                      "h-4 w-4",

                      // Border & shape
                      "border-zinc-300",

                      // Text color, a.k.a. checkbox color
                      "text-amber-600",

                      // Remove ring if focus
                      "focus:ring-0 focus:ring-offset-0 ",

                      // Add ring if focus-visible
                      "focus-visible:ring-amber-600 focus-visible:ring-offset-1 focus-visible:ring-2",

                      // Disabled (bg of square)
                      "group-disabled:bg-zinc-950/5",

                      // Based on checked status
                      "checked:bg-amber-600 checked:border-none",
                    ])}
                  />
                  <div className={clsx([""])}>{option.label}</div>
                </label>
              );
            })}
          </div>
          <HelperText helperText={helperText} helperTextId={helperTextId} />
          {/* <ErrorMessage
          name={name}
          errors={errors}
          errorId={errorId}
        />   */}
        </fieldset>
      </span>
    );
  },
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
