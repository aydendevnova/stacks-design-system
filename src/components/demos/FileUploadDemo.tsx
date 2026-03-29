import * as React from "react"
import { FileUpload } from "@site/src/components/ui/file-upload"

export function FileUploadDemo() {
  return (
    <div className="w-full max-w-[450px]">
      <FileUpload
        label="File Uploader"
        maxFiles={2}
        maxSizeMB={5}
        accept="image/*"
        defaultPreviewUrls={["/img/placeholder-avatar.png"]}
      />
    </div>
  )
}
