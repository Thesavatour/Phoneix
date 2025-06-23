'use client';

import Button from '@/components/Button';
import Card from '@/components/Card';
import Table from '@/components/Table';
import FilterIcon from '@/icons/FilterIcon';
import InputField from '@/components/InputField';
import SearchIcon from '@/icons/SearchIcon';
import Badge from '@/components/Badge';
import DateRangePicker from '@/components/DateRangePicker';
import DropdownMenu from '@/components/DropdownMenu';
import Paginator from '@/components/Paginator';
import TableNoData from '@/components/TableNoData';
import useGlobalSettings from '@/hooks/useGlobalSettings';

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
  data: Deposit[];
  meta: Meta;
  onChangeOption: (value: Option) => void;
  onChangePage: (page: number) => void;
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDateRange: (range: { start: Date | null; end: Date | null }) => void;
  onFilter: () => void;
}

function DepositLogs({
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
  const BlockTableData = data.map((com, index) => (
    <Table.BlockRow
      key={index}
      data={{
        'Initiated At': com.initiated_at,
        Trx: com.trx,
        Gateway: com.gateway,
        Amount: `${globalSettings?.currency_symbol}${com.amount}`,
        Charge: `${globalSettings?.currency_symbol}${com.charge}`,
        Conversion: `${com.conversion}`,
        'Payable Amount': `${(parseFloat(com.final_amount) * parseFloat(com.rate)).toFixed(2)} ${com.currency}`,
        'Net Credit': `${globalSettings?.currency_symbol}${com.final_amount}`,
        Wallet: com.wallet,
        Status: (
          <Badge variant={com.Status === 'Success' ? 'success' : 'default'}>
            {com.Status}
          </Badge>
        ),
      }}
    />
  ));

  return (
    <Card>
      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        <p className="dark:text-[#FFF] text-[22px] leading-[33px] font-normal">
          Deposit Logs
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
            <Table.Column>Payable Amount</Table.Column>
            <Table.Column>Net Credit</Table.Column>
            <Table.Column>Wallet</Table.Column>
            <Table.Column align="end" className="rounded-r-full">
              Status
            </Table.Column>
          </Table.Header>
          {data.length === 0 && <TableNoData colSpan={8} />}
          {data.map((com, index) => (
            <Table.Row key={index}>
              <Table.Column>{com.initiated_at}</Table.Column>
              <Table.Column>{com.trx}</Table.Column>
              <Table.Column>{com.gateway}</Table.Column>
              <Table.Column>
                {globalSettings?.currency_symbol}
                {com.amount}
              </Table.Column>
              <Table.Column>
                {globalSettings?.currency_symbol}
                {com.charge}
              </Table.Column>
              <Table.Column>{com.conversion}</Table.Column>
              <Table.Column>
                {parseFloat(com.final_amount) * parseFloat(com.rate)} {com.currency}
              </Table.Column>
              <Table.Column>
                {globalSettings?.currency_symbol}
                {com.final_amount}
              </Table.Column>
              <Table.Column>{com.wallet}</Table.Column>
              <Table.Column align="end">
                <Badge
                  variant={com.Status === 'Success' ? 'success' : 'default'}
                >
                  {com.Status}
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

export default DepositLogs;
