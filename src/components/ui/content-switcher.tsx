import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import { cn } from "@site/src/lib/utils"

const ContentSwitcher = React.forwardRef<
  React.ComponentRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn(
      "inline-flex items-center gap-0.5 rounded-lg bg-secondary p-1",
      className
    )}
    {...props}
  />
))
ContentSwitcher.displayName = "ContentSwitcher"

const ContentSwitcherOption = React.forwardRef<
  React.ComponentRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>
>(({ className, ...props }, ref) => (
  <ToggleGroupPrimitive.Item
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center px-5 py-2 text-[11px] font-semibold uppercase tracking-widest transition-colors",
      "rounded text-foreground",
      "data-[state=on]:bg-foreground data-[state=on]:text-background",
      "hover:bg-ghost-hover data-[state=on]:hover:bg-foreground",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
ContentSwitcherOption.displayName = "ContentSwitcherOption"

export { ContentSwitcher, ContentSwitcherOption }
