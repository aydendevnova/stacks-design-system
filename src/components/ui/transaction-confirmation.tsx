import * as React from "react"
import { cn } from "@site/src/lib/utils"

interface TransactionDetail {
  label: string
  value: React.ReactNode
}

interface TransactionConfirmationProps {
  message?: string
  amount: string
  token: string
  details: TransactionDetail[]
  onConfirm?: () => void
  confirmLabel?: string
  className?: string
}

function TransactionConfirmation({
  message = "The funds have been sent to your wallet",
  amount,
  token,
  details,
  onConfirm,
  confirmLabel = "GOT IT",
  className,
}: TransactionConfirmationProps) {
  return (
    <div
      className={cn(
        "font-sans w-full max-w-[420px] rounded-2xl border border-border bg-card p-6 flex flex-col items-center",
        className
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <p className="text-sm text-foreground mb-5 text-center">{message}</p>

      <div className="flex items-baseline gap-2 mb-6">
        <span className="text-[40px] font-bold leading-none tracking-tight text-foreground">
          {amount}
        </span>
        <span className="text-base font-medium text-muted-foreground">{token}</span>
      </div>

      <div className="w-full rounded-xl bg-secondary p-1 mb-6">
        {details.map((detail, i) => (
          <div
            key={i}
            className={cn(
              "flex items-start justify-between px-4 py-3.5",
              i < details.length - 1 && "border-b border-border"
            )}
          >
            <span className="text-sm text-foreground">{detail.label}</span>
            <div className="text-sm text-right">{detail.value}</div>
          </div>
        ))}
      </div>

      <button
        onClick={onConfirm}
        className="w-full rounded-xl bg-foreground py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-primary-foreground transition-opacity hover:opacity-90"
      >
        {confirmLabel}
      </button>
    </div>
  )
}

export { TransactionConfirmation }
export type { TransactionConfirmationProps, TransactionDetail }
