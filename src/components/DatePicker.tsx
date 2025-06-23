import React, { useState, useEffect } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/utilits';
import LeftArrowIcon from '@/icons/LeftArrowIcon';
import RightArrowIcon from '@/icons/RightArrowIcon';

type DatePickerProps = {
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
};

const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const DatePicker: React.FC<DatePickerProps> = ({
  selectedDate: initialSelectedDate,
  onChange,
}) => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    initialSelectedDate || today
  );

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  useEffect(() => {
    displayDates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month, year]);

  const daysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const firstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    onChange(date);
  };

  const displayDates = () => {
    const totalDays = daysInMonth(month, year);
    const firstDay = firstDayOfMonth(month, year);
    const dates = [];

    for (let i = 0; i < firstDay; i++) {
      dates.push(null);
    }

    for (let i = 1; i <= totalDays; i++) {
      const currentDate = new Date(year, month, i);
      dates.push({
        date: currentDate,
        isToday: currentDate.toDateString() === today.toDateString(),
      });
    }

    return dates;
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
          true: 'bg-primary dark:text-white text-black rounded-lg',
          false: '',
        },
      },
    }
  );

  return (
    <div className="">
      <div className=" dark:bg-black bg-white rounded-lg  max-w-[230px]">
        <div>
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => {
                if (month === 0) {
                  setMonth(11);
                  setYear((prevYear) => prevYear - 1);
                } else {
                  setMonth((prevMonth) => prevMonth - 1);
                }
              }}
              className="p-2"
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
              className="dark:text-gray-600 text-black  p-2"
            >
              <RightArrowIcon />
            </button>
          </div>

          <div className="grid grid-cols-7">
            {dayNames.map((day, index) => (
              <div
                key={index}
                className="text-center font-medium dark:text-[#797B86] text-black text-sm leading-sm flex justify-center items-center aspect-square"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7">
            {displayDates().map((dateObj, index) => {
              return dateObj ? (
                <button
                  key={index}
                  className={cn(
                    dateButtonClasses({
                      isToday: dateObj.isToday,
                      selected:
                        selectedDate &&
                        dateObj.date.getTime() === selectedDate.getTime(),
                    })
                  )}
                  onClick={() => handleDateClick(dateObj.date)}
                >
                  <div
                    className={cn({
                      ' text-black flex justify-center items-center rounded-full bg-brand-600':
                        selectedDate &&
                        dateObj.date.getTime() === selectedDate.getTime(),
                    })}
                  >
                    {dateObj.date.getDate()}
                  </div>
                </button>
              ) : (
                <div key={index} className="empty-date"></div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
