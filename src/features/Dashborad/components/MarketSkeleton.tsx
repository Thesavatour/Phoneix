import Skeleton from '@/components/Skeleton';
import { cn } from '@/utilits';

function MarketSkeleton() {
  return (
    <div>
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className={cn(
            'flex items-center justify-between p-[14px] min-w-[312px]',
            index < 4 ? 'border-b dark:border-[#313131] border-[#E4E4E2]' : ''
          )}
        >
          <div className="flex items-center gap-1">
            <Skeleton height="h-[30px]" width="w-[30px]" />
            <div className="space-y-1">
              <Skeleton height="h-2" width="w-12" />
              <Skeleton height="h-2" width="w-12" />
            </div>
          </div>
          <div className="space-y-1">
            <Skeleton height="h-2" width="w-[64px]" />
            <Skeleton height="h-2" width="w-[64px]" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default MarketSkeleton;
