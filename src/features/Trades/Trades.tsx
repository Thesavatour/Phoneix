'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import PracticeHistoryIcon from '@/icons/PracticeHistoryIcon';
import TradesHistoryIcon from '@/icons/TradesHistoryIcon';
import HistoryViewCard from './components/HistoryViewCard';
import useTradePredictions from '@/hooks/useTradePredictions';
import Loader from '@/components/Loader';
import Card from '@/components/Card';
import Table from '@/components/Table';
import Paginator from '@/components/Paginator';
import { cn } from '@/utilits';
import Button from '@/components/Button';
import TradesAnalytics from '@/icons/TradesAnalytics';

const CardInfo = [
  {
    link: '/trades-history?tab=0',
    btnText: 'View',
    title: 'Analytics',
    icon: <TradesAnalytics />,
  },
  {
    link: '/trades-history?tab=1',
    btnText: 'View',
    title: 'Trade History',
    icon: <TradesHistoryIcon />,
  },
  {
    link: '/trades-history?tab=2',
    btnText: 'View',
    title: 'Practice History',
    icon: <PracticeHistoryIcon />,
  },
];

function Trades() {
  const [currentPage, setCurrentPage] = useState(1);

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const {
    data: trades,
    isSuccess,
    isLoading,
    isFetching,
  } = useTradePredictions({ page: currentPage });

  if (isLoading || !isSuccess) {
    return <Loader />;
  }

  const BlockTableData = trades.crypto_currency.map((item, index) => (
    <Table.BlockRow
      key={index}
      data={{
        "# Pair": item.pair,
        Price: `$${item.price}`,
        "Daily High": item.daily_high,
        "Daily Low": item.daily_low,
        "Market cap": item.market_cap,
        Actions: (
          <div className="flex items-center gap-2">
            <Link
              href={`/trades-view?type=trade&pair=${item.name.toLocaleLowerCase()}`}
            >
              <Button type="primary">Trade</Button>
            </Link>
            <Link
              href={`/trades-view?type=practice&pair=${item.name.toLocaleLowerCase()}`}
            >
              <Button type="secondary">Practice</Button>
            </Link>
          </div>
        ),
      }}
    />
  ));

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {CardInfo.map((item, index) => (
          <HistoryViewCard
            key={index}
            btnText={item.btnText}
            title={item.title}
            icon={item.icon}
            link={item.link}
          />
        ))}
      </div>

      <Card>
        <div className="overflow-x-auto md:block hidden">
          <Table>
            <Table.Header>
              <Table.Column className="rounded-l-full">
                <div className="flex items-center gap-3">
                  <p>#</p>
                  <p>Pair</p>
                </div>
              </Table.Column>
              <Table.Column>Price</Table.Column>
              <Table.Column>Daily High</Table.Column>
              <Table.Column>Daily Low</Table.Column>
              <Table.Column>Market cap</Table.Column>
              <Table.Column className="rounded-r-full" align="end">
                Actions
              </Table.Column>
            </Table.Header>

            {trades.crypto_currency.map((item, index) => (
              <Table.Row
                className={cn({
                  'border-b border-[#FFFFFF12]':
                    trades.crypto_currency.length !== index + 1,
                })}
                key={index}
              >
                <Table.Column>
                  <div className="flex items-center gap-3">
                    <p>{trades.crypto_currency_meta.from + index}</p>
                    <Image
                      src={item.file}
                      height={32}
                      width={32}
                      alt="cripto-image"
                      className="rounded-full"
                      priority
                    />
                    <div>
                      <p className="text-base dark:text-white text-black">
                        {item.name}
                      </p>
                      <p className="text-[#A1A1A1] text-xs leading-4">
                        {item.pair}
                      </p>
                    </div>
                  </div>
                </Table.Column>
                <Table.Column>${item.price}</Table.Column>
                <Table.Column>${item.daily_high}</Table.Column>
                <Table.Column>${item.daily_low}</Table.Column>
                <Table.Column>{item.market_cap}</Table.Column>
                <Table.Column
                  align="end"
                  className="flex items-center justify-end gap-2"
                >
                  <Link
                    href={`/trades-view?type=trade&pair=${item.name.toLocaleLowerCase()}`}
                  >
                    <Button type="primary">Trade</Button>
                  </Link>
                  <Link
                    href={`/trades-view?type=practice&pair=${item.name.toLocaleLowerCase()}`}
                  >
                    <Button type="secondary">Practice</Button>
                  </Link>
                </Table.Column>
              </Table.Row>
            ))}
          </Table>
        </div>
        <div className="block md:hidden">
          {trades?.crypto_currency?.length ? (
            BlockTableData
          ) : (
            <p className="text-center text-bold">No data available</p>
          )}
        </div>
        {currentPage === 1 &&
        !trades.crypto_currency_meta.next_page_url ? null : (
          <Paginator
            currentPage={currentPage}
            onPageChange={handleChangePage}
            hasNextPage={trades.crypto_currency_meta.next_page_url !== null}
            isFetching={isFetching}
          />
        )}
      </Card>
    </div>
  );
}

export default Trades;
