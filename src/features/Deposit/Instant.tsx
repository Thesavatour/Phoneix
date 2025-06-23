'use client';
import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import DepositCard from './components/DepositCard';
import DepositLogs from './components/DepositLogs';
import Loader from '@/components/Loader';
import { getDateValues } from '@/utilits';
import useDebounce from '@/hooks/useDebounce';
import { fetchDeposit } from '@/actions/deposit';

const options = [
  { value: '1', label: 'All' },
  { value: '2', label: 'Pending' },
  { value: '3', label: 'Success' },
  { value: '4', label: 'Cancel' },
];

function Instant() {
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
  const { data, isLoading, isSuccess, isFetching } = useQuery<DipositResponse>({
    queryKey: ['deposit', debouncedQuery, queries, currentPage],
    queryFn: () => fetchDeposit({ params }),
    placeholderData: keepPreviousData,
  });

  if (isLoading || !isSuccess) {
    return <Loader />;
  }
  return (
    <div className="space-y-[10px]">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {data.payment_gateways.map((depositCard, index) => (
          <DepositCard key={index} data={depositCard} />
        ))}
      </div>
      <DepositLogs
        isFetching={isFetching}
        data={data.deposits}
        meta={data.deposits_meta}
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

export default Instant;
