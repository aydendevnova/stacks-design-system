import React from "react"
import { ArrowDownUp, Settings } from "lucide-react"
import { cn } from "@site/src/lib/utils"
import { Button } from "./button"
import { Card } from "./card"
import { ContentSwitcher, ContentSwitcherOption } from "./content-switcher"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select"

const TOKENS = [
  { value: "eth", label: "ETH", icon: "/img/eth.png" },
  { value: "btc", label: "BTC", icon: "/img/btc.png" },
  { value: "stx", label: "STX", icon: "/img/stx-logo.png" },
  { value: "dai", label: "DAI", icon: "/img/dai.png" },
  { value: "ltc", label: "LTC", icon: "/img/ltc.png" },
  { value: "usdt", label: "USDT", icon: "/img/tether.png" },
]

// ── Token Input Section ──

interface TokenInputProps {
  label: string
  amount?: string
  fiatValue?: string
  selectedToken?: string
  onTokenChange?: (value: string) => void
  className?: string
}

function TokenInput({
  label,
  amount = "0.00",
  fiatValue = "$0.00",
  selectedToken = "eth",
  onTokenChange,
  className,
}: TokenInputProps) {
  const token = TOKENS.find((t) => t.value === selectedToken) ?? TOKENS[0]

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <span className="text-[11px] font-semibold uppercase tracking-widest text-[#999]">
        {label}
      </span>
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="font-mono text-[32px] font-light leading-tight text-foreground">
            {amount}
          </span>
          <span className="text-[13px] text-[#999]">{fiatValue}</span>
        </div>
        <Select value={selectedToken} onValueChange={onTokenChange}>
          <SelectTrigger className="h-auto w-auto gap-2 rounded-lg border-[#E5E5E5] bg-transparent px-3 py-2 shadow-none focus:ring-0 focus:ring-offset-0">
            <div className="flex items-center gap-2">
              <img
                src={token.icon}
                alt={token.label}
                className="size-7 rounded-full"
                draggable={false}
              />
              <span className="text-sm font-medium text-foreground">{token.label}</span>
            </div>
          </SelectTrigger>
          <SelectContent>
            {TOKENS.map((t) => (
              <SelectItem key={t.value} value={t.value}>
                <div className="flex items-center gap-2">
                  <img
                    src={t.icon}
                    alt={t.label}
                    className="size-5 rounded-full"
                    draggable={false}
                  />
                  <span>{t.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

// ── Swap Toggle Button ──

interface SwapToggleProps {
  className?: string
  onClick?: () => void
}

function SwapToggle({ className, onClick }: SwapToggleProps) {
  return (
    <div className={cn("flex items-center justify-center py-1", className)}>
      <button
        type="button"
        onClick={onClick}
        className="flex size-9 items-center justify-center rounded-full border border-[#E5E5E5] transition-colors hover:bg-[#F5F5F5]"
      >
        <ArrowDownUp className="size-4 text-[#666]" />
      </button>
    </div>
  )
}

// ── Swap Card ──

interface SwapCardProps {
  className?: string
}

export function SwapCard({ className }: SwapCardProps) {
  const [activeTab, setActiveTab] = React.useState("swap")
  const [payToken, setPayToken] = React.useState("eth")
  const [receiveToken, setReceiveToken] = React.useState("btc")

  function handleSwapToggle() {
    setPayToken(receiveToken)
    setReceiveToken(payToken)
  }

  return (
    <Card
      className={cn(
        "w-full max-w-[480px] rounded-2xl border-0 px-7 py-6 shadow-none",
        className,
      )}
    >
      {/* Tab navigation */}
      <div className="flex items-center justify-between">
        <ContentSwitcher
          type="single"
          value={activeTab}
          onValueChange={(v) => { if (v) setActiveTab(v) }}
          className="bg-transparent p-0 gap-1"
        >
          <ContentSwitcherOption
            value="swap"
            className="rounded-full px-4 py-1.5 text-[11px] data-[state=on]:bg-[#EBEBEB] data-[state=on]:text-foreground hover:bg-transparent data-[state=on]:hover:bg-[#EBEBEB]"
          >
            Swap
          </ContentSwitcherOption>
          <ContentSwitcherOption
            value="limit"
            className="rounded-full px-4 py-1.5 text-[11px] data-[state=on]:bg-[#EBEBEB] data-[state=on]:text-foreground hover:bg-transparent data-[state=on]:hover:bg-[#EBEBEB]"
          >
            Limit
          </ContentSwitcherOption>
          <ContentSwitcherOption
            value="buy"
            className="rounded-full px-4 py-1.5 text-[11px] data-[state=on]:bg-[#EBEBEB] data-[state=on]:text-foreground hover:bg-transparent data-[state=on]:hover:bg-[#EBEBEB]"
          >
            Buy
          </ContentSwitcherOption>
          <ContentSwitcherOption
            value="sell"
            className="rounded-full px-4 py-1.5 text-[11px] data-[state=on]:bg-[#EBEBEB] data-[state=on]:text-foreground hover:bg-transparent data-[state=on]:hover:bg-[#EBEBEB]"
          >
            Sell
          </ContentSwitcherOption>
        </ContentSwitcher>
        <button
          type="button"
          className="flex size-8 items-center justify-center rounded-full hover:bg-[#F5F5F5]"
        >
          <Settings className="size-[18px] text-[#666]" />
        </button>
      </div>

      {/* Pay section */}
      <div className="mt-7">
        <TokenInput
          label="Pay"
          selectedToken={payToken}
          onTokenChange={setPayToken}
        />
      </div>

      {/* Swap toggle */}
      <SwapToggle onClick={handleSwapToggle} />

      {/* Receive section */}
      <div>
        <TokenInput
          label="Pay"
          selectedToken={receiveToken}
          onTokenChange={setReceiveToken}
        />
      </div>

      {/* Connect wallet button */}
      <Button
        className="mt-6 h-12 w-full rounded-xl text-[11px] font-semibold uppercase tracking-widest"
      >
        Connect Wallet
      </Button>
    </Card>
  )
}

// ── Swap Header ──

interface SwapHeaderProps {
  className?: string
}

export function SwapHeader({ className }: SwapHeaderProps) {
  return (
    <div className={cn("w-full rounded-2xl bg-[#FAF7F4] p-6 sm:p-8", className)}>
      <h2 className="m-0 text-[28px] font-medium leading-tight text-foreground sm:text-[32px]">
        Swaps
      </h2>
      <p className="mt-2 max-w-[560px] text-[15px] leading-relaxed text-[#666]">
        Allows users to exchange one cryptocurrency token for another, displaying
        exchange rates, fees, and transaction details before confirmation.
      </p>
    </div>
  )
}

// ── Full Swap Component ──

interface SwapProps {
  className?: string
}

export function Swap({ className }: SwapProps) {
  return (
    <div className={cn("flex flex-col items-center gap-6", className)}>
      <SwapHeader className="w-full" />
      <SwapCard />
    </div>
  )
}

export { TokenInput, SwapToggle }
export type { SwapProps, SwapCardProps, SwapHeaderProps, TokenInputProps, SwapToggleProps }
