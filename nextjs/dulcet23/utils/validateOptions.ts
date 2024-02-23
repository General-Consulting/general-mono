import { FlexibleOptions } from "@/types";

type AllowedValues<T, K extends keyof T> = T[K] extends infer U ? U : never;

type ValidateOptions<T, K extends keyof T, Options extends FlexibleOptions> = Options extends Array<infer U>
  ? U extends string | number
    ? U extends AllowedValues<T, K>
      ? Options
      : never // <- Causes an error if U is not an allowed value for T[K]
    : U extends { label: infer L; value: infer V }
      ? V extends AllowedValues<T, K>
          ? Options
          : never // <- Causes an error if the object's value is not allowed for T[K]
        : never
      : never;

export function validateOptions<
  T, 
  K extends keyof T, 
  Options extends FlexibleOptions
>(
  key: K, 
  options: Options
): ValidateOptions<T, K, Options> {
  return options as ValidateOptions<T, K, Options>;
}