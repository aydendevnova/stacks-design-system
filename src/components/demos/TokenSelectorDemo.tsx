import * as React from "react"
import { TokenSelector, type Token } from "@site/src/components/ui/token-selector"

const userTokens: Token[] = [
  { symbol: "ETH", name: "Ethereum", icon: "/img/eth.png", balance: "70.124" },
  { symbol: "BTC", name: "Bitcoin", icon: "/img/btc.png", balance: "2.451" },
]

const popularTokens: Token[] = [
  { symbol: "STX", name: "Stacks", icon: "/img/stx-logo.png" },
  { symbol: "DAI", name: "Dai", icon: "/img/dai.png" },
  { symbol: "USDT", name: "Tether", icon: "/img/tether.png" },
  { symbol: "LTC", name: "Litecoin", icon: "/img/ltc.png" },
]

const quickTokens: Token[] = [
  { symbol: "ETH", name: "Ethereum", icon: "/img/eth.png" },
  { symbol: "BTC", name: "Bitcoin", icon: "/img/btc.png" },
  { symbol: "STX", name: "Stacks", icon: "/img/stx-logo.png" },
  { symbol: "DAI", name: "Dai", icon: "/img/dai.png" },
]

export function TokenSelectorDemo() {
  const [selected, setSelected] = React.useState<Token | undefined>(undefined)

  return (
    <TokenSelector
      tokens={userTokens}
      popularTokens={popularTokens}
      quickSelectTokens={quickTokens}
      value={selected}
      onSelect={setSelected}
    />
  )
}
