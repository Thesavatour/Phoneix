'use client';

import { useState } from 'react';

import Button from '@/components/Button';
import Card from '@/components/Card';
import DropdownMenu from '@/components/DropdownMenu';
import Table from '@/components/Table';
import FilterIcon from '@/icons/FilterIcon';
import InputField from '@/components/InputField';
import SearchIcon from '@/icons/SearchIcon';
import { getDateValues } from '@/utilits';
import useMatrix from '@/hooks/useMatrix';
import Loader from '@/components/Loader';
import useDebounce from '@/hooks/useDebounce';
import DateRangePicker from '@/components/DateRangePicker';
import TableNoData from '@/components/TableNoData';
import Paginator from '@/components/Paginator';
import useGlobalSettings from '@/hooks/useGlobalSettings';

const options = [
  { value: '1', label: 'Initiated' },
  { value: '2', label: 'Profit Completed' },
  { value: '3', label: 'Completed' },
  { value: '4', label: 'Canceled' },
];

function ReferralRewards() {
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
  const { data, isLoading, isSuccess, isFetching } = useMatrix({
    params,
  });

  if (isLoading || !isSuccess) {
    return <Loader />;
  }
  const BlockTableData = data.referral_commissions.map((item, index) => (
    <Table.BlockRow
      key={index}
      data={{
        'Initiated At': item.initiated_at,
        Trx: item.trx,
        Amount: `${globalSettings?.currency_symbol}${item.amount}`,
        User: item.from_user,
        Details: item.details,
      }}
    />
  ));

  return (
    <Card>
      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        <p className="dark:text-[#FFF] text-black text-[22px] leading-[33px] font-normal">
          Referral Commissions
        </p>
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
          />

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
          {data.referral_commissions.length === 0 && <TableNoData />}
          {data.referral_commissions.map((item, index) => (
            <Table.Row key={index}>
              <Table.Column>{item.initiated_at}</Table.Column>
              <Table.Column>{item.trx}</Table.Column>
              <Table.Column>
                {globalSettings?.currency_symbol}
                {item.amount}
              </Table.Column>
              <Table.Column>{item.from_user}</Table.Column>
              <Table.Column align="end">{item.details}</Table.Column>
            </Table.Row>
          ))}
        </Table>
      </div>

      <div className="block md:hidden">
        {data?.referral_commissions?.length ? (
          BlockTableData
        ) : (
          <p className="text-center text-bold">No data available</p>
        )}
      </div>
      {currentPage === 1 &&
      !data.referral_commissions_meta.next_page_url ? null : (
        <Paginator
          currentPage={currentPage}
          onPageChange={handleChangePage}
          hasNextPage={data.referral_commissions_meta.next_page_url !== null}
          isFetching={isFetching}
        />
      )}
    </Card>
  );
}

export default ReferralRewards;
