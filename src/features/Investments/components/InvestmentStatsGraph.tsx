import BlurCircle from '@/components/BlurCircle';
import CardTitle from '@/components/CardTitle';
import Chart from '@/components/Chart';
import GraphIndicatorGroup from '@/components/GraphIndicatorGroup';
import TransparentCard from '@/components/TransparentCard';

interface InvestmentStatsGraphProps {
  data: Array<string[]>;
}

function InvestmentStatsGraph({ data }: InvestmentStatsGraphProps) {
  return (
    <TransparentCard className="w-full">
      <BlurCircle className="absolute top-[-11px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[96px] w-[108px] -z-10" />
      <div className="flex justify-between items-center flex-wrap">
        <CardTitle title="Monthly investment logs statistics" />
      </div>
      <Chart
        series={[
          {
            name: 'Profit',
            data: data[1],
          },
          {
            name: 'Invest',
            data: data[2],
          },
        ]}
        categories={data[0]}
      />
    </TransparentCard>
  );
}

export default InvestmentStatsGraph;
