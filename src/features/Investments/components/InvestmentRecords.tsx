'use client';

import Badge from '@/components/Badge';
import Button from '@/components/Button';
import Card from '@/components/Card';
import InputField from '@/components/InputField';
import Table from '@/components/Table';
import FilterIcon from '@/icons/FilterIcon';
import SearchIcon from '@/icons/SearchIcon';
import DropdownMenu from '@/components/DropdownMenu';
import DateRangePicker from '@/components/DateRangePicker';
import Paginator from '@/components/Paginator';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  completeInvestmentAction,
  investmentCancelAction,
  reInvestmentAction,
} from '@/actions/investments';
import Toaster from '@/components/Toaster';
import { getValidStatus } from '@/utilits';
import useGlobalSettings from '@/hooks/useGlobalSettings';
import UpcomingPayment from './UpcomingPayment';
import InvestmentButton from "@/components/InvestmentButton";

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
  data: Found[];
  meta: Meta;
  onChangeOption: (value: Option) => void;
  onChangePage: (page: number) => void;
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDateRange: (range: { start: Date | null; end: Date | null }) => void;
  onFilter: () => void;
}

const INVESTMENT_STATUS = {
  INITIATED: 1,
  PROFIT_COMPLETED: 2,
  COMPLETED: 3,
  CANCELLED: 4,
};

const Status: {
  [key: string]: string;
} = {
  '1': 'Initiated',
  '2': 'Profit Completed',
  '3': 'Completed',
  '4': 'Canceled',
};

