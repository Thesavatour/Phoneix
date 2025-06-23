'use client';

import React, { useState } from 'react';

import Button from '@/components/Button';
import Card from '@/components/Card';
import DropdownMenu from '@/components/DropdownMenu';
import Table from '@/components/Table';
import FilterIcon from '@/icons/FilterIcon';
import InputField from '@/components/InputField';
import SearchIcon from '@/icons/SearchIcon';
import CardTitle from '@/components/CardTitle';
import Badge from '@/components/Badge';
import useTradeHistoryLogs from '@/hooks/useTradeHistoryLogs';
import Loader from '@/components/Loader';
import useDebounce from '@/hooks/useDebounce';
import Paginator from '@/components/Paginator';
import DateRangePicker from '@/components/DateRangePicker';
import { getDateValues } from '@/utilits';
import TableNoData from '@/components/TableNoData';
import useGlobalSettings from '@/hooks/useGlobalSettings';

const OutcomeOptions = [
  { value: '1', label: 'Initiated' },
  { value: '2', label: 'Win' },
  { value: '3', label: 'Loss' },
  { value: '4', label: 'DRAW' },
];

const VolumeOptions = [
  { value: '', label: 'All' },
  { value: '1', label: 'High' },
  { value: '2', label: 'Low' },
];

function History() {
  const { data: globalSettings } = useGlobalSettings();
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectOutcomeOption, setOutcomeOption] = useState(OutcomeOptions[0]);
  const [selectVolumeOptions, setVolumeOption] = useState(VolumeOptions[0]);
  const debouncedQuery = useDebounce<string>(search, 500);
  const [dateRange, setDateRange] = useState<{
    start: Date | null;
    end: Date | null;
  }>({
    start: null,
    end: null,
  });
  const [params, setParams] = useState({
    page: 1,
    outcome: '',
    volume: '',
    date: '',
  });

  const handleOutcomeOptionChange = (value: Option) => {
    setOutcomeOption(value);
  };
  const handleVolumOptionChange = (value: Option) => {
    setVolumeOption(value);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };
  const handleDateRangeChange = (range: {
    start: Date | null;
    end: Date | null;
  }) => {
    setDateRange(range);
  };

  const handleFilter = () => {
    setParams({
      outcome: selectOutcomeOption.value,
      volume: selectVolumeOptions.value,
      page: currentPage,
      date: getDateValues(dateRange) || '',
    });
  };

  const {
    data: tradeHistoryLogs,
    isLoading,
    isSuccess,
    isFetching,
  } = useTradeHistoryLogs({
    ...params,
    search: debouncedQuery,
  });

  if (isLoading || !isSuccess) {
    return <Loader />;
  }


  const getBadgeVariant = (source: string) => {
    switch (source) {
      case "Initiated":
        return 'default';
      case "Win":
        return 'success';
      case "Lose":
        return 'danger';
      case "Draw":
        return 'info';
      default:
        return 'default';
    }
  };

  const getStatusVariant = (source: string) => {
    switch (source) {
      case "Running":
        return 'active';
      case "Complete":
        return 'success';
      default:
        return 'default';
    }
  };

  const BlockTableData = tradeHistoryLogs.trade_logs.map((item, index) => (
    <Table.BlockRow
      key={index}
      data={{
        'Initiated At': item.initiated_at,
        Crypto: item.crypto,
        Amount: `${globalSettings?.currency_symbol}${item.amount}`,
        Price: `${globalSettings?.currency_symbol}${item.price}`,
        Volume: <Badge variant={getBadgeVariant(item.volume)}>
          {item.volume}
        </Badge>,
        "Arrival Time": item.arrival_time,
        Outcome: <Badge variant={getBadgeVariant(item.outcome)}>
          {item.outcome}
        </Badge>,
        Status: <Badge variant={getStatusVariant(item.status)}>
          {item.status}
        </Badge>,
      }}
    />
  ));

  return (
    <>
      <Card>
        <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
          <CardTitle title="Trade Logs History" />
          <div className="flex flex-wrap items-center gap-3">
            <div className="w-[230px]">
              <DateRangePicker
                selectedDateRange={dateRange}
                onChange={handleDateRangeChange}
              />
            </div>
            <DropdownMenu
              options={OutcomeOptions}
              onChange={handleOutcomeOptionChange}
              buttonText={selectOutcomeOption.label}
            />

            <DropdownMenu
              options={VolumeOptions}
              onChange={handleVolumOptionChange}
              buttonText={selectVolumeOptions.label}
            />

            <div className="max-w-[230px]">
              <InputField
                onChange={handleSearch}
                value={search}
                leading={<SearchIcon />}
                className="h-[36px]"
                placeholder="Search by crypto or date..."
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
              <Table.Column className="rounded-l-full">
                Initiated At
              </Table.Column>
              <Table.Column>Crypto</Table.Column>
              <Table.Column>Amount</Table.Column>
              <Table.Column>Price</Table.Column>
              <Table.Column>Volume</Table.Column>
              <Table.Column>Arrival Time</Table.Column>
              <Table.Column>Outcome</Table.Column>
              <Table.Column className="rounded-r-full" align="end">
                Status
              </Table.Column>
            </Table.Header>
            {tradeHistoryLogs.trade_logs.length === 0 && <TableNoData />}
            {tradeHistoryLogs.trade_logs.map((item, index) => (
              <Table.Row key={index}>
                <Table.Column>{item.initiated_at}</Table.Column>
                <Table.Column>{item.crypto}</Table.Column>
                <Table.Column>
                  {globalSettings?.currency_symbol}
                  {item.amount}
                </Table.Column>
                <Table.Column>
                  {globalSettings?.currency_symbol}
                  {item.price}
                </Table.Column>
                <Table.Column>
                  <Badge variant={getBadgeVariant(item.volume)}>
                    {item.volume}
                  </Badge>
                </Table.Column>
                <Table.Column>{item.arrival_time}</Table.Column>
                <Table.Column>
                  <Badge variant={getBadgeVariant(item.outcome)}>
                    {item.outcome}
                  </Badge>
                </Table.Column>
                <Table.Column align="end">
                  <Badge variant={getStatusVariant(item.status)}>
                    {item.status}
                  </Badge>
                </Table.Column>
              </Table.Row>
            ))}
          </Table>
        </div>
        <div className="block md:hidden">
          {tradeHistoryLogs?.trade_logs?.length ? (
            BlockTableData
          ) : (
            <p className="text-center text-bold">No data available</p>
          )}
        </div>
        {currentPage === 1 &&
        !tradeHistoryLogs.trade_logs_meta.next_page_url ? null : (
          <Paginator
            currentPage={currentPage}
            onPageChange={handleChangePage}
            hasNextPage={
              tradeHistoryLogs.trade_logs_meta.next_page_url !== null
            }
            isFetching={isFetching}
          />
        )}
      </Card>
    </>
  );
}

export default History;
