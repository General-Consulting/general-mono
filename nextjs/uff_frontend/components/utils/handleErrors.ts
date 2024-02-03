import { FieldErrors } from 'react-hook-form'

interface HandleErrorsArgs {
  errors: FieldErrors,
  name: string
}

/**
 * - Handle errors
 * - (1) Check if error(s) exist, i.e. if field is "invalid"
 * - (2) Construct "errorId", used for aria
 */
export const handleErrors = ({ errors, name }: HandleErrorsArgs) => {
  const errorKeys = (errors) ? Object.keys(errors) : []
  const invalid = errorKeys.includes(name)
  const errorId = invalid ? `${name}-error` : undefined;

  return { invalid, errorId }
}