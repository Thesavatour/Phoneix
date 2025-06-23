import PageTitle from '@/components/PageTitle';
import Trades from '@/features/Trades/Trades';

export const metadata = {
  title: 'Trades',
};

function Page() {
  return (
    <div className="space-y-[10px] mb-4">
      <PageTitle title="Trades" />
      <Trades />
    </div>
  );
}

export default Page;
