"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { endOfDay, isAfter, isBefore, startOfDay } from "date-fns";

export function Calendar22({
  error,
  value,
  onChange,
  dateBefore,
  dateAfter,
}: {
  error: string | undefined;
  value: Date | undefined;
  onChange: React.Dispatch<React.SetStateAction<Date | undefined>>;
  dateBefore?: Date;
  dateAfter?: Date;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            aria-invalid={error ? true : false}
            variant="outline"
            id="date"
            className="w-full justify-between font-normal"
          >
            {value ? value.toLocaleDateString() : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            disabled={(date) => {
              if (dateBefore && isBefore(date, startOfDay(dateBefore))) {
                return true;
              }
              if (dateAfter && isAfter(date, endOfDay(dateAfter))) {
                return true;
              }
              return false;
            }}
            captionLayout="dropdown"
            onSelect={(date) => {
              onChange(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
