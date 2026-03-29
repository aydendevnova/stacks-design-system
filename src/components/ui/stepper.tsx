import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@site/src/lib/utils"

type StepStatus = "completed" | "active" | "upcoming"

interface Step {
  label: string
  helperText?: string
}

interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: Step[]
  currentStep: number
}

function getStepStatus(index: number, currentStep: number): StepStatus {
  if (index < currentStep) return "completed"
  if (index === currentStep) return "active"
  return "upcoming"
}

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  ({ className, steps, currentStep, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex w-full items-start", className)}
      {...props}
    >
      {steps.map((step, index) => {
        const status = getStepStatus(index, currentStep)
        const isLast = index === steps.length - 1

        return (
          <div
            key={index}
            className={cn("flex flex-1 items-start", isLast && "flex-none")}
          >
            <div className="flex flex-col items-center gap-0.5">
              <StepCircle status={status} stepNumber={index + 1} />
              <span
                className={cn(
                  "mt-1.5 text-sm font-medium leading-tight",
                  status === "upcoming"
                    ? "text-muted-foreground"
                    : "text-foreground"
                )}
              >
                {step.label}
              </span>
              {step.helperText && (
                <span className="text-xs text-muted-foreground leading-tight">
                  {step.helperText}
                </span>
              )}
            </div>

            {!isLast && (
              <StepConnector
                completed={status === "completed"}
              />
            )}
          </div>
        )
      })}
    </div>
  )
)
Stepper.displayName = "Stepper"

function StepCircle({ status, stepNumber }: { status: StepStatus; stepNumber: number }) {
  if (status === "completed") {
    return (
      <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-success text-success">
        <Check className="h-4 w-4" strokeWidth={3} />
      </div>
    )
  }

  if (status === "active") {
    return (
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
        {stepNumber}
      </div>
    )
  }

  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-full border-[1.5px] border-border text-muted-foreground text-sm font-medium">
      {stepNumber}
    </div>
  )
}

function StepConnector({ completed }: { completed: boolean }) {
  return (
    <div style={{ marginTop: '18px' }} className="flex flex-1 items-center px-2">
      <div
        className={cn(
          "h-0.5 w-full",
          completed ? "bg-success" : "bg-border"
        )}
      />
    </div>
  )
}

export { Stepper }
export type { Step, StepperProps }
