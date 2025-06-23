import BlueIndicator from '@/icons/BlueIndicator';
import YellowIndicator from '@/icons/YellowIndicator';

interface GraphIndicatorGroupProps {
  yellow?: string;
  blue?: string;
}
function GraphIndicatorGroup({ yellow, blue }: GraphIndicatorGroupProps) {
  return (
    <div className="flex items-center gap-6">
      {blue && (
        <div className="flex items-center gap-2">
          <BlueIndicator />
          <p className="dark:text-[#ACACAC] text-[#4C4D4B] text-[12px]">
            {blue}
          </p>
        </div>
      )}
      {yellow && (
        <div className="flex items-center gap-2">
          <YellowIndicator />
          <p className="dark:text-[#ACACAC] text-[#4C4D4B] text-[12px]">
            {yellow}
          </p>
        </div>
      )}
    </div>
  );
}

export default GraphIndicatorGroup;
