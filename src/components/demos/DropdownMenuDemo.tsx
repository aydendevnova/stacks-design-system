import * as React from "react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@site/src/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

const items = [
  { name: "Item", price: "$0.01", change: "24.9%", positive: true },
  { name: "Item", price: "$0.01", change: "24.9%", positive: true },
  { name: "Item", price: "$0.01", change: "24.9%", positive: true },
]

export function DropdownMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground shadow-sm hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
          Open Menu
          <ChevronDown className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Section Title</DropdownMenuLabel>
        {items.map((item, i) => (
          <React.Fragment key={i}>
            <DropdownMenuItem className="flex items-center justify-between px-3 py-3">
              <span className="text-sm">{item.name}</span>
              <div className="flex flex-col items-end gap-0.5">
                <span className="text-sm font-semibold">{item.price}</span>
                <span className="text-xs text-success">{item.change}</span>
              </div>
            </DropdownMenuItem>
            {i < items.length - 1 && <DropdownMenuSeparator />}
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
