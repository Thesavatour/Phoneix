'use client';

import React, { PropsWithChildren } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/utilits';

const buttonVariants = cva(
    'rounded-[30px] font-semibold transition-all duration-200 ease-in-out py-[8.5px] px-[15px] h-9 flex gap-3 items-center justify-center select-none',
    {
        variants: {
            type: {
                primary:
                    'dark:bg-primary  bg-black dark:text-black text-white text-sm font-medium leading-[21px] dark:hover:bg-primary-dark hover:bg-[#404040] active:scale-95',
                secondary:
                    'dark:bg-[#3B3B3B] bg-[#E5E5E4] dark:hover:bg-[#2E2E2E] hover:bg-[#D1D1D0] dark:text-white text-black text-sm font-medium leading-[21px] active:scale-95',
                plaintext:
                    'px-4 py-2 text-sm font-medium leading-[21px] text-[rgba(255, 255, 255, 0.80)] hover:text-white hover:bg-black active:scale-95',
                dark: 'bg-white dark:bg-black text-black dark:text-primary-text border dark:border-[#313131] border-[#E4E4E2] hover:bg-gray-100 dark:hover:bg-gray-900 active:scale-95',
                light:
                    'bg-[#E5E5E4] dark:bg-white text-black dark:text-black border border-[#313131] hover:bg-gray-200 dark:hover:bg-gray-300 active:scale-95',
                outline:
                    'border dark:border-primary border-[#E5E5E4] dark:text-white text-black dark:hover:bg-primary hover:bg-[#E5E5E4] dark:hover:text-black active:scale-95 rounded-[16px]',
                danger:
                    'bg-red-500 text-white dark:text-white dark:bg-red-500 hover:bg-red-600 active:scale-95 text-sm font-medium leading-[21px]',
            },
            size: {
                small: 'text-sm',
                medium: 'text-base',
                large: 'text-lg',
            },
        },
        defaultVariants: {
            type: 'primary',
            size: 'medium',
        },
    }
);
interface ButtonProps extends VariantProps<typeof buttonVariants> {
    className?: string;
    actionType?: 'submit' | 'reset' | 'button';
    loading?: boolean;
    disabled?: boolean;
    onClick?: () => void;
}
const InvestmentButton = ({
      type,
      size,
      children,
      onClick,
      className,
      actionType = 'button',
      loading = false,
      disabled = false,
    }: PropsWithChildren<ButtonProps>) => {
    const isDisabled = loading || disabled;

    return (
        <button
            onClick={onClick}
            className={cn(
                buttonVariants({ type, size }),
                className,
                'px-2 py-1 text-xs font-medium rounded-md transition-all duration-200 ease-in-out shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary',
                { 'cursor-default opacity-50': isDisabled }
            )}
            type={actionType}
            disabled={isDisabled}
        >
            <div className="flex items-center">
                {loading && <span className="loader mr-1" />}
                <div className="flex items-center gap-2">{children}</div>
            </div>
        </button>
    );
};



export default InvestmentButton;
