import React, { useState } from 'react'
import styles from './ColorPalette.module.css'

interface ColorSwatch {
  name: string
  hex: string
}

interface ColorRowProps {
  label: string
  colors: ColorSwatch[]
}

function isLightColor(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.5
}

function SwatchCell({ name, hex }: ColorSwatch) {
  const [copied, setCopied] = useState(false)
  const light = isLightColor(hex)

  function handleCopy() {
    navigator.clipboard.writeText(hex)
    setCopied(true)
    setTimeout(() => setCopied(false), 1200)
  }

  return (
    <button className={styles.cell} onClick={handleCopy} title={`Copy ${hex}`}>
      <div className={styles.cellColor} style={{ backgroundColor: hex }}>
        <span className={`${styles.cellCopy} ${light ? styles.dark : styles.light}`}>
          {copied ? '✓' : ''}
        </span>
      </div>
      <div className={styles.cellMeta}>
        <span className={styles.cellName}>{name}</span>
        <code className={styles.cellHex}>{hex}</code>
      </div>
    </button>
  )
}

export function ColorRow({ label, colors }: ColorRowProps) {
  return (
    <div className={styles.row}>
      <span className={styles.rowLabel}>{label}</span>
      <div className={styles.rowSwatches}>
        {colors.map((c) => (
          <SwatchCell key={`${c.name}-${c.hex}`} {...c} />
        ))}
      </div>
    </div>
  )
}

interface PaletteCanvasProps {
  children: React.ReactNode
  mode?: 'light' | 'dark'
}

export function PaletteCanvas({ children, mode }: PaletteCanvasProps) {
  const isDark = mode !== 'light'
  const bg = isDark ? '#141414' : '#F4F3F1'
  const cls = `${styles.canvas} ${isDark ? styles.canvasDark : styles.canvasLight}`

  return (
    <div className={cls} style={{ backgroundColor: bg }}>
      {mode && <span className={styles.canvasLabel}>{mode === 'light' ? 'Light Mode' : 'Dark Mode'}</span>}
      {children}
    </div>
  )
}

export function PaletteSplit({ children }: { children: React.ReactNode }) {
  return <div className={styles.split}>{children}</div>
}
