import { cn } from '@/utilits';

interface BlurCircleProps {
  className?: string;
}

function BlurCircle({ className }: BlurCircleProps) {
  return (
    <div
      className={cn(
        'absolute bg-primary blur-[140px] h-[100px] w-[100px] dark:block hidden',
        className
      )}
    />
  );
}

export default BlurCircle;
