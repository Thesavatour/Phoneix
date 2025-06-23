'use client';

import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import StackingInvestmentData from './components/StackingInvestmentData';
import StackingInvestmentInfo from './components/StackingInvestmentInfo';
import Loader from '@/components/Loader';
import { fetchStackingInvestments } from '@/actions/stacking-investment';

function StackingInvestment() {
  const [currentPage, setCurrentPage] = useState(1);

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const {
    data: stackingInvestment,
    isLoading,
    isSuccess,
    isFetching,
  } = useQuery<StackingInvestmentResponse>({
    queryKey: ['investments-statistics', currentPage],
    queryFn: () => fetchStackingInvestments({ page: currentPage }),
    placeholderData: keepPreviousData,
  });

  if (isLoading || !isSuccess) {
    return <Loader />;
  }
  return (
    <>
      <div className="grid lg:grid-cols-2 items-center gap-2">
        {stackingInvestment.plans.map((item, index) => (
          <StackingInvestmentInfo
            key={index}
            interrest={item.interest_rate}
            duration={item.duration}
            id={item.id}
            maximum_amount={item.maximum_amount}
            minimum_amount={item.minimum_amount}
          />
        ))}
      </div>
      <StackingInvestmentData
        data={stackingInvestment.staking_investments}
        isFetching={isFetching}
        currentPage={currentPage}
        meta={stackingInvestment.staking_investments_meta}
        onChange={handleChangePage}
      />
    </>
  );
}

export default StackingInvestment;
