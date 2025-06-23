import { cn } from '@/utilits';
import React from 'react';

interface Props {
  className?: string;
  title: string;
}
function CardTitle({ className, title }: Props) {
  return (
    <p className={cn('text-[22px] dark:text-white text-black', className)}>
      {title}
    </p>
  );
}

export default CardTitle;
