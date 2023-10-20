import * as React from 'react';

import { BiCheck, BiChevronDown } from 'react-icons/bi';

import { cn } from '@/components/shadcn/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/shadcn/components/ui/command';

const frameworks = [
  {
    value: 1,
    label: 'HR',
  },
  {
    value: 2,
    label: 'Feature Break',
  },
  {
    value: 3,
    label: 'IT Department',
  },
  {
    value: 4,
    label: 'Invoice Problem',
  },
  {
    value: 5,
    label: 'Domain Service',
  },
];

export function ComboboxDemo({
  label,
  id,
  name,
  placeholder = 'Select',
  placeholderSearch = 'Search',
  emptyLabel = 'No Data Found',
  extraClass,
  listData = frameworks,
  selectedValue,
  onChange,
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState();
  const [inputCount, setInputCount] = React.useState('');

  const isCheck = (data) => {
    return data.label.toLowerCase() === value ? 'opacity-100' : 'opacity-0';
  };

  const handleSelect = (currentValue) => {
    setValue(currentValue === value ? '' : currentValue);
    setOpen(false);
    const selected = listData.find((data) => data.label.toLowerCase() === currentValue?.toLowerCase())?.value;
    const data = {
      target: {
        name: name,
        value: selected,
      },
    };
    onChange(data);
  };

  const renderData = () => {
    return filteredData.map((data) => (
      <CommandItem key={data.value} onSelect={handleSelect}>
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
    if(value !== selectedValue){
      setValue(selectedValue)
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
            className={`mt-2 flex h-12 w-full justify-between items-center rounded-xl border bg-white/0 p-3 text-sm outline-none ${
              value ? 'text-[#000] dark:text-white' : 'text-gray-400'
            } dark:border-white/10`}
          >
            {value ? listData.find((data) => data.label.toLowerCase() === value?.toLowerCase())?.label : placeholder}
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
