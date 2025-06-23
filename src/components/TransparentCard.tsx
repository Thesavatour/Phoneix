import { cn } from '@/utilits';
import React, { PropsWithChildren } from 'react';

interface Props {
  className?: string;
}

function TransparentCard({ children, className }: PropsWithChildren<Props>) {
  return (
    <div
      className={cn(
        'relative border dark:border-[#313131] border-[#E4E4E2] dark:bg-white/10 bg-white backdrop-blur-[17.5px] w-full p-5 overflow-hidden rounded-[30px]',
        className
      )}
    >
      {children}
    </div>
  );
}

export default TransparentCard;
