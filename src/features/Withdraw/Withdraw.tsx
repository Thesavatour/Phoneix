'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import WithdrawCard from './components/WithdrawCard';
import BankTransferIcon from '@/icons/BankTransferIcon';
import WesternUnionIcon from '@/icons/WesternUnionIcon';
import CriptonIcon from '@/icons/CriptonIcon';
import WithdrawHistory from './components/WithdrawHistory';
import Loader from '@/components/Loader';
import { fetchWithdraw } from '@/actions/withdraw';
import { getDateValues } from '@/utilits';
import useDebounce from '@/hooks/useDebounce';

const options = [
  { value: '', label: 'All' },
  { value: '2', label: 'Pending' },
  { value: '3', label: 'Success' },
  { value: '4', label: 'Cancel' },
];

function Withdraw() {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState<string>('');
  const debouncedQuery = useDebounce<string>(search, 500);
  const [dateRange, setDateRange] = useState<{
    start: Date | null;
    end: Date | null;
  }>({
    start: null,
    end: null,
  });
  const [queries, setQueries] = useState({
    status: '',
    date: '',
  });

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const handleDateRangeChange = (range: {
    start: Date | null;
    end: Date | null;
  }) => {
    setDateRange(range);
  };

  const handleOptionChange = (value: Option) => {
    setSelectedOption(value);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleFilter = () => {
    setQueries({
      status: selectedOption.value || '',
      date: getDateValues(dateRange) || '',
    });
  };

  const params = {
    search: debouncedQuery,
    page: currentPage,
    ...queries,
  };
  const { data, isLoading, isSuccess, isFetching } = useQuery<WithdrawResponse>(
    {
      queryKey: ['withdraw', debouncedQuery, queries, currentPage],
      queryFn: () => fetchWithdraw({ params }),
      placeholderData: keepPreviousData,
    }
  );

  if (isLoading || !isSuccess) {
    return <Loader />;
  }

  return (
    <div className="space-y-[10px]">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {data.withdraw_gateways.map((withdrawCard, index) => (
          <WithdrawCard key={index} data={withdrawCard} />
        ))}
      </div>
      <WithdrawHistory
        isFetching={isFetching}
        data={data.withdraw_logs}
        meta={data.withdraw_meta}
        currentPage={currentPage}
        search={search}
        dateRange={dateRange}
        options={options}
        selectedOption={selectedOption}
        onChangeOption={handleOptionChange}
        onChangePage={handleChangePage}
        onSearch={handleSearch}
        onChangeDateRange={handleDateRangeChange}
        onFilter={handleFilter}
      />
    </div>
  );
}

export default Withdraw;
