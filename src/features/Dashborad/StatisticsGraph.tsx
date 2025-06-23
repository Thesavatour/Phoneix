import BlurCircle from '@/components/BlurCircle';
import CardTitle from '@/components/CardTitle';
import Chart from '@/components/Chart';
import GraphIndicatorGroup from '@/components/GraphIndicatorGroup';
import TransparentCard from '@/components/TransparentCard';

interface Props {
  data: Array<string[]>;
}

function StatisticsGraph({ data }: Props) {
  return (
    <TransparentCard className="min-h-[58vh]">
      <BlurCircle className="absolute bottom-[11px] left-[140px] transform -translate-x-1/2 -translate-y-1/2 h-[96px] w-[108px] -z-10" />
      <BlurCircle className="absolute top-[11px] right-0 transform -translate-x-1/2 -translate-y-1/2 h-[96px] w-[108px] -z-10" />
      <div className="flex justify-between items-center flex-wrap">
        <CardTitle title="Monthly deposit & withdraw statistics" />
      </div>

      <Chart
        hegiht={450}
        series={[
          {
            name: 'Total Deposit Amount',
            data: data[1],
          },
          {
            name: 'Total Withdraw Amount',
            data: data[2],
          },
        ]}
        categories={data[0]}
      />
    </TransparentCard>
  );
}

export default StatisticsGraph;