function InvestmentRecords({
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
        Plan: item.plan,
        Amount: `$${item.amount}`,
        Interest: `$${item.interest_rate}`,
        'Should Pay': `${globalSettings?.currency_symbol}${item.should_pay}`,
        Paid: `${globalSettings?.currency_symbol}${item.profit}`,
        'Upcoming Payment': item.status === INVESTMENT_STATUS.INITIATED ? (
            <UpcomingPayment profitTime={item.profit_time} />
        ) : (
            'N/A'
        ),
        Status: (
          <Badge
            variant={
              item.status === INVESTMENT_STATUS.INITIATED
                ? 'default'
                : item.status === INVESTMENT_STATUS.PROFIT_COMPLETED
                  ? 'active'
                  : item.status === INVESTMENT_STATUS.COMPLETED
                    ? 'active'
                    : 'danger'
            }
          >
            {Status[item.status]}
          </Badge>
        ),
        Action: <InvestmentAction investLog={item} />,
      }}
    />
  ));

  return (
    <Card>
      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        <p className="dark:text-[#FFF] text-[22px] leading-[33px] font-normal">
          Investment Records
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
            <Table.Column>Plan</Table.Column>
            <Table.Column>Amount</Table.Column>
            <Table.Column>Interest</Table.Column>
            <Table.Column>Should Pay</Table.Column>
            <Table.Column>Paid</Table.Column>
            <Table.Column>Upcoming Payment</Table.Column>
            <Table.Column>Status</Table.Column>
            <Table.Column className="rounded-r-full">Action</Table.Column>
          </Table.Header>
          {data.map((com, index) => (
            <Table.Row key={index}>
              <Table.Column>{com.initiated_at}</Table.Column>
              <Table.Column>{com.trx}</Table.Column>
              <Table.Column>{com.plan}</Table.Column>
              <Table.Column>
                {globalSettings?.currency_symbol}
                {com.amount}
              </Table.Column>
              <Table.Column>
                {globalSettings?.currency_symbol}
                {com.interest_rate}
              </Table.Column>
              <Table.Column>{com.should_pay}</Table.Column>
              <Table.Column>
                {globalSettings?.currency_symbol}
                {com.profit}
              </Table.Column>
              <Table.Column>
                {com.status === INVESTMENT_STATUS.INITIATED ? (
                    <UpcomingPayment profitTime={com.profit_time} />
                ) : (
                    'N/A'
                )}
              </Table.Column>
              <Table.Column>
                <Badge
                  variant={
                    com.status === INVESTMENT_STATUS.INITIATED
                      ? 'default'
                      : com.status === INVESTMENT_STATUS.PROFIT_COMPLETED
                        ? 'success'
                        : com.status === INVESTMENT_STATUS.COMPLETED
                          ? 'active'
                          : 'danger'
                  }
                >
                  {Status[com.status]}
                </Badge>
              </Table.Column>
              <Table.Column>
                <InvestmentAction investLog={com} />
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

export default InvestmentRecords;

const InvestmentAction = ({ investLog }: { investLog: Found }) => {
  const queryClient = useQueryClient();

  const [toasterOpen, setToasterOpen] = useState(false);
  const [toasterMessage, setToasterMessage] = useState('');

  const {
    mutate: investmentCancelMutate,
    isPending,
    status: investmentCancelStatus,
  } = useMutation({
    mutationFn: investmentCancelAction,
    onSuccess: (data: any) => {
      setToasterOpen(true);
      setToasterMessage(data.message);
      queryClient.invalidateQueries({ queryKey: ['investments-statistics'] });
    },
    onError: (error: any) => {
      setToasterOpen(true);
      setToasterMessage(error.response.data.message);
    },
  });

  const {
    mutate: reInvestmentMute,
    isPending: reInvestmentPending,
    status: reInvestmentStatus,
  } = useMutation({
    mutationFn: reInvestmentAction,
    onSuccess: (data: any) => {
      setToasterOpen(true);
      setToasterMessage(data.message);
      queryClient.invalidateQueries({ queryKey: ['investments-statistics'] });
    },
    onError: (error: any) => {
      setToasterOpen(true);
      setToasterMessage(error.response.data.message);
    },
  });

  const {
    mutate: completeInvestmentMute,
    isPending: completeInvestmentPending,
    status: completeInvestmentStatus,
  } = useMutation({
    mutationFn: completeInvestmentAction,
    onSuccess: (data: any) => {
      setToasterOpen(true);
      setToasterMessage(data.message);
      queryClient.invalidateQueries({ queryKey: ['investments-statistics'] });
    },
    onError: (error: any) => {
      setToasterOpen(true);
      setToasterMessage(error.response.data.message);
    },
  });

  const { status, profit, uid, amount } = investLog;

  const isProfitCompleted = status === INVESTMENT_STATUS.PROFIT_COMPLETED;
  const isInitiatedAndNoProfit =
    status === INVESTMENT_STATUS.INITIATED && profit === '0';

  return (
    <div>
      {isProfitCompleted || isInitiatedAndNoProfit ? (
        <>
          {isProfitCompleted && (
            <div className="flex items-center gap-2">
              <InvestmentButton
                loading={reInvestmentPending}
                onClick={() =>
                  reInvestmentMute({
                    uid: uid,
                    amount,
                  })
                }
              >
                Re-Investment
              </InvestmentButton>
              <InvestmentButton
                type="outline"
                size="small"
                loading={completeInvestmentPending}
                onClick={() =>
                  completeInvestmentMute({
                    uid: uid,
                  })
                }
              >
                Investment Transfer
              </InvestmentButton>
            </div>
          )}
          {isInitiatedAndNoProfit && (
            <InvestmentButton
              type="danger"
              loading={isPending}
              onClick={() =>
                investmentCancelMutate({
                  uid: uid,
                })
              }
            >
              Cancel
            </InvestmentButton>
          )}
        </>
      ) : (
        <div>N/A</div>
      )}

      <Toaster
        message={toasterMessage}
        type={getValidStatus(
          investmentCancelStatus,
          reInvestmentStatus,
          completeInvestmentStatus
        )}
        position="top-center"
        isOpen={toasterOpen}
        onClose={() => setToasterOpen(false)}
      />
    </div>
  );
};
