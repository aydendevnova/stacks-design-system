import React, { useState } from "react"
import { Search, ChevronDown } from "lucide-react"
import { cn } from "@site/src/lib/utils"

import EthIcon from "@site/static/img/eth.png"
import DaiIcon from "@site/static/img/dai.png"

type FeatureType = "arrakis" | "none" | "unknown"

interface PoolRow {
  token0Icon: string
  token1Icon: string
  token0Name: string
  token1Name: string
  fee: string
  tvl: string
  yield24h: string
  volume24h: string
  feature: FeatureType
}

const FEATURE_STYLES: Record<FeatureType, string> = {
  arrakis: "bg-[#E8713A] text-white",
  none: "bg-[#4A4A4A] text-white",
  unknown: "bg-[#D94B2B] text-white",
}

const FEATURE_LABELS: Record<FeatureType, string> = {
  arrakis: "ARRAKIS",
  none: "NONE",
  unknown: "UNKNOWN",
}

const DEFAULT_POOLS: PoolRow[] = [
  { token0Icon: DaiIcon, token1Icon: EthIcon, token0Name: "DAI", token1Name: "ETH", fee: "0.3%", tvl: "$180.63m", yield24h: "0.012%", volume24h: "$20.52m", feature: "arrakis" },
  { token0Icon: DaiIcon, token1Icon: EthIcon, token0Name: "DAI", token1Name: "ETH", fee: "0.3%", tvl: "$180.63m", yield24h: "0.012%", volume24h: "$20.52m", feature: "none" },
  { token0Icon: DaiIcon, token1Icon: EthIcon, token0Name: "DAI", token1Name: "ETH", fee: "0.3%", tvl: "$180.63m", yield24h: "0.012%", volume24h: "$20.52m", feature: "unknown" },
  { token0Icon: DaiIcon, token1Icon: EthIcon, token0Name: "DAI", token1Name: "ETH", fee: "0.3%", tvl: "$180.63m", yield24h: "0.012%", volume24h: "$20.52m", feature: "arrakis" },
  { token0Icon: DaiIcon, token1Icon: EthIcon, token0Name: "DAI", token1Name: "ETH", fee: "0.3%", tvl: "$180.63m", yield24h: "0.012%", volume24h: "$20.52m", feature: "arrakis" },
  { token0Icon: DaiIcon, token1Icon: EthIcon, token0Name: "DAI", token1Name: "ETH", fee: "0.3%", tvl: "$180.63m", yield24h: "0.012%", volume24h: "$20.52m", feature: "arrakis" },
  { token0Icon: DaiIcon, token1Icon: EthIcon, token0Name: "DAI", token1Name: "ETH", fee: "0.3%", tvl: "$180.63m", yield24h: "0.012%", volume24h: "$20.52m", feature: "arrakis" },
  { token0Icon: DaiIcon, token1Icon: EthIcon, token0Name: "DAI", token1Name: "ETH", fee: "0.3%", tvl: "$180.63m", yield24h: "0.012%", volume24h: "$20.52m", feature: "arrakis" },
  { token0Icon: DaiIcon, token1Icon: EthIcon, token0Name: "DAI", token1Name: "ETH", fee: "0.3%", tvl: "$180.63m", yield24h: "0.012%", volume24h: "$20.52m", feature: "arrakis" },
  { token0Icon: DaiIcon, token1Icon: EthIcon, token0Name: "DAI", token1Name: "ETH", fee: "0.3%", tvl: "$180.63m", yield24h: "0.012%", volume24h: "$20.52m", feature: "arrakis" },
  { token0Icon: DaiIcon, token1Icon: EthIcon, token0Name: "DAI", token1Name: "ETH", fee: "0.3%", tvl: "$180.63m", yield24h: "0.012%", volume24h: "$20.52m", feature: "arrakis" },
]

// ── Token Pair Cell ──

interface TokenPairProps {
  token0Icon: string
  token1Icon: string
  token0Name: string
  token1Name: string
  fee: string
  className?: string
}

function TokenPair({ token0Icon, token1Icon, token0Name, token1Name, fee, className }: TokenPairProps) {
  return (
    <div className={cn("flex items-center gap-2.5 whitespace-nowrap", className)}>
      <div className="relative flex shrink-0 items-center">
        <img src={token0Icon} alt={token0Name} className="size-6 rounded-full" draggable={false} />
        <img src={token1Icon} alt={token1Name} className="-ml-1.5 size-6 rounded-full" draggable={false} />
      </div>
      <span className="text-sm font-medium text-foreground">
        {token0Name} / {token1Name}
      </span>
      <span className="rounded bg-[#F0F0F0] px-1.5 py-0.5 text-[11px] font-medium text-[#666]">
        {fee}
      </span>
    </div>
  )
}

