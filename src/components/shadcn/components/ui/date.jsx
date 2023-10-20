import * as React from 'react';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';

import { cn } from '@/components/shadcn/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn/components/ui/popover';
import { Calendar } from '@/components/shadcn/components/ui/calendar';

export function DatePickerWithRange({ selectDate, handleChange, className }) {
  const [date, setDate] = React.useState(selectDate);

  const handleSelect = (e) => {
    setDate(e);
    handleChange(e);
  };

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <button
            id="date"
            className={cn(
              'inline-flex justify-start items-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white dark:bg-navy-700 text-base leading-6 font-medium text-navy-700 dark:text-white dark:border-navy-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-orange-300 focus:shadow-outline transition ease-in-out duration-150 sm:text-sm sm:leading-5 dark:border-white/10'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={1}
            className="dark:bg-navy-700"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
