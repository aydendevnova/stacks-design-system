import React from "react"
import { QrCode, Send, ArrowLeftRight, DollarSign } from "lucide-react"
import { Button } from "./button"
import { Card } from "./card"
import { cn } from "@site/src/lib/utils"

import BtcIcon from "@site/static/img/btc.png"
import EthIcon from "@site/static/img/eth.png"
import TetherIcon from "@site/static/img/tether.png"
import LtcIcon from "@site/static/img/ltc.png"

interface Asset {
  name: string
  ticker: string
  icon: string
  balance: number
  color: string
  percentage: number
}

const DEFAULT_ASSETS: Asset[] = [
  { name: "Bitcoin", ticker: "BTCUSD", icon: BtcIcon, balance: 0.0123456, color: "#F7931A", percentage: 50 },
  { name: "Ethereum", ticker: "ETHUSD", icon: EthIcon, balance: 1.4521, color: "#627EEA", percentage: 25 },
  { name: "Tether", ticker: "USDTUSD", icon: TetherIcon, balance: 1250.0, color: "#26A17B", percentage: 15 },
  { name: "Litecoin", ticker: "LTCUSD", icon: LtcIcon, balance: 3.8712, color: "#BFBBBB", percentage: 10 },
]

function formatCurrency(value: number, decimals = 2) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}

// ── Balance Overview ──

interface BalanceOverviewProps {
  balance?: number
  change?: number
  changePercent?: number
  className?: string
}

export function BalanceOverview({
  balance = 12345.23,
  change = 45.0,
  changePercent = 1.03,
  className,
}: BalanceOverviewProps) {
  const isPositive = change >= 0

  return (
    <Card className={cn("w-[480px] rounded-[20px] border border-border p-8", className)}>
      <div className="flex flex-col items-center gap-1">
        <span className="text-4xl font-bold tracking-tight text-foreground">
          {formatCurrency(balance)}
        </span>
        <div className="flex items-center gap-2">
          <span className={cn("text-sm font-medium", isPositive ? "text-green-600" : "text-destructive")}>
            {isPositive ? "+" : ""}{formatCurrency(change)}
          </span>
          <span className={cn("text-sm font-medium", isPositive ? "text-green-600" : "text-destructive")}>
            {isPositive ? "+" : ""}{changePercent.toFixed(2)}%
          </span>
        </div>
      </div>

      <div className="mt-8 flex gap-3">
        <Button rounded="full" className="flex-1 gap-1.5 bg-foreground text-background hover:bg-foreground/90">
          <QrCode className="size-4" />
          <span className="font-mono text-xs uppercase tracking-wider">Receive</span>
        </Button>
        <Button rounded="full" className="flex-1 gap-1.5 bg-foreground text-background hover:bg-foreground/90">
          <Send className="size-4" />
          <span className="font-mono text-xs uppercase tracking-wider">Send</span>
        </Button>
        <Button rounded="full" className="flex-1 gap-1.5 bg-foreground text-background hover:bg-foreground/90">
          <ArrowLeftRight className="size-4" />
          <span className="font-mono text-xs uppercase tracking-wider">Swap</span>
        </Button>
        <Button rounded="full" className="flex-1 gap-1.5 bg-foreground text-background hover:bg-foreground/90">
          <DollarSign className="size-4" />
          <span className="font-mono text-xs uppercase tracking-wider">Buy</span>
        </Button>
      </div>
    </Card>
  )
}

// ── Asset Allocation Bar ──

interface AssetAllocationBarProps {
  assets?: Asset[]
  className?: string
}

export function AssetAllocationBar({ assets = DEFAULT_ASSETS, className }: AssetAllocationBarProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex h-3 w-full overflow-hidden rounded-full">
        {assets.map((asset) => (
          <div
            key={asset.ticker}
            style={{ width: `${asset.percentage}%`, backgroundColor: asset.color }}
            className="h-full first:rounded-l-full last:rounded-r-full"
          />
        ))}
      </div>
      <div className="relative flex w-full">
        {assets.map((asset, i) => {
          const offset = assets.slice(0, i).reduce((sum, a) => sum + a.percentage, 0)
          return (
            <div
              key={asset.ticker}
              className="absolute flex items-center justify-center"
              style={{ left: `${offset + asset.percentage / 2}%`, transform: "translateX(-50%)" }}
            >
              <img
                src={asset.icon}
                alt={asset.name}
                className="size-5 rounded-full"
                draggable={false}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Portfolio Summary ──

interface PortfolioSummaryProps {
  totalBalance?: number
  assets?: Asset[]
  className?: string
}

export function PortfolioSummary({
  totalBalance = 12345,
  assets = DEFAULT_ASSETS,
  className,
}: PortfolioSummaryProps) {
  return (
    <Card className={cn("w-[480px] rounded-[20px] border border-border p-8", className)}>
      <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        Total Assets
      </span>

      <div className="mt-2 text-5xl font-bold tracking-tight text-foreground">
        {formatCurrency(totalBalance, 0)}
      </div>

      <div className="mt-6">
        <AssetAllocationBar assets={assets} />
      </div>

      <div className="mt-10 flex gap-3">
        <Button rounded="full" className="flex-1 bg-foreground text-background hover:bg-foreground/90">
          <span className="font-mono text-xs uppercase tracking-wider">Send</span>
        </Button>
        <Button variant="secondary" rounded="full" className="flex-1">
          <span className="font-mono text-xs uppercase tracking-wider">Receive</span>
        </Button>
        <Button variant="secondary" rounded="full" className="flex-1">
          <span className="font-mono text-xs uppercase tracking-wider">Deposit</span>
        </Button>
        <Button variant="secondary" rounded="full" className="flex-1">
          <span className="font-mono text-xs uppercase tracking-wider">Convert</span>
        </Button>
      </div>
    </Card>
  )
}

// ── Asset List Item ──

interface AssetListItemProps {
  name?: string
  ticker?: string
  icon?: string
  balance?: number
  className?: string
}

export function AssetListItem({
  name = "Bitcoin",
  ticker = "BTCUSD",
  icon = BtcIcon,
  balance = 0.0123456,
  className,
}: AssetListItemProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-xl bg-muted px-5 py-4",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <img
          src={icon}
          alt={name}
          className="size-8 rounded-full"
          draggable={false}
        />
        <div className="flex items-baseline gap-2">
          <span className="text-base font-semibold text-foreground">{name}</span>
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            {ticker}
          </span>
        </div>
      </div>
      <span className="font-mono text-base text-foreground">
        {balance.toFixed(7)}
      </span>
    </div>
  )
}
