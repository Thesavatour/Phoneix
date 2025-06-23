'use client';

import Button from '@/components/Button';
import Card from '@/components/Card';
import DropdownMenu from '@/components/DropdownMenu';
import Table from '@/components/Table';
import FilterIcon from '@/icons/FilterIcon';
import InputField from '@/components/InputField';
import SearchIcon from '@/icons/SearchIcon';
import Badge from '@/components/Badge';
import DateRangePicker from '@/components/DateRangePicker';
import TableNoData from '@/components/TableNoData';
import Paginator from '@/components/Paginator';
import useGlobalSettings from '@/hooks/useGlobalSettings';
import React from 'react';

interface Props {
  currentPage: number;
  search: string;
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
  options: Option[];
  selectedOption: Option;
  isFetching: boolean;
  data: WithdrawLog[];
  meta: Meta;
  onChangeOption: (value: Option) => void;
  onChangePage: (page: number) => void;
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDateRange: (range: { start: Date | null; end: Date | null }) => void;
  onFilter: () => void;
}

function WithdrawHistory({
  data,
  search,
  dateRange,
  options,
  currentPage,
  selectedOption,
  onChangeOption,
  onChangePage,
  onSearch,
  onChangeDateRange,
  onFilter,
  meta,
  isFetching,
}: Props) {
  const { data: globalSettings } = useGlobalSettings();
  const BlockTableData = data.map((item, index) => (
    <Table.BlockRow
      key={index}
      data={{
        'Initiated At': item.initiated_at,
        Trx: item.trx,
        Gateway: item.gateway,
        Amount: `${globalSettings?.currency_symbol}${item.amount}`,
        Charge: `${globalSettings?.currency_symbol}${item.charge}`,
        Conversion: item.conversion,
        'Final Amount': `${item.final_amount} ${item?.currency}`,
        'Net Credit': `${globalSettings?.currency_symbol}${item.after_charge}`,
        Status: (
          <Badge variant={item.Status === 'Success' ? 'success' : 'default'}>
            {item.Status}
          </Badge>
        ),
      }}
    />
  ));

  return (
    <Card>
      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        <p className="dark:text-[#FFF] text-black text-[22px] leading-[33px] font-normal">
          History
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <div className="w-[230px]">
            <DateRangePicker
              selectedDateRange={dateRange}
              onChange={onChangeDateRange}
            />
          </div>
          <DropdownMenu
            options={options}
            onChange={onChangeOption}
            buttonText={selectedOption.label}
          />

          <div className="max-w-[230px]">
            <InputField
              onChange={onSearch}
              value={search}
              leading={<SearchIcon />}
              className="h-[36px]"
            />
          </div>
          <Button
            onClick={onFilter}
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
            <Table.Column>Gateway</Table.Column>
            <Table.Column>Amount</Table.Column>
            <Table.Column>Charge</Table.Column>
            <Table.Column>Conversion</Table.Column>
            <Table.Column>Final Amount</Table.Column>
            <Table.Column>Net Credit</Table.Column>
            <Table.Column className="rounded-r-full" align="end">
              Status
            </Table.Column>
          </Table.Header>
          {data.length === 0 && <TableNoData colSpan={9} />}
          {data.map((item, index) => (
            <Table.Row key={index}>
              <Table.Column>{item.initiated_at}</Table.Column>
              <Table.Column>{item.trx}</Table.Column>
              <Table.Column>{item.gateway}</Table.Column>
              <Table.Column>
                {globalSettings?.currency_symbol}
                {item.amount}
              </Table.Column>
              <Table.Column>
                {globalSettings?.currency_symbol}
                {item.charge}
              </Table.Column>
              <Table.Column>{item.conversion}</Table.Column>
              <Table.Column>
                {item.final_amount} {item.currency}
              </Table.Column>
              <Table.Column>
                {globalSettings?.currency_symbol}
                {item.after_charge}
              </Table.Column>
              <Table.Column align="end">
                <Badge
                  variant={item.Status === 'Success' ? 'success' : 'default'}
                >
                  {item.Status}
                </Badge>
              </Table.Column>
            </Table.Row>
          ))}
        </Table>
      </div>

      <div className="block md:hidden">
        {data?.length ? (
          BlockTableData
        ) : (
          <p className="text-center text-bold">No data available</p>
        )}
      </div>
      {currentPage === 1 && !meta.next_page_url ? null : (
        <Paginator
          currentPage={currentPage}
          onPageChange={onChangePage}
          hasNextPage={meta.next_page_url !== null}
          isFetching={isFetching}
        />
      )}
    </Card>
  );
}

export default WithdrawHistory;
