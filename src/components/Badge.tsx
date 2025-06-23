import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/utilits';
const badgeStyles = cva(
    'inline-flex items-center px-2 py-1 border text-[12px] font-medium leading-[15.12px] rounded-[54px]',
    {
        variants: {
            variant: {
                default:
                    'text-[#FE710D] bg-[#FFF3E6] border-[#FE710D] dark:text-[#FFA346] dark:bg-[#33241A] dark:border-[#FE710D]',
                success:
                    'text-[#0AB39C] bg-[#E6F8F6] border-[#0AB39C] dark:text-[#4DD8C0] dark:bg-[#162724] dark:border-[#0AB39C]',
                info:
                    'text-[#2D8CD2] bg-[#E6F3FC] border-[#2D8CD2] dark:text-[#63A8E0] dark:bg-[#162637] dark:border-[#2D8CD2]',
                active:
                    'text-[#04A3CF] bg-[#E6F7FB] border-[#04A3CF] dark:text-[#4DC7E6] dark:bg-[#16292F] dark:border-[#04A3CF]',
                danger:
                    'text-[#F4A100] bg-[#FFF4E0] border-[#F4A100] dark:text-[#F8C652] dark:bg-[#33290E] dark:border-[#F4A100]',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

interface BadgeProps extends VariantProps<typeof badgeStyles> {
  children: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({ variant, children }) => {
  return <span className={cn(badgeStyles({ variant }))}>{children}</span>;
};

export default Badge;
