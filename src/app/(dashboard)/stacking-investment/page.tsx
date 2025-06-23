import PageTitle from '@/components/PageTitle';
import StackingInvestment from '@/features/StackingInvestment/StackingInvestment';

export const metadata = {
  title: 'Stacking Investment',
};

function Page() {
  return (
    <div className="space-y-[10px] mb-4">
      <PageTitle title="Stacking Investment" />
      <StackingInvestment />
    </div>
  );
}

export default Page;
