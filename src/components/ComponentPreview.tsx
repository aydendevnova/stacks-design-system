import React from 'react'
import styles from './ComponentPreview.module.css'

interface ComponentPreviewProps {
  children: React.ReactNode
  className?: string
  column?: boolean
}

export function ComponentPreview({ children, className, column }: ComponentPreviewProps) {
  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.preview} stacks-theme ${className || ''}`}
        style={column ? { flexDirection: 'column', alignItems: 'stretch' } : undefined}
      >
        {children}
      </div>
    </div>
  )
}
