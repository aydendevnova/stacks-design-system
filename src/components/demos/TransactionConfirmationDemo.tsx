import * as React from "react"
import { TransactionConfirmation } from "@site/src/components/ui/transaction-confirmation"

export function TransactionConfirmationDemo() {
  return (
    <TransactionConfirmation
      amount="123.00"
      token="USDT"
      details={[
        {
          label: "Transaction Address",
          value: (
            <a href="#" className="font-medium text-primary underline underline-offset-2 hover:text-primary-hover">
              890as....09a
            </a>
          ),
        },
        {
          label: "Payout Address",
          value: <span className="font-medium text-foreground">890as....09a</span>,
        },
        {
          label: "Network Commission",
          value: (
            <div className="flex flex-col items-end">
              <span>
                <span className="font-medium text-foreground">1.95</span>{" "}
                <span className="text-muted-foreground">USDT</span>
              </span>
              <span className="text-xs text-muted-foreground">$1.95</span>
            </div>
          ),
        },
        {
          label: "Date/Time",
          value: (
            <span>
              <span className="font-medium text-foreground">17.07.2024</span>{" "}
              <span className="text-muted-foreground">10:00PM</span>
            </span>
          ),
        },
      ]}
    />
  )
}
