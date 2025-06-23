'use client';

import Button from '@/components/Button';
import Card from '@/components/Card';
import Table from '@/components/Table';
import FilterIcon from '@/icons/FilterIcon';
import InputField from '@/components/InputField';
import SearchIcon from '@/icons/SearchIcon';
import CardTitle from '@/components/CardTitle';
import DateRangePicker from '@/components/DateRangePicker';
import Paginator from '@/components/Paginator';
import TableNoData from '@/components/TableNoData';
import useGlobalSettings from '@/hooks/useGlobalSettings';

interface ProfitLogsProps {
  currentPage: number;
  search: string;
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
  isFetching: boolean;
  onChangePage: (page: number) => void;
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDateRange: (range: { start: Date | null; end: Date | null }) => void;
  onFilter: () => void;
  data: ProfitLogs[];
  meta: Meta;
}

function InvestmentProfitAndCommissions({
  data,
  search,
  dateRange,
  currentPage,
  onChangePage,
  onSearch,
  onChangeDateRange,
  onFilter,
  meta,
  isFetching,
}: ProfitLogsProps) {
  const { data: globalSettings } = useGlobalSettings();
  const BlockTableData = data.map((item, index) => (
    <Table.BlockRow
      key={index}
      data={{
        'Initiated At': item.initiated_at,
        Trx: item.trx,
        Amount: `${globalSettings?.currency_symbol}${item.amount}`,
        Details: item.details,
      }}
    />
  ));

  return (
    <Card>
      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        <CardTitle title="Investments Profit and Commissions" />
        <div className="flex flex-wrap items-center gap-3">
          <div className="w-[230px]">
            <DateRangePicker
              selectedDateRange={dateRange}
              onChange={onChangeDateRange}
            />
          </div>
          <div className="max-w-[230px]">
            <InputField
              onChange={onSearch}
              value={search}
              leading={<SearchIcon />}
              className="h-[36px]"
              placeholder="Search by transaction or details..."
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
            <Table.Column>Amount</Table.Column>
            <Table.Column className="rounded-r-full" align="end">
              Details
            </Table.Column>
          </Table.Header>
          {data.length === 0 && <TableNoData />}
          {data.map((item, index) => (
            <Table.Row key={index}>
              <Table.Column>{item.initiated_at}</Table.Column>
              <Table.Column>{item.trx}</Table.Column>
              <Table.Column>
                {globalSettings?.currency_symbol}
                {item.amount}
              </Table.Column>
              <Table.Column align="end">{item.details}</Table.Column>
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

export default InvestmentProfitAndCommissions;
