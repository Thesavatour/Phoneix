'use client';

import Badge from '@/components/Badge';
import Card from '@/components/Card';
import Paginator from '@/components/Paginator';
import Table from '@/components/Table';
import TableNoData from '@/components/TableNoData';
import useGlobalSettings from '@/hooks/useGlobalSettings';

interface StackingInvestmentDataProps {
  data: StakingInvestment[];
  isFetching: boolean;
  currentPage: number;
  meta: Meta;
  onChange: (page: number) => void;
}

function StackingInvestmentData({
  data,
  isFetching,
  currentPage,
  meta,
  onChange,
}: StackingInvestmentDataProps) {
  const { data: globalSettings } = useGlobalSettings();
  const BlockTableData = data.map((com, index) => (
    <Table.BlockRow
      key={index}
      data={{
        'Initiated At': com.initiated_at,
        Amount: `${globalSettings?.currency_symbol}${com.amount}`,
        Interest: `${globalSettings?.currency_symbol}${com.interest}`,
        'Total Return': `${globalSettings?.currency_symbol}${com.total_return}`,
        'Expiration Date': com.expiration_date,
        Status: (
          <Badge variant={com.status === 'Running' ? 'default' : 'active'}>
            {com.status === 'Running' ? 'Running' : 'Completed'}
          </Badge>
        ),
      }}
    />
  ));

  return (
    <Card>
      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        <p className="dark:text-[#FFF] text-[22px] leading-[33px] font-normal">
          Stacking Investment Logs
        </p>
      </div>

      <div className="overflow-x-auto md:block hidden">
        <Table>
          <Table.Header>
            <Table.Column className="rounded-l-full">Initiated At</Table.Column>
            <Table.Column>Amount</Table.Column>
            <Table.Column>Interest</Table.Column>
            <Table.Column>Total Return</Table.Column>
            <Table.Column>Expiration Date</Table.Column>
            <Table.Column align="end" className="rounded-r-full">
              Status
            </Table.Column>
          </Table.Header>
          {data?.length === 0 && <TableNoData />}
          {data.map((com, index) => (
            <Table.Row key={index}>
              <Table.Column>{com.initiated_at}</Table.Column>
              <Table.Column>
                {globalSettings?.currency_symbol}
                {com.amount}
              </Table.Column>
              <Table.Column>
                {globalSettings?.currency_symbol}
                {com.interest}
              </Table.Column>
              <Table.Column>
                {globalSettings?.currency_symbol}
                {com.total_return}
              </Table.Column>
              <Table.Column>{com.expiration_date}</Table.Column>
              <Table.Column align="end">
                <Badge
                  variant={com.status === 'Running' ? 'active' : 'success'}
                >
                  {com.status === 'Running' ? 'Running' : 'Completed'}
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
          onPageChange={onChange}
          hasNextPage={meta.next_page_url !== null}
          isFetching={isFetching}
        />
      )}
    </Card>
  );
}

export default StackingInvestmentData;
