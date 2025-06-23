'use client';

import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import InvestmentStatsCard from './components/InvestmentStatsCard';
import InvestmentStatsGraph from './components/InvestmentStatsGraph';
import InvestmentPropfitAndCommissions from './components/InvestmentPropfitAndCommissions';
import { fetchInvestmentsStatistics } from '@/actions/investments';
import Loader from '@/components/Loader';
import useDebounce from '@/hooks/useDebounce';
import { getDateValues } from '@/utilits';

function ProfitStatistics() {
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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleFilter = () => {
    setQueries({
      date: getDateValues(dateRange) || '',
    });
  };

  const { data, isLoading, isSuccess, isFetching } =
    useQuery<InvestmentStatisticsResponse>({
      queryKey: ['investments-statistics', debouncedQuery, queries],
      queryFn: () =>
        fetchInvestmentsStatistics({
          search: debouncedQuery,
          date: queries.date,
        }),
      placeholderData: keepPreviousData,
    });

  if (isLoading || !isSuccess) {
    return <Loader />;
  }
  return (
    <div className="space-y-[10px]">
      <InvestmentStatsCard data={data.statistics} />
      <InvestmentStatsGraph data={data.monthly_report} />
      <InvestmentPropfitAndCommissions
        data={data.profit_logs}
        currentPage={currentPage}
        onFilter={handleFilter}
        onChangePage={handleChangePage}
        onSearch={handleSearch}
        onChangeDateRange={handleDateRangeChange}
        search={search}
        dateRange={dateRange}
        meta={data.profit_logs_meta}
        isFetching={isFetching}
      />
    </div>
  );
}

export default ProfitStatistics;
