'use client'
import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePickerDemo() {
  const [date, setDate] = React.useState<Date>()
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedDate, setSelectedDate] = React.useState<string>("") // State to hold the selected date string
  const popoverRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        // Reset the date if the user clicked outside the popover
        setDate(undefined)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleCancel = () => {
    // Reset the date when the "Cancel" button is clicked
    setDate(undefined)
    // Close the popover
    setIsOpen(false)
  }

  const handleDone = () => {
    // Convert the Date object to a string
    const dateString = date ? format(date, "PPP") : "";
  
    // Update the selectedDate state with the dateString
    setSelectedDate(dateString);

    // Log the selected date as a string to the console
    console.log("Selected date (string):", dateString);
  }

  return (
    <div>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
                <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? `${format(date, "PPP")}` : "Pick a date"}
        </Button>

        </PopoverTrigger>
        
        <PopoverContent className="w-auto p-0" ref={popoverRef}>

                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />

          <div className="flex justify-end gap-2 pt-4 pb-4 pr-4">
            <Button onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleDone}>Done</Button>
          </div>
        </PopoverContent>
      </Popover>

  
    
    </div>
  )
}
