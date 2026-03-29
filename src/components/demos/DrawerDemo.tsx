import * as React from "react"
import { Button } from "@site/src/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@site/src/components/ui/drawer"

export function DrawerDemo() {
  const [goal, setGoal] = React.useState(1124)

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader className="text-center">
            <DrawerTitle>Move Goal</DrawerTitle>
            <DrawerDescription>Set your daily move goal</DrawerDescription>
          </DrawerHeader>
          <div className="flex items-center justify-center gap-6 py-4">
            <button
              className="h-10 w-10 rounded-full border border-solid border-border flex items-center justify-center text-foreground text-lg hover:bg-ghost-hover transition-colors"
              onClick={() => setGoal(Math.max(0, goal - 10))}
            >
              −
            </button>
            <span
              className="text-4xl font-bold text-foreground tabular-nums"
              style={{ minWidth: 100, textAlign: "center" }}
            >
              {goal.toLocaleString()}
            </span>
            <button
              className="h-10 w-10 rounded-full border border-solid border-border flex items-center justify-center text-foreground text-lg hover:bg-ghost-hover transition-colors"
              onClick={() => setGoal(goal + 10)}
            >
              +
            </button>
          </div>
          <DrawerFooter className="flex-row justify-center">
            <DrawerClose asChild>
              <Button variant="ghost" className="uppercase text-xs tracking-wider font-bold">
                Cancel
              </Button>
            </DrawerClose>
            <DrawerClose asChild>
              <Button
                rounded="full"
                className="uppercase text-xs tracking-wider font-semibold px-6 bg-foreground text-background hover:bg-foreground/90"
              >
                Submit
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
