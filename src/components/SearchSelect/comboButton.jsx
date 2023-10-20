import * as React from 'react';

import { BiCheck, BiChevronDown } from 'react-icons/bi';

import { cn } from '@/components/shadcn/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/shadcn/components/ui/command';

const frameworks = [
  {
    value: 1,
    label: 'next.js',
  },
  {
    value: 2,
    label: 'sveltekit',
  },
  {
    value: 3,
    label: 'nuxt.js',
  },
  {
    value: 4,
    label: 'remix',
  },
  {
    value: 5,
    label: 'astro',
  },
];

export function ComboboxButton({
  label,
  id,
  placeholder = 'Select',
  placeholderSearch = 'Search',
  emptyLabel = 'No Data Found',
  extraClass,
  listData = frameworks,
  selectedValue,
  disabled = false,
  onChange,
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState();
  const [inputCount, setInputCount] = React.useState('');

  const isCheck = (data) => {
    return data.value.toString() === value ? 'opacity-100' : 'opacity-0';
  };

  const handleSelect = (currentValue) => {
    setValue(currentValue === value ? '' : currentValue);
    setOpen(false);
    onChange(currentValue);
  };

  const renderData = () => {
    return filteredData.map((data) => (
      <CommandItem key={data.value} onSelect={() => handleSelect(data.value.toString())}>
        <BiCheck className={cn('mr-2 h-4 w-4', isCheck(data))} />
        {data.label}
      </CommandItem>
    ));
  };

  const filteredData =
    inputCount !== '' ? listData.filter((item) => item.label.toLowerCase().includes(inputCount.toLowerCase())).slice(0, 5) : listData.slice(0, 5);

  const handleOnInputChange = (e) => {
    setInputCount(e);
  };

  React.useEffect(() => {
    if (value !== selectedValue) {
      setValue(selectedValue);
    }
  }, [selectedValue]);

  return (
    <div className={extraClass}>
      <label htmlFor={id} className={`text-sm text-navy-700 dark:text-white font-bold`}>
        {label}
      </label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            className={`inline-flex justify-between items-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white dark:bg-navy-700 text-base leading-6 font-medium text-navy-700 dark:text-white dark:border-navy-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-orange-300 focus:shadow-outline transition ease-in-out duration-150 sm:text-sm sm:leading-5 dark:border-white/10 disabled:opacity-50 ${
              value ? 'text-[#000] dark:text-white' : 'text-gray-400'
            }`}
            disabled={disabled}
          >
            {value ? listData.find((data) => data.value.toString() === value)?.label : placeholder}
            <BiChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </button>
        </PopoverTrigger>
        <PopoverContent className={`p-0 dark:bg-navy-800`} align="start">
          <Command shouldFilter={false}>
            <CommandInput placeholder={placeholderSearch} onValueChange={handleOnInputChange} />
            <CommandEmpty>{emptyLabel}</CommandEmpty>
            <CommandGroup>{renderData()}</CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
