import { cn } from '@/utilits';

interface SkeletonProps {
  width?: string;
  height?: string;
  rounded?: string;
  className?: string;
}

const Skeleton = ({
  width = 'w-full',
  height = 'h-4',
  rounded = 'rounded-md',
  className = '',
}: SkeletonProps) => {
  return (
    <div
      className={cn(
        'animate-pulse bg-slate-700',
        width,
        height,
        rounded,
        className
      )}
    />
  );
};

export default Skeleton;
