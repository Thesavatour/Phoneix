import { cn } from '@/utilits';
import Button from './Button';
import Dropicon from '@/icons/Dropicon';

interface DropdownButtonProps {
  btnText: string;
  className?: string;
}

export default function DropdownButton({
  btnText,
  className,
}: DropdownButtonProps) {
  return (
    <Button
      type="dark"
      className={cn(
        'min-w-[230px] flex justify-between items-center',
        className
      )}
    >
      <span className="text-sm font-normal">{btnText}</span>
      <span>
        <Dropicon />
      </span>
    </Button>
  );
}
