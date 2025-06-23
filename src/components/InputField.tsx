import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';

import { cn } from '@/utilits';

const inputClasses = cva(
  'w-full dark:bg-[#000] dark:placeholder:text-[#ACB5BB] placeholder:text-[#00000075] placeholder:text-[13px] text-black dark:text-[#ACB5BB] text-sm border dark:border-[#313131] border-[#E4E4E2] pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:shadow-none h-[46px] bg-green',
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

type InputProps = {
  type?: 'text' | 'password' | 'email' | 'number';
  placeholder?: string;
  label?: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  leadingBg?: string;
  trailingBg?: string;
  className?: string;
  name?: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputField = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      placeholder = 'Enter Your Text',
      label,
      leading,
      trailing,
      leadingBg,
      trailingBg,
      className,
      type = 'text',
      name,
      error,
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-base mb-[10px] text-black dark:text-white-rgba-90">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leading && (
            <div
              className={cn(
                'absolute left-0 top-0 h-full w-10 flex items-center justify-center',
                leadingBg ? leadingBg : ''
              )}
            >
              {leading}
            </div>
          )}

          <input
            ref={ref}
            className={cn(
              inputClasses({ rounded: 'full' }),
              leading ? 'pl-10' : 'pl-3',
              trailing ? 'pr-10' : 'pr-3',
              className
            )}
            placeholder={placeholder}
            type={type}
            name={name}
            {...props}
          />

          {trailing && (
            <div
              className={cn(
                'absolute right-0 top-0 h-full flex items-center justify-center px-5 rounded-r-[30px]',
                trailingBg ? trailingBg : ''
              )}
            >
              {trailing}
            </div>
          )}
        </div>
        {error ? (
          <p className="text-red-500 text-xs mt-1 ml-4">{error}</p>
        ) : null}
      </div>
    );
  }
);

InputField.displayName = 'InputField';

export default InputField;
