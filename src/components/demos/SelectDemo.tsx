import * as React from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@site/src/components/ui/select"

const tokens = [
  { value: "eth", label: "ETH", icon: "/img/eth.png" },
  { value: "btc", label: "BTC", icon: "/img/btc.png" },
  { value: "stx", label: "STX", icon: "/img/stx-logo.png" },
  { value: "dai", label: "DAI", icon: "/img/dai.png" },
  { value: "ltc", label: "LTC", icon: "/img/ltc.png" },
  { value: "usdt", label: "USDT", icon: "/img/tether.png" },
]

export function SelectDemo() {
  return (
    <Select defaultValue="eth">
      <SelectTrigger className="w-[260px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {tokens.map((token) => (
          <SelectItem key={token.value} value={token.value}>
            <div className="flex items-center gap-2">
              <img
                src={token.icon}
                alt={token.label}
                className="h-6 w-6 rounded-full"
              />
              <span>{token.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
