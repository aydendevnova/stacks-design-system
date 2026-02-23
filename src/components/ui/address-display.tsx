import React, { useState } from "react"
import { Copy, QrCode, Share2, Check } from "lucide-react"
import { Button } from "./button"
import { Card } from "./card"
import { cn } from "@site/src/lib/utils"

import StacksLogo from "@site/static/img/stx-logo.png"

function useCopyAddress(address: string) {
  const [copied, setCopied] = useState(false)
  function copy() {
    navigator.clipboard.writeText(address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return { copied, copy }
}

interface InlineAddressProps {
  address?: string
  className?: string
}

export function InlineAddress({ address = "SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7", className }: InlineAddressProps) {
  const short = `${address.slice(0, 6)}...${address.slice(-4)}`
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-md bg-muted px-5 py-2",
        className
      )}
    >
      <span
        className="flex items-center justify-center"
        aria-hidden="true"
        tabIndex={-1}
        style={{ pointerEvents: "none", userSelect: "none" }}
      >
        <img
          src={StacksLogo}
          alt="Stacks Logo"
          className="size-4 block"
          draggable={false}
          style={{ display: 'block' }}
        />
      </span>
      <span className="font-mono text-sm uppercase tracking-wider text-foreground">
        {short}
      </span>
    </div>
  )
}

interface WalletAddressButtonProps {
  address?: string
  className?: string
}

export function WalletAddressButton({ address = "SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7", className }: WalletAddressButtonProps) {
  const short = `${address.slice(0, 6)}...${address.slice(-4)}`
  const { copied, copy } = useCopyAddress(address)

  return (
    <button
      onClick={copy}
      className={cn("flex flex-col items-center gap-0.5 text-center text-foreground", className)}
    >
      <span className="text-base font-bold">Wallet Address</span>
      <span className="flex items-center gap-1.5 text-base">
        {copied ? <Check className="size-4 text-green-600" /> : <Copy className="size-4 text-muted-foreground" />}
        <span className="font-mono">{short}</span>
      </span>
    </button>
  )
}

interface AddressShareCardProps {
  address?: string
  variant?: "default" | "qr"
  qrCodeSrc?: string
  className?: string
}

export function AddressShareCard({
  address = "SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7",
  variant = "default",
  qrCodeSrc,
  className,
}: AddressShareCardProps) {
  const short = `${address.slice(0, 6)}...${address.slice(-4)}`
  const { copied, copy } = useCopyAddress(address)

  return (
    <Card className={cn("w-[420px] rounded-[20px] border border-border p-8", className)}>
      <div
        className={cn(
          "flex w-full items-center justify-center rounded-2xl bg-muted",
          variant === "qr" ? "flex-col gap-3 pb-4 pt-8" : "py-10"
        )}
      >
        {variant === "qr" && qrCodeSrc && (
          <img
            src={qrCodeSrc}
            alt={`QR code for ${short}`}
            className="size-[172px] rounded-md"
          />
        )}
        <div className="inline-flex items-center gap-3 rounded-md px-6 py-2.5">
          <span className="flex items-center justify-center" aria-hidden="true" tabIndex={-1} style={{ pointerEvents: "none", userSelect: "none" }}>
            <img src={StacksLogo} alt="Stacks Logo" className="size-5 block mb-[1px]" draggable={false} style={{ display: 'block' }} />
          </span>
          <span className="font-mono text-lg uppercase tracking-wider text-foreground">{short}</span>
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center gap-1 text-center">
        <h3 className="text-xl font-medium tracking-tight text-foreground">
          Share Your Wallet Address
        </h3>
        <p className="text-sm text-muted-foreground">
          Send and receive crypto effortlessly.
        </p>
      </div>

      <div className="mt-6 flex gap-3">
        {variant === "default" ? (
          <Button rounded="full" className="flex-1 gap-1.5 bg-foreground text-background hover:bg-foreground/90">
            <QrCode className="size-4" />
            <span className="font-mono text-xs uppercase tracking-wider">View QR Code</span>
          </Button>
        ) : (
          <Button variant="secondary" rounded="full" className="flex-1 gap-1.5">
            <Share2 className="size-4" />
            <span className="font-mono text-xs uppercase tracking-wider">Share</span>
          </Button>
        )}
        <Button rounded="full" className="flex-1 gap-1.5 bg-foreground text-background hover:bg-foreground/90" onClick={copy}>
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          <span className="font-mono text-xs uppercase tracking-wider">
            {copied ? "Copied!" : "Copy Address"}
          </span>
        </Button>
      </div>
    </Card>
  )
}
