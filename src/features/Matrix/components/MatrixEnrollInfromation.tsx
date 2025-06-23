import MatrixInfoCard from './MatrixInfoCard';
import { formatToOneDecimal } from '@/utilits';
import useGlobalSettings from '@/hooks/useGlobalSettings';

interface MatrixEnrollInfromationProps {
  log: MatrixLog;
}

function MatrixEnrollInfromation({ log }: MatrixEnrollInfromationProps) {
  const { data } = useGlobalSettings();
  return (
    <div className="relative border dark:border-[#313131] border-[#E4E4E2] dark:bg-[#222] bg-white rounded-[30px] pt-[14px] pb-5 pr-5 pl-5">
      <div className="absolute bg-primary w-[71px] blur-[140px] h-[74px] top-[97px] left-[-1px] rounded-full dark:block hidden"></div>
      <div className="space-y-[14px]">
        <p className="text-[22px] dark:text-primary-text text-black leading-[33px] font-normal">
          Matrix Enrolled Information
        </p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <MatrixInfoCard
            title="Initiated At"
            content={log?.created_at?.toString()}
          />
          <MatrixInfoCard title="Trx" content={log?.trx} />
          <MatrixInfoCard title="Schema Name" content={log?.name} />
          <MatrixInfoCard
            title="Invest Amount"
            content={`${data?.currency_symbol}${formatToOneDecimal(log?.price || '0')}`}
          />
          <MatrixInfoCard
            title="User-Based Referral Bonus"
            content={`${data?.currency_symbol}${formatToOneDecimal(log?.referral_reward || '0')}`}
          />
          <MatrixInfoCard
            title="Referral Commisson"
            content={`${data?.currency_symbol}${formatToOneDecimal(log?.referral_commissions || '0')}`}
          />
          <MatrixInfoCard
            title="Level Commission"
            content={`${data?.currency_symbol}${formatToOneDecimal(log?.level_commissions || '0')}`}
          />
          <MatrixInfoCard
            title="Status"
            content={log?.status === 1 ? 'Running' : ''}
          />
        </div>
      </div>
    </div>
  );
}

export default MatrixEnrollInfromation;
