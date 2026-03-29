import * as React from "react"
import { cn } from "@site/src/lib/utils"
import { Upload, Pencil, Download, Trash2 } from "lucide-react"

interface FileItem {
  file: File | null
  id: string
  preview: string | null
  name: string
}

interface FileUploadProps {
  label?: string
  maxFiles?: number
  maxSizeMB?: number
  accept?: string
  onChange?: (files: File[]) => void
  defaultPreviewUrls?: string[]
  className?: string
}

function FileUpload({
  label = "File Uploader",
  maxFiles = 2,
  maxSizeMB = 5,
  accept,
  onChange,
  defaultPreviewUrls,
  className,
}: FileUploadProps) {
  const [files, setFiles] = React.useState<FileItem[]>(() => {
    if (!defaultPreviewUrls?.length) return []
    return defaultPreviewUrls.map((url, i) => ({
      file: null,
      id: `default-${i}`,
      preview: url,
      name: `image-${i + 1}.png`,
    }))
  })
  const [isDragging, setIsDragging] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const addFiles = React.useCallback(
    (newFiles: FileList | File[]) => {
      const incoming = Array.from(newFiles)
      const valid = incoming.filter((f) => f.size <= maxSizeMB * 1024 * 1024)
      const items: FileItem[] = valid.map((file) => ({
        file,
        id: crypto.randomUUID(),
        preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : null,
        name: file.name,
      }))

      setFiles((prev) => {
        const next = [...prev, ...items].slice(0, maxFiles)
        onChange?.(next.filter((f) => f.file).map((f) => f.file!))
        return next
      })
    },
    [maxFiles, maxSizeMB, onChange]
  )

  const removeFile = React.useCallback(
    (id: string) => {
      setFiles((prev) => {
        const target = prev.find((f) => f.id === id)
        if (target?.preview && target.file) URL.revokeObjectURL(target.preview)
        const next = prev.filter((f) => f.id !== id)
        onChange?.(next.filter((f) => f.file).map((f) => f.file!))
        return next
      })
    },
    [onChange]
  )

  const handleDrop = React.useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files)
    },
    [addFiles]
  )

  const handleDragOver = React.useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = React.useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDownload = React.useCallback((item: FileItem) => {
    if (!item.preview) return
    const a = document.createElement("a")
    a.href = item.preview
    a.download = item.name
    a.click()
  }, [])

  React.useEffect(() => {
    return () => {
      files.forEach((f) => {
        if (f.preview && f.file) URL.revokeObjectURL(f.preview)
      })
    }
  }, [])

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label && (
        <div className="flex items-center gap-1.5 text-sm font-medium text-primary">
          <span className="text-xs">◆</span>
          <span>{label}</span>
        </div>
      )}

      <div className="rounded-lg border-2 border-dashed border-primary/30 p-4">
        <div
          className={cn(
            "relative flex flex-col items-center justify-center rounded-lg border px-6 py-8 transition-colors cursor-pointer",
            isDragging
              ? "border-primary bg-accent"
              : "border-border bg-card hover:border-primary/50"
          )}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => inputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              inputRef.current?.click()
            }
          }}
          aria-label={`Upload files. Maximum ${maxFiles} files, up to ${maxSizeMB}MB each`}
        >
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            multiple={maxFiles > 1}
            accept={accept}
            onChange={(e) => {
              if (e.target.files?.length) addFiles(e.target.files)
              e.target.value = ""
            }}
          />
          <Upload className="h-6 w-6 text-muted-foreground mb-3" />
          <p className="text-sm font-semibold text-foreground">Drag & drop files here</p>
          <p className="text-xs text-muted-foreground mt-1">
            Or click to browse (max {maxFiles} files, up to {maxSizeMB}MB each)
          </p>
          <button
            type="button"
            className="mt-4 inline-flex items-center justify-center rounded-md bg-foreground px-5 py-2 text-xs font-semibold uppercase tracking-wider text-background transition-colors hover:bg-foreground/90"
            onClick={(e) => {
              e.stopPropagation()
              inputRef.current?.click()
            }}
          >
            Browse Files
          </button>
        </div>

        {files.length > 0 && (
          <div className="flex flex-col gap-3 mt-4">
            {files.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-3 rounded-lg border-2 border-dashed border-primary/20 p-3"
              >
              <div className="h-32 flex-1 min-w-0 overflow-hidden rounded-md bg-[#f8e8f0]">
                {item.preview ? (
                  <img
                    src={item.preview}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                    {item.name.split(".").pop()?.toUpperCase()}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                  <button
                    type="button"
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-ghost-hover hover:text-foreground"
                    onClick={() => {}}
                    aria-label={`Edit ${item.name}`}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-ghost-hover hover:text-foreground"
                    onClick={() => handleDownload(item)}
                    aria-label={`Download ${item.name}`}
                  >
                    <Download className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-destructive/30 text-destructive transition-colors hover:bg-destructive/10"
                    onClick={() => removeFile(item.id)}
                    aria-label={`Delete ${item.name}`}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export { FileUpload }
export type { FileUploadProps }
