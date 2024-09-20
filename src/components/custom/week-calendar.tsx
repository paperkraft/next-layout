'use client'
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

  const changeMonthHandle = (btnType: string) => {
    if (btnType === "prev") {
      setCurrentMonth(subMonths(currentMonth, 1));
    }
    if (btnType === "next") {
      setCurrentMonth(addMonths(currentMonth, 1));
    }
  };

  const changeWeekHandle = (btnType: string) => {
    if (btnType === "prev") {
      setCurrentMonth(subWeeks(currentMonth, 1));
    }
    if (btnType === "next") {
      setCurrentMonth(addWeeks(currentMonth, 1));
    }
  };

  const renderHeader = () => {
    const dateFormat = "MMM yyyy";
    return (
      <div className="flex gap-2 justify-center item-center" aria-labelledby="month">
        <ChevronLeft onClick={() => changeMonthHandle("prev")} className="cursor-pointer h-6 w-6 text-gray-200 hover:text-gray-400"/>
        {format(currentMonth, dateFormat)}
        <ChevronRight onClick={() => changeMonthHandle("next")} className="cursor-pointer h-6 w-6 text-gray-200 hover:text-gray-400"/>
      </div>
    );
  };

  const renderDays = () => {
    const dateFormat = "EEE";
    const days = [];
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 0 });
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className={cn("flex flex-1 justify-center", {"text-red-500": i == 0})} key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return (
        <div className="flex" aria-labelledby="days">
            {days}
        </div>
    )
  };

  const renderCells = () => {
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 0 });
    const endDate = lastDayOfWeek(currentMonth, { weekStartsOn: 0 });
    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        days.push(
          <div key={i}
            className={cn("flex flex-1 justify-center",{
                "text-blue-500 font-semibold" : isSameDay(day, new Date()),
                "text-red-500" : isSunday(new Date(day))
            })}
          >
            {formattedDate}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(days);
      days = [];
    }
    
    return(
        <div className="flex" aria-labelledby={'dates'}>
            {rows}
        </div>
    )
  };

  return (
    <div className="border p-2 md:p-4 rounded">
      {renderHeader()}
      <Separator className="my-4"/>
      <div className="flex items-center">
        <ChevronLeft onClick={() => changeWeekHandle("prev")} className="cursor-pointer h-6 w-6 text-gray-200 hover:text-gray-400"/>
        <div className="flex flex-1 flex-col">
            {renderDays()}
            {renderCells()}
        </div>
        <ChevronRight onClick={() => changeWeekHandle("next")} className="cursor-pointer h-6 w-6 text-gray-200 hover:text-gray-400"/>
      </div>
    </div>
  );
};

export default WeekCalendar;