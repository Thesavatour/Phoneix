'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import InvestmentRecords from './components/InvestmentRecords';
import InvestmentSchemeCard from './components/InvestmentSchemeCard';
import { fetchInvestmentsScheme } from '@/actions/investments';
import Loader from '@/components/Loader';
import { getDateValues } from '@/utilits';
import useDebounce from '@/hooks/useDebounce';

const options = [
  { value: '1', label: 'Initiated' },
  { value: '2', label: 'Profit Completed' },
  { value: '3', label: 'Completed' },
  { value: '4', label: 'Canceled' },
];

function InvestScheme() {
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
  };
  const { data, isLoading, isSuccess, isFetching } =
    useQuery<InvestmentSchemeResponse>({
      queryKey: [
        'investments-statistics',
        debouncedQuery,
        queries,
        currentPage,
      ],
      queryFn: () => fetchInvestmentsScheme({ ...params, ...queries }),
      placeholderData: keepPreviousData,
    });

  if (isLoading || !isSuccess) {
    return <Loader />;
  }

  return (
    <div className="space-y-[10px]">
      <div className="grid sm:grid-cols-2 gap-3">
        {data.investment_plans.map((schema, index) => (
          <div key={index}>
            <InvestmentSchemeCard plan={schema} />
          </div>
        ))}
      </div>
      <InvestmentRecords
        isFetching={isFetching}
        data={data.founds}
        meta={data.founds_meta}
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

export default InvestScheme;
