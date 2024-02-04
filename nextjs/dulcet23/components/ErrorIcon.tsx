'use client'

import { ExclamationCircleIcon } from '@heroicons/react/20/solid'

interface ErrorIconProps {
  invalid: boolean
}

/*
 * ErrorIcon component conditionally renders exclamation point 
 * icon for use inside field component to display whether or not 
 * field component is in "invalid" state or not.
 */

const ErrorIcon = ({ invalid }: ErrorIconProps) => {
  return (
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
      {(invalid) 
        ? <ExclamationCircleIcon 
            className="h-5 w-5 text-red-500" 
            aria-hidden="true" 
          />
        : null
      }
    </div>
  )
}

export default ErrorIcon