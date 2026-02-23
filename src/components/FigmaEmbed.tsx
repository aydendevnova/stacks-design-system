import React from 'react'

interface FigmaEmbedProps {
  url: string
  title?: string
  height?: number
}

function FigmaEmbed({ url, title = 'Figma Design', height = 600 }: FigmaEmbedProps) {
  const embedUrl = `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(url)}`

  return (
    <div style={{
      border: '1px solid var(--ifm-color-emphasis-200)',
      borderRadius: '12px',
      overflow: 'hidden',
      marginBottom: '1.5rem',
    }}>
      <iframe
        title={title}
        style={{ border: 'none', width: '100%', height }}
        src={embedUrl}
        allowFullScreen
      />
    </div>
  )
}

export default FigmaEmbed
