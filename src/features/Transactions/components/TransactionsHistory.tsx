'use client';

import React, { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import fetchTransactions from '@/actions/transactions';
import Loader from '@/components/Loader';
import Card from '@/components/Card';
import DropdownMenu from '@/components/DropdownMenu';
import InputField from '@/components/InputField';
import SearchIcon from '@/icons/SearchIcon';
import Button from '@/components/Button';
import FilterIcon from '@/icons/FilterIcon';
import Table from '@/components/Table';
import DateRangePicker from '@/components/DateRangePicker';
import Paginator from '@/components/Paginator';
import useDebounce from '@/hooks/useDebounce';
import { getDateValues } from '@/utilits';
import useGlobalSettings from '@/hooks/useGlobalSettings';
import Badge from "@/components/Badge";

const options = [
  { value: '1', label: 'All' },
  { value: '2', label: 'Matrix' },
  { value: '3', label: 'Investment' },
  { value: '4', label: 'Trade' },
];

function TransactionsHistory() {
  const { data: globalSettings } = useGlobalSettings();

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
    type: '',
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
      type: selectedOption.value || '',
      date: getDateValues(dateRange) || '',
    });
  };

  const params = {
    search: debouncedQuery,
    page: currentPage,
  };

  const { data, isLoading, isSuccess, isFetching } =
    useQuery<TransactionsResponse>({
      queryKey: ['transactions', debouncedQuery, queries, currentPage],
      queryFn: () => fetchTransactions({ ...params, ...queries }),
      placeholderData: keepPreviousData,
    });

  if (isLoading || !isSuccess) {
    return <Loader />;
  }

  const getBadgeVariant = (source: string) => {
    switch (source) {
      case "All":
        return 'success';
      case "Matrix":
        return 'info';
      case "Investment":
        return 'active';
      case "Trade":
        return 'danger';
      default:
        return 'default';
    }
  };

  const BlockTableData = data.transactions.map((item, index) => (


    <Table.BlockRow
      key={index}
      data={{
        'Initiated At': item.initiated_at,
        Trx: item.trx,
        Amount: `${globalSettings?.currency_symbol}${item.amount}`,
        Charge: `${globalSettings?.currency_symbol}${item.Charge}`,
        'Post Balance': `${item.post_balance}`,
        Wallet: item.wallet,
        Source: (
            <Badge variant={getBadgeVariant(item.source)}>
              {item.source}
            </Badge>
        ),
        Details: item.details,
      }}
    />
  ));
  return (
    <Card>
      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        <p className="dark:text-[#FFF] text-black text-[22px] leading-[33px] font-normal"></p>
        <div className="flex flex-wrap items-center gap-3">
          <div className="w-[230px]">
            <DateRangePicker
              selectedDateRange={dateRange}
              onChange={handleDateRangeChange}
            />
          </div>
          <DropdownMenu
            options={options}
            onChange={handleOptionChange}
            buttonText={selectedOption.label}
            buttonClassName="w-[230px]"
          />

          <div className="max-w-[230px]">
            <InputField
              onChange={handleSearch}
              value={search}
              leading={<SearchIcon />}
              className="h-[36px]"
              placeholder="Search by user or details..."
            />
          </div>

          <Button onClick={handleFilter} type="dark" className="rounded-lg">
            <FilterIcon />
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto md:block hidden">
        <Table>
          <Table.Header>
            <Table.Column className="rounded-l-full">Initiated At</Table.Column>
            <Table.Column>Trx</Table.Column>
            <Table.Column>Amount</Table.Column>
            <Table.Column>Charge</Table.Column>
            <Table.Column>Post Balance</Table.Column>
            <Table.Column>Wallet</Table.Column>
            <Table.Column>Source</Table.Column>
            <Table.Column className="rounded-r-full" align="end">
              Details
            </Table.Column>
          </Table.Header>
          {data.transactions.map((item, index) => (
            <Table.Row key={index}>
              <Table.Column>{item.initiated_at}</Table.Column>
              <Table.Column>{item.trx}</Table.Column>
              <Table.Column
                  className={`${item.type == 1 ? 'text-green-dark' : 'text-red-600'}`}>
                {globalSettings?.currency_symbol}
                {item.amount}
              </Table.Column>

              <Table.Column>
                {globalSettings?.currency_symbol}
                {item.Charge}
              </Table.Column>
              <Table.Column>{item.post_balance}</Table.Column>
              <Table.Column>{item.wallet}</Table.Column>
              <Table.Column>
                <Badge variant={getBadgeVariant(item.source)}>
                  {item.source}
                </Badge>
              </Table.Column>
              <Table.Column align="end">{item.details}</Table.Column>
            </Table.Row>
          ))}
        </Table>
      </div>
      <div className="block md:hidden">
        {data?.transactions?.length ? (
          BlockTableData
        ) : (
          <p className="text-center text-bold">No data available</p>
        )}
      </div>
      {currentPage === 1 && !data.transactions_meta.next_page_url ? null : (
        <Paginator
          currentPage={currentPage}
          onPageChange={handleChangePage}
          hasNextPage={data.transactions_meta.next_page_url !== null}
          isFetching={isFetching}
        />
      )}
    </Card>
  );
}

export default TransactionsHistory;
