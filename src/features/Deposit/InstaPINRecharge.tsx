'use client';
import React, { useState } from 'react';
import InstaPINRechargeCard from './components/InstaPINRechargeCard';
import RechargeIcon from '@/icons/RechargeIcon';
import GeneratePINIcon from '@/icons/GeneratePINIcon';
import InstaPINRechargeHistory from './components/InstaPINRechargeHistory';
import useDebounce from '@/hooks/useDebounce';
import { getDateValues } from '@/utilits';
import Loader from '@/components/Loader';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchInstaPins } from '@/actions/instapin';

const CardInfo = [
  {
    type: 'recharge',
    btnText: 'Recharge Now',
    title: 'Recharge',
    icon: <RechargeIcon />,
  },
  {
    type: 'generate',
    btnText: 'Generate New Pin',
    title: 'Generate Pin',
    icon: <GeneratePINIcon />,
  },
];
const options = [
  { value: '', label: 'All' },
  { value: 'used', label: 'Used' },
  { value: 'unused', label: 'Unused' },
];
function InstaPINRecharge() {
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
  const { data, isLoading, isSuccess, isFetching } = useQuery<InstaPinResponse>(
    {
      queryKey: ['insta-pins', debouncedQuery, queries, currentPage],
      queryFn: () => fetchInstaPins({ params }),
      placeholderData: keepPreviousData,
    }
  );
  if (isLoading || !isSuccess) {
    return <Loader />;
  }
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {CardInfo.map((item, index) => (
          <InstaPINRechargeCard
            key={index}
            type={item.type}
            btnText={item.btnText}
            title={item.title}
            icon={item.icon}
          />
        ))}
      </div>
      <InstaPINRechargeHistory
        isFetching={isFetching}
        data={data.pins}
        meta={data.pin_meta}
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

export default InstaPINRecharge;
