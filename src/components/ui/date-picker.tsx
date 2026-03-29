import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@site/src/lib/utils"
import { Button } from "@site/src/components/ui/button"
import { Calendar } from "@site/src/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@site/src/components/ui/popover"

interface DatePickerProps {
  label?: string
  placeholder?: string
  date?: Date
  onDateChange?: (date: Date | undefined) => void
}

function DatePicker({ label, placeholder = "Pick a date", date: controlledDate, onDateChange }: DatePickerProps) {
  const [internalDate, setInternalDate] = React.useState<Date | undefined>(undefined)
  const date = controlledDate !== undefined ? controlledDate : internalDate
  const setDate = onDateChange || setInternalDate

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-medium text-foreground">{label}</label>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
DatePicker.displayName = "DatePicker"

export { DatePicker }
