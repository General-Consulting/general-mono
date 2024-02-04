'use client'

interface HelperTextProps {
  helperText: string | undefined 
  helperTextId: string | undefined
}


const HelperText = ({
  helperText,
  helperTextId
}: HelperTextProps) => {
  if (!helperText) return null

  return (
    <p 
      className="mt-2 text-sm text-zinc-500" 
      id={helperTextId}
    >
      {helperText}
    </p>
  )
}

export default HelperText

