import { cn } from '@/utilits';
import React, { PropsWithChildren } from 'react';

interface CardProps {
  className?: string;
}

const Card = ({ children, className }: PropsWithChildren<CardProps>) => {
  return (
    <div
      className={cn(
        'py-[14px] px-[24px] rounded-[30px] border dark:border-[#313131] border-[#E4E4E2] dark:bg-[#222] bg-white',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