// ── Feature Badge ──

interface FeatureBadgeProps {
  feature: FeatureType
  className?: string
}

function FeatureBadge({ feature, className }: FeatureBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full px-5 py-1.5 text-[11px] font-semibold uppercase tracking-wider",
        FEATURE_STYLES[feature],
        className,
      )}
    >
      {FEATURE_LABELS[feature]}
    </span>
  )
}

// ── Token Filter Select (visual only) ──

interface TokenFilterProps {
  icon?: string
  label: string
  className?: string
}

function TokenFilter({ icon, label, className }: TokenFilterProps) {
  return (
    <button
      type="button"
      className={cn(
        "flex h-10 items-center gap-2 rounded-full border border-[#E0E0E0] bg-white px-4 text-sm font-medium text-foreground",
        className,
      )}
    >
      {icon && <img src={icon} alt="" className="size-5 rounded-full" draggable={false} />}
      <span>{label}</span>
      <ChevronDown className="ml-0.5 size-4 text-[#999]" />
    </button>
  )
}

// ── Main Liquidity Pool Component ──

interface LiquidityPoolProps {
  pools?: PoolRow[]
  className?: string
}

export function LiquidityPool({ pools = DEFAULT_POOLS, className }: LiquidityPoolProps) {
  const [search, setSearch] = useState("")

  return (
    <div
      className={cn("w-full rounded-2xl bg-[#FAF7F4] p-6 sm:p-8", className)}
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <h2 className="m-0 text-[28px] font-medium leading-tight text-foreground sm:text-[32px]">Liquidity pool</h2>
      <p className="mt-2 max-w-[560px] text-[15px] leading-relaxed text-[#666]">
        A component displaying liquidity pool information including token pairs, fees, performance metrics, and feature indicators.
      </p>

      {/* Filter bar */}
      <div className="mt-6 flex flex-wrap items-center gap-2.5">
        <TokenFilter icon={EthIcon} label="ETH" />
        <TokenFilter label="Select a token" className="text-[#999]" />
        <div className="relative min-w-[200px] flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#999]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by token, pool address, or feature"
            className="h-10 w-full rounded-full border border-[#E0E0E0] bg-white pl-9 pr-4 text-sm text-foreground placeholder:text-[#999] focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      {/* Table */}
      <div className="mt-5 w-full overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          <thead>
            <tr className="border-b border-[#E5E5E5]">
              <th className="whitespace-nowrap pb-3 pr-3 text-left text-[11px] font-semibold uppercase tracking-widest text-[#999]">Pool</th>
              <th className="whitespace-nowrap pb-3 px-3 text-left text-[11px] font-semibold uppercase tracking-widest text-[#999]">TVL</th>
              <th className="whitespace-nowrap pb-3 px-3 text-left text-[11px] font-semibold uppercase tracking-widest text-[#999]">Yield (24h)</th>
              <th className="whitespace-nowrap pb-3 px-3 text-left text-[11px] font-semibold uppercase tracking-widest text-[#999]">Volume (24h)</th>
              <th className="whitespace-nowrap pb-3 pl-3 text-right text-[11px] font-semibold uppercase tracking-widest text-[#999]">Feature</th>
            </tr>
          </thead>
          <tbody>
            {pools.map((pool, i) => (
              <tr key={i} className="border-b border-[#F0EDED]">
                <td className="py-3.5 pr-3">
                  <TokenPair
                    token0Icon={pool.token0Icon}
                    token1Icon={pool.token1Icon}
                    token0Name={pool.token0Name}
                    token1Name={pool.token1Name}
                    fee={pool.fee}
                  />
                </td>
                <td className="whitespace-nowrap px-3 py-3.5 text-sm font-medium text-foreground">{pool.tvl}</td>
                <td className="whitespace-nowrap px-3 py-3.5 text-sm font-medium text-foreground">{pool.yield24h}</td>
                <td className="whitespace-nowrap px-3 py-3.5 text-sm font-medium text-foreground">{pool.volume24h}</td>
                <td className="py-3.5 pl-3 text-right">
                  <FeatureBadge feature={pool.feature} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export { TokenPair, FeatureBadge, TokenFilter }
export type { PoolRow, FeatureType, LiquidityPoolProps }
