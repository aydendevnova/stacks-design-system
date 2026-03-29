import React from "react"
import { ChevronLeft, ChevronDown, Info, ArrowDownUp } from "lucide-react"
import { cn } from "@site/src/lib/utils"
import { Button } from "./button"
import { Card } from "./card"

import StxIcon from "@site/static/img/stx-logo.png"

// ── Token Row ──

interface TokenRowProps {
  label: string
  icon: string
  amount: string
  currency: string
  fiatValue: string
  showSwapIndicator?: boolean
  className?: string
}

function TokenRow({
  label,
  icon,
  amount,
  currency,
  fiatValue,
  showSwapIndicator,
  className,
}: TokenRowProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-2xl bg-[#F5F5F5] px-5 py-4",
        className,
      )}
    >
      <div className="relative shrink-0">
        <img
          src={icon}
          alt={currency}
          className="size-11 rounded-full"
          draggable={false}
        />
        {showSwapIndicator && (
          <div className="absolute -bottom-1 -right-1 flex size-5 items-center justify-center rounded-full bg-white">
            <ArrowDownUp className="size-3 text-[#666]" />
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-[#999]">
          {label}
        </span>
        <span className="text-xl font-semibold text-foreground">
          {amount} {currency}
        </span>
        <span className="text-[13px] text-[#999]">${fiatValue}</span>
      </div>
    </div>
  )
}

// ── Network Fee Row ──

interface NetworkFeeProps {
  fee: string
  className?: string
}

function NetworkFee({ fee, className }: NetworkFeeProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-xl border border-[#E5E5E5] px-4 py-3",
        className,
      )}
    >
      <span className="text-sm text-[#666]">Network fee</span>
      <button
        type="button"
        className="flex items-center gap-1 text-sm font-medium text-foreground"
      >
        {fee}
        <ChevronDown className="size-4 text-[#999]" />
      </button>
    </div>
  )
}

// ── Review Order Card ──

interface ReviewOrderProps {
  payAmount?: string
  payCurrency?: string
  payFiat?: string
  payIcon?: string
  receiveAmount?: string
  receiveCurrency?: string
  receiveFiat?: string
  receiveIcon?: string
  networkFee?: string
  className?: string
}

export function ReviewOrder({
  payAmount = "5.4",
  payCurrency = "ETH",
  payFiat = "17758.21",
  payIcon = StxIcon,
  receiveAmount = "5.12",
  receiveCurrency = "WETH",
  receiveFiat = "17758.21",
  receiveIcon = StxIcon,
  networkFee = "<0.001 ETH",
  className,
}: ReviewOrderProps) {
  return (
    <Card className={cn("w-full max-w-[420px] rounded-2xl border-0 p-6 shadow-none", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <button type="button" className="flex size-8 items-center justify-center rounded-full hover:bg-[#F5F5F5]">
          <ChevronLeft className="size-5 text-foreground" />
        </button>
        <span className="text-base font-semibold text-foreground">Review Order</span>
        <button type="button" className="flex size-8 items-center justify-center rounded-full hover:bg-[#F5F5F5]">
          <Info className="size-5 text-[#999]" />
        </button>
      </div>

      {/* Token sections */}
      <div className="mt-5 flex flex-col gap-3">
        <TokenRow
          label="You pay"
          icon={payIcon}
          amount={payAmount}
          currency={payCurrency}
          fiatValue={payFiat}
        />
        <TokenRow
          label="You receive"
          icon={receiveIcon}
          amount={receiveAmount}
          currency={receiveCurrency}
          fiatValue={receiveFiat}
          showSwapIndicator
        />
      </div>

      {/* Network fee */}
      <div className="mt-4">
        <NetworkFee fee={networkFee} />
      </div>

      {/* Convert button */}
      <Button
        className="mt-4 h-12 w-full rounded-xl text-sm font-semibold uppercase tracking-wider"
      >
        Convert
      </Button>
    </Card>
  )
}

// ── Staking Header ──

interface StakingHeaderProps {
  className?: string
}

export function StakingHeader({ className }: StakingHeaderProps) {
  return (
    <div className={cn("w-full rounded-2xl bg-[#FAF7F4] p-6 sm:p-8", className)}>
      <h2 className="m-0 text-[28px] font-medium leading-tight text-foreground sm:text-[32px]">
        Staking
      </h2>
      <p className="mt-2 max-w-[560px] text-[15px] leading-relaxed text-[#666]">
        Enables users to lock their cryptocurrency for a specified period to earn rewards, showing
        staking amounts, lock periods, APY rates, and accumulated earnings.
      </p>
    </div>
  )
}

// ── Full Staking Component ──

interface StakingProps {
  className?: string
}

export function Staking({ className }: StakingProps) {
  return (
    <div className={cn("flex flex-col items-center gap-6", className)}>
      <StakingHeader className="w-full" />
      <ReviewOrder />
    </div>
  )
}

export { TokenRow, NetworkFee }
export type { ReviewOrderProps, StakingProps, TokenRowProps, NetworkFeeProps }
