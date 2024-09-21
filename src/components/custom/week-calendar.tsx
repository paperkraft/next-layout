'use client';
import { useState } from "react";
import {
  format,
  subMonths,
  addMonths,
  startOfWeek,
  addDays,
  isSameDay,
  isSunday,
  lastDayOfWeek,
  addWeeks,
  subWeeks
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";

const WeekCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const changeDateHandle = (btnType: string, isWeek: boolean) => {
    if (isWeek) {
      const originalMonth = currentMonth.getMonth();
      const newDate = btnType === "prev" ? subWeeks(currentMonth, 1) : addWeeks(currentMonth, 1);
      setCurrentMonth(newDate);
      
      // Check if the month has changed
      if (newDate.getMonth() !== originalMonth) {
        setCurrentMonth(newDate);
      }
    } else {
      btnType === "prev" ? setCurrentMonth(subMonths(currentMonth, 1)) : setCurrentMonth(addMonths(currentMonth, 1));
    }
  };

  const renderHeader = () => {
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 0 });
    const endDate = lastDayOfWeek(currentMonth, { weekStartsOn: 0 });
    const startMonth = startDate.getMonth();
    const endMonth = endDate.getMonth();

    // Format the header based on the months
    let header;
    if (startMonth === endMonth) {
      header = format(startDate, "MMM yyyy");
    } else {
      header = `${format(startDate, "MMM")} - ${format(endDate, "MMM yyyy")}`;
    }

    return (
      <div className="flex gap-2 justify-center items-center" aria-labelledby="month">
        <ChevronLeft onClick={() => changeDateHandle("prev", false)} className="cursor-pointer h-6 w-6 text-gray-200 hover:text-gray-400" aria-label="Previous month" />
        {header}
        <ChevronRight onClick={() => changeDateHandle("next", false)} className="cursor-pointer h-6 w-6 text-gray-200 hover:text-gray-400" aria-label="Next month" />
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 0 });
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className={cn("flex flex-1 justify-center", { "text-red-500": i === 0 })} key={i}>
          {format(addDays(startDate, i), "EEE")}
        </div>
      );
    }
    return <div className="flex" aria-labelledby="days">{days}</div>;
  };

  const renderCells = () => {
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 0 });
    const endDate = lastDayOfWeek(currentMonth, { weekStartsOn: 0 });
    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        days.push(
          <div key={day.toString()}
            className={cn("flex flex-1 justify-center", {
                "text-blue-500 font-semibold": isSameDay(day, new Date()),
                "text-red-500": isSunday(day)
            })}
          >
            {format(day, "d")}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(<div key={rows.length} className="flex">{days}</div>);
      days = [];
    }

    return <div aria-labelledby='dates'>{rows}</div>;
  };

  return (
    <div className="border p-2 md:p-4 rounded">
      {renderHeader()}
      <Separator className="my-4" />
      <div className="flex items-center">
        <ChevronLeft onClick={() => changeDateHandle("prev", true)} className="cursor-pointer h-6 w-6 text-gray-200 hover:text-gray-400" aria-label="Previous week" />
        <div className="flex flex-1 flex-col">
          {renderDays()}
          {renderCells()}
        </div>
        <ChevronRight onClick={() => changeDateHandle("next", true)} className="cursor-pointer h-6 w-6 text-gray-200 hover:text-gray-400" aria-label="Next week" />
      </div>
    </div>
  );
};

export default WeekCalendar;