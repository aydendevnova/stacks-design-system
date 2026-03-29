import * as React from "react"
import { Button } from "@site/src/components/ui/button"
import {
  Toast,
  ToastAction,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@site/src/components/ui/toast"

export function ToastDemo() {
  const [open, setOpen] = React.useState(false)
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  function handleClick() {
    setOpen(false)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setOpen(true), 100)
  }

  return (
    <ToastProvider swipeDirection="right">
      <Button variant="outline" onClick={handleClick}>
        Click to see
      </Button>

      <Toast
        open={open}
        onOpenChange={setOpen}
        duration={5000}
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <div className="flex flex-col gap-1">
          <ToastTitle>Scheduled: Catch up</ToastTitle>
          <ToastDescription>
            Friday, February 10, 2023 at 5:57 PM
          </ToastDescription>
        </div>
        <ToastAction
          altText="Undo scheduling"
          className="uppercase text-xs tracking-wider font-semibold"
        >
          UNDO
        </ToastAction>
      </Toast>

      <ToastViewport className="fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col p-4 md:max-w-[420px]" />
    </ToastProvider>
  )
}
