import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React, { useRef } from "react";

import CardNoOfQueries from "../cardNoOfQueries";
import { Calendar } from "./calendar";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

interface DatePickerPopoverProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  selectedDateObj: Date;
  handleCancel: () => void;
  handleDone: () => void;
  selectedDate?: string;
}

const DatePickerPopover: React.FC<DatePickerPopoverProps> = ({
  isOpen,
  setIsOpen,
  date,
  setDate,
  selectedDateObj,
  handleCancel,
  handleDone,
  selectedDate,
}) => {
  const popoverRef = useRef<HTMLDivElement>(null);

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
    </div>
  );
};

export default DatePickerPopover;
