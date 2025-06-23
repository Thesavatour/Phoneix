import BlurCircle from '@/components/BlurCircle';
import CardTitle from '@/components/CardTitle';
import Chart from '@/components/Chart';
import GraphIndicatorGroup from '@/components/GraphIndicatorGroup';
import TransparentCard from '@/components/TransparentCard';

interface Props {
  data: string[];
  categories: string[];
}

function TradeStats({ data, categories }: Props) {
  return (
    <TransparentCard className="w-full max-h-full pb-0">
      <BlurCircle className="absolute top-[-11px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[96px] w-[108px] -z-10" />
      <div className="flex justify-between items-center flex-wrap">
        <CardTitle title="Daily Trading Statistics and Analysis Report" />
      </div>
      <Chart
        series={[
          {
            name: 'Trade Amount',
            data: data,
          },
        ]}
        categories={categories}
      />
    </TransparentCard>
  );
}

export default TradeStats;
