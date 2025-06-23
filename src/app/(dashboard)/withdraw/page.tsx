import PageTitle from '@/components/PageTitle';
import Withdraw from '@/features/Withdraw/Withdraw';

export const metadata = {
  title: 'Withdraw',
};

function Page() {
  return (
    <div className="space-y-[10px] mb-4">
      <PageTitle title="Withdraw" />
      <Withdraw />
    </div>
  );
}

export default Page;
