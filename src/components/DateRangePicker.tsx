import React, { useState, useEffect, useRef } from 'react';
import { cva } from 'class-variance-authority';

import { cn } from '@/utilits';
import LeftArrowIcon from '@/icons/LeftArrowIcon';
import RightArrowIcon from '@/icons/RightArrowIcon';

type DatePickerProps = {
  selectedDateRange: { start: Date | null; end: Date | null };
  onChange: (range: { start: Date | null; end: Date | null }) => void;
};

const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const DateRangePicker: React.FC<DatePickerProps> = ({
  selectedDateRange,
  onChange,
}) => {
  const today = new Date();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState(selectedDateRange);
  const [isSelectingEndDate, setIsSelectingEndDate] = useState(false);
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const datePickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    displayDates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month, year]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const daysInMonth = (month: number, year: number) =>
    new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (month: number, year: number) =>
    new Date(year, month, 1).getDay();

  const handleDateClick = (date: Date) => {
    if (!isSelectingEndDate) {
      setSelectedRange({ start: date, end: null });
      setIsSelectingEndDate(true);
    } else if (isSelectingEndDate && date >= (selectedRange.start || today)) {
      setSelectedRange((prev) => ({ ...prev, end: date }));
      setIsSelectingEndDate(false);
      setIsOpen(false);
    }
  };

  const displayDates = () => {
    const totalDays = daysInMonth(month, year);
    const firstDay = firstDayOfMonth(month, year);
    const dates = [];

    for (let i = 0; i < firstDay; i++) dates.push(null);
    for (let i = 1; i <= totalDays; i++) {
      const currentDate = new Date(year, month, i);
      dates.push({
        date: currentDate,
        isToday: currentDate.toDateString() === today.toDateString(),
      });
    }

    return dates;
  };

  const getDateRangeValue = () => {
    const { start, end } = selectedRange;

    if (start && end) {
      return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
    } else if (start) {
      return start.toLocaleDateString();
    } else if (end) {
      return end.toLocaleDateString();
    }

    return 'Select date range';
  };
  useEffect(() => {
    onChange(selectedRange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRange]);

  const handleClear = () => {
    setSelectedRange({ start: null, end: null });
  };

  const dateButtonClasses = cva(
    'cursor-pointer aspect-square rounded-none flex flex-col items-center justify-center border border-transparent dark:text-white text-black text-sm leading-sm',
    {
      variants: {
        isToday: {
          true: 'dark:text-black text-white dark:bg-white bg-black rounded-lg',
          false: '',
        },
        selected: {
          true: 'bg-primary dark:text-black rounded-lg',
          false: '',
        },
      },
    }
  );

  return (
    <div ref={datePickerRef} className="relative">
      <input
        type="text"
        readOnly
        value={getDateRangeValue()}
        onClick={() => setIsOpen((prev) => !prev)}
        className="border dark:border-[#313131] border-[#E4E4E2] p-2 rounded-[30px] cursor-pointer text-center w-full outline-none dark:bg-[#000] bg-green text-sm font-medium h-9 select-none"
      />
      {isOpen && (
        <div className="absolute mt-2 z-10 dark:bg-[#000] bg-white rounded-2xl shadow-lg w-full border dark:border-[#313131] border-[#E4E4E2]">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => {
                if (month === 0) {
                  setMonth(11);
                  setYear((prevYear) => prevYear - 1);
                } else {
                  setMonth((prevMonth) => prevMonth - 1);
                }
              }}
              className="text-gray-600  p-2"
            >
              <LeftArrowIcon />
            </button>

            <div className="flex items-center gap-1">
              <span>
                {new Intl.DateTimeFormat('en-US', { month: 'long' }).format(
                  new Date(year, month)
                )}
              </span>
              <span>{year}</span>
            </div>

            <button
              onClick={() => {
                if (month === 11) {
                  setMonth(0);
                  setYear((prevYear) => prevYear + 1);
                } else {
                  setMonth((prevMonth) => prevMonth + 1);
                }
              }}
              className="text-gray-600  p-2"
            >
              <RightArrowIcon />
            </button>
          </div>

          <div className="grid grid-cols-7 px-4">
            {dayNames.map((day, index) => (
              <div
                key={index}
                className="text-center font-medium dark:text-[#797B86] text-black text-sm leading-sm flex justify-center items-center aspect-square"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 px-4 pb-4">
            {displayDates().map((dateObj, index) =>
              dateObj ? (
                <button
                  key={index}
                  className={cn(
                    dateButtonClasses({
                      isToday: dateObj.isToday,
                      selected:
                        (selectedRange.start &&
                          dateObj.date.getTime() ===
                            selectedRange.start.getTime()) ||
                        (selectedRange.end &&
                          dateObj.date.getTime() ===
                            selectedRange.end.getTime()),
                    })
                  )}
                  onClick={() => handleDateClick(dateObj.date)}
                >
                  {dateObj.date.getDate()}
                </button>
              ) : (
                <div key={index} className="empty-date"></div>
              )
            )}
          </div>
          <p
            onClick={handleClear}
            className="pb-4 px-4 text-end cursor-pointer dark:text-white text-black"
          >
            Clear
          </p>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
