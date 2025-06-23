import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/utilits';

const searchInputClasses = cva(
  'w-full bg-black placeholder:text-[rgba(255, 255, 255, 0.8)] text-[rgba(255, 255, 255, 0.8)] text-sm border border-[#313131] pl-10 pr-3 py-2 transition duration-300 ease  focus:outline-none focus:shadow-none',

  {
    variants: {
      rounded: {
        full: 'rounded-full',
        default: 'rounded-md',
      },
    },
    defaultVariants: {
      rounded: 'default',
    },
  }
);

type SearchInputProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled?: boolean;
  placeholder?: string;
};

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  isDisabled = false,
  placeholder = 'Search...',
}) => {
  return (
    <div className="w-full max-w-sm min-w-[200px]">
      <div className="relative flex items-center">
        <svg
          className="absolute w-5 h-5 top-2.5 left-2.5"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.66671 13.9997C11.1645 13.9997 14 11.1641 14 7.66634C14 4.16854 11.1645 1.33301 7.66671 1.33301C4.1689 1.33301 1.33337 4.16854 1.33337 7.66634C1.33337 11.1641 4.1689 13.9997 7.66671 13.9997Z"
            stroke="white"
            stroke-opacity="0.8"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M14.6667 14.6663L13.3334 13.333"
            stroke="white"
            stroke-opacity="0.8"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <input
          className={cn(searchInputClasses({ rounded: 'full' }))}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={isDisabled}
        />
      </div>
    </div>
  );
};

export default SearchInput;
