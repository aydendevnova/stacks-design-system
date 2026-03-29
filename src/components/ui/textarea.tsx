import * as React from "react"
import { cn } from "@site/src/lib/utils"

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, id: externalId, ...props }, ref) => {
    const generatedId = React.useId()
    const id = externalId || generatedId

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 cursor-text resize-y",
            error && "border-destructive focus-visible:ring-destructive",
            className
          )}
          ref={ref}
          id={id}
          aria-invalid={!!error || undefined}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
          {...props}
        />
        {error && <p id={`${id}-error`} className="text-sm text-destructive">{error}</p>}
        {!error && hint && <p id={`${id}-hint`} className="text-sm text-muted-foreground">{hint}</p>}
      </div>
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
