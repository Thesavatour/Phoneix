'use client';

import { useState } from 'react';

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
import CheckmarkIcon from '@/icons/CheckmarkIcon';
import CopyIcon from '@/icons/CopyIcon';
import useGlobalSettings from "@/hooks/useGlobalSettings";

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
  data: Pin[];
  meta: Meta;
  onChangeOption: (value: Option) => void;
  onChangePage: (page: number) => void;
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDateRange: (range: { start: Date | null; end: Date | null }) => void;
  onFilter: () => void;
}

function InstaPINRechargeHistory({
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
  const [isCopied, setIsCopied] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const handleCopy = async (textToCopy: string, index: number) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
      setCopiedIndex(index);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };
  const BlockTableData = data.map((com, index) => (
    <Table.BlockRow
      key={index}
      data={{
        'Initiated At': com.initiated_at,
        'Amount': `${globalSettings?.currency_symbol}${(parseFloat(com.amount) + parseFloat(com.charge)).toFixed(2)}`,
        'Charge': `${globalSettings?.currency_symbol}${com.charge}`,
        'Net Credit': `${globalSettings?.currency_symbol}${com.amount}`,
        'Pin Number': com.pin_number,
        Status: (
          <Badge variant={com.status === 'Used' ? 'success' : 'default'}>
            {com.status === 'Used' ? 'Used' : 'Unused'}
          </Badge>
        ),
        Details: com.details,
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
            <Table.Column>Amount</Table.Column>
            <Table.Column>Charge</Table.Column>
            <Table.Column>Net Credit</Table.Column>
            <Table.Column>Pin Number</Table.Column>
            <Table.Column>Status</Table.Column>
            <Table.Column className="rounded-r-full" align="end">
              Details
            </Table.Column>
          </Table.Header>
          {data.length === 0 && <TableNoData />}
          {data.map((com, index) => (
            <Table.Row key={index}>
              <Table.Column>{com.initiated_at}</Table.Column>
              <Table.Column>{globalSettings?.currency_symbol}{(parseFloat(com.amount) + parseFloat(com.charge)).toFixed(2)}</Table.Column>
              <Table.Column>{globalSettings?.currency_symbol}{com.charge}</Table.Column>
              <Table.Column>{globalSettings?.currency_symbol}{com.amount}</Table.Column>
              <Table.Column className="flex items-center gap-2">
                {com.pin_number}
                <span
                  className="cursor-pointer"
                  onClick={() => handleCopy(com.pin_number, index)}
                >
                  {copiedIndex === index && isCopied ? (
                    <CheckmarkIcon />
                  ) : (
                    <CopyIcon />
                  )}
                </span>
              </Table.Column>
              <Table.Column>
                <Badge variant={com.status === 'Used' ? 'success' : 'default'}>
                  {com.status === 'Used' ? 'Used' : 'Unused'}
                </Badge>
              </Table.Column>
              <Table.Column align="end">{com.details}</Table.Column>
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

export default InstaPINRechargeHistory;
