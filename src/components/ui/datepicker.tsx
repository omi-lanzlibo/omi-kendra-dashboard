"use client";
import * as React from "react";
import { format, parse } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CardNoOfQueries from "../cardNoOfQueries";

export function DatePickerDemo() {
  const [date, setDate] = React.useState<Date | undefined>();
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<string>(
    format(new Date(), "yyyy/MM/dd")
  );
  const popoverRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setDate(undefined);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCancel = () => {
    setDate(undefined);
    setIsOpen(false);
  };

  const handleDone = () => {
    if (date) {
      setSelectedDate(format(date, "yyyy/MM/dd"));
    } else {
      setSelectedDate(format(new Date(), "yyyy/MM/dd"));
    }
    setDate(undefined);
    setIsOpen(false);
  };

  // Parse the selectedDate string back to a Date object
  const selectedDateObj = parse(selectedDate, "yyyy/MM/dd", new Date());

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
            {date
              ? `${format(date, "PPP")}`
              : `${format(selectedDateObj, "PPP")}`}
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
      {/* 
      <CardNoOfQueries date={selectedDate || format(new Date(), "yyyy/MM/dd")} maxQueryPerDay={0} /> */}
    </div>
  );
}
