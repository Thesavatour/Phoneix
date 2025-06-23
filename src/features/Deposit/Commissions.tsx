'use client';

import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import Button from '@/components/Button';
import Card from '@/components/Card';
import Table from '@/components/Table';
import FilterIcon from '@/icons/FilterIcon';
import InputField from '@/components/InputField';
import SearchIcon from '@/icons/SearchIcon';
import useDebounce from '@/hooks/useDebounce';
import { getDateValues } from '@/utilits';
import Loader from '@/components/Loader';
import { fetchDepositCommissions } from '@/actions/deposit';
import DateRangePicker from '@/components/DateRangePicker';
import Paginator from '@/components/Paginator';
import TableNoData from '@/components/TableNoData';
import useGlobalSettings from '@/hooks/useGlobalSettings';

function Commissions() {
  const { data: globalSettings } = useGlobalSettings();
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

  const params = {
    search: debouncedQuery,
    page: currentPage,
    ...queries,
  };
  const { data, isLoading, isSuccess, isFetching } =
    useQuery<DepositCommissionResponse>({
      queryKey: ['deposit', debouncedQuery, queries, currentPage],
      queryFn: () => fetchDepositCommissions({ params }),
      placeholderData: keepPreviousData,
    });

  if (isLoading || !isSuccess) {
    return <Loader />;
  }
  const BlockTableData = data.deposit_commissions.map((com, index) => (
    <Table.BlockRow
      key={index}
      data={{
        'Initiated At': com.initiated_at,
        Trx: com.trx,
        Amount: `${globalSettings?.currency_symbol}${com.amount}`,
        User: com.from_user,
        Details: com.details,
      }}
    />
  ));

  return (
    <Card>
      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        <p className="dark:text-[#FFF] text-black text-[22px] leading-[33px] font-normal">
          Referral Deposit Commission Rewards
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <div className="w-[230px]">
            <DateRangePicker
              selectedDateRange={dateRange}
              onChange={handleDateRangeChange}
            />
          </div>
          <div className="max-w-[230px]">
            <InputField
              onChange={handleSearch}
              value={search}
              leading={<SearchIcon />}
              className="h-[36px]"
            />
          </div>
          <Button
            onClick={handleFilter}
            loading={isFetching}
            type="dark"
            className="rounded-lg"
          >
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
            <Table.Column>User</Table.Column>
            <Table.Column className="rounded-r-full" align="end">
              Details
            </Table.Column>
          </Table.Header>
          {data.deposit_commissions.length === 0 && <TableNoData />}
          {data.deposit_commissions.map((com, index) => (
            <Table.Row key={index}>
              <Table.Column>{com.initiated_at}</Table.Column>
              <Table.Column>{com.trx}</Table.Column>
              <Table.Column>
                {globalSettings?.currency_symbol}
                {com.amount}
              </Table.Column>
              <Table.Column>{com.from_user}</Table.Column>
              <Table.Column align="end">{com.details}</Table.Column>
            </Table.Row>
          ))}
        </Table>
      </div>

      <div className="block md:hidden">
        {data?.deposit_commissions?.length ? (
          BlockTableData
        ) : (
          <p className="text-center text-bold">No data available</p>
        )}
      </div>
      {currentPage === 1 &&
      !data.deposit_commission_meta.next_page_url ? null : (
        <Paginator
          currentPage={currentPage}
          onPageChange={handleChangePage}
          hasNextPage={data.deposit_commission_meta.next_page_url !== null}
          isFetching={isFetching}
        />
      )}
    </Card>
  );
}

export default Commissions;
