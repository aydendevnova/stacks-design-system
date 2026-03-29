import * as React from "react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@site/src/components/ui/dialog"
import { cn } from "@site/src/lib/utils"

export interface Token {
  symbol: string
  name: string
  icon: string
  balance?: string
}

interface TokenSelectorProps {
  tokens: Token[]
  popularTokens?: Token[]
  quickSelectTokens?: Token[]
  value?: Token
  onSelect?: (token: Token) => void
  trigger?: React.ReactNode
  placeholder?: string
}

function TokenSelector({
  tokens,
  popularTokens = [],
  quickSelectTokens = [],
  value,
  onSelect,
  trigger,
  placeholder = "Search categories",
}: TokenSelectorProps) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")

  const filteredTokens = tokens.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.symbol.toLowerCase().includes(search.toLowerCase())
  )

  const filteredPopular = popularTokens.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.symbol.toLowerCase().includes(search.toLowerCase())
  )

  function handleSelect(token: Token) {
    onSelect?.(token)
    setOpen(false)
    setSearch("")
  }

  return (
    <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) setSearch("") }}>
      <DialogTrigger asChild>
        {trigger || (
          <button className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm hover:bg-accent">
            {value ? (
              <>
                <img src={value.icon} alt={value.symbol} className="h-5 w-5 rounded-full" />
                <span className="font-medium text-foreground">{value.symbol}</span>
              </>
            ) : (
              <span className="text-muted-foreground">Select token</span>
            )}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[420px] p-0 gap-0 overflow-hidden">
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <DialogTitle className="text-base font-semibold text-foreground">
            Select a token
          </DialogTitle>
        </div>

        <div className="px-5 pb-3">
          <div className="relative">
            <div className="absolute left-3 inset-y-0 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-muted-foreground"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={placeholder}
              className="flex h-10 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm leading-10 text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        </div>

        {quickSelectTokens.length > 0 && !search && (
          <div className="px-5 pb-4">
            <div className="flex gap-2 overflow-x-auto">
              {quickSelectTokens.map((token) => (
                <button
                  key={token.symbol}
                  onClick={() => handleSelect(token)}
                  className="flex flex-col items-center gap-1.5 rounded-lg px-3 py-2 hover:bg-accent transition-colors min-w-[56px]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                    <img src={token.icon} alt={token.symbol} className="h-6 w-6 rounded-full" />
                  </div>
                  <span className="text-xs font-medium text-foreground">{token.symbol}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="max-h-[320px] overflow-y-auto pb-2">
          {filteredTokens.length > 0 && (
            <div>
              <div className="px-5 py-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Your Tokens
                </span>
              </div>
              {filteredTokens.map((token) => (
                <button
                  key={token.symbol + "-user"}
                  onClick={() => handleSelect(token)}
                  className="flex w-full items-center justify-between px-5 py-2.5 hover:bg-accent transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img src={token.icon} alt={token.symbol} className="h-8 w-8 rounded-full" />
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-medium text-foreground">{token.name}</span>
                      <span className="text-xs text-muted-foreground">{token.symbol}</span>
                    </div>
                  </div>
                  {token.balance && (
                    <span className="text-sm text-muted-foreground">{token.balance}</span>
                  )}
                </button>
              ))}
            </div>
          )}

          {filteredPopular.length > 0 && (
            <div>
              <div className="px-5 py-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Popular Tokens
                </span>
              </div>
              {filteredPopular.map((token) => (
                <button
                  key={token.symbol + "-popular"}
                  onClick={() => handleSelect(token)}
                  className="flex w-full items-center gap-3 px-5 py-2.5 hover:bg-accent transition-colors"
                >
                  <img src={token.icon} alt={token.symbol} className="h-8 w-8 rounded-full" />
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium text-foreground">{token.name}</span>
                    <span className="text-xs text-muted-foreground">{token.symbol}</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {filteredTokens.length === 0 && filteredPopular.length === 0 && (
            <div className="px-5 py-8 text-center text-sm text-muted-foreground">
              No tokens found
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export { TokenSelector }
