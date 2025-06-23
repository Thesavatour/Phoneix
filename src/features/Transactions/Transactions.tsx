import PageTitle from '@/components/PageTitle';
import TransactionsHistory from './components/TransactionsHistory';

function Transactions() {
  return (
    <div className="space-y-[10px] mb-4">
      <PageTitle title="Transactions" />
      <TransactionsHistory />
    </div>
  );
}

export default Transactions;
