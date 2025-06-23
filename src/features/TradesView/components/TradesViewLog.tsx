'use client';

import Card from '@/components/Card';
import Table from '@/components/Table';
import Badge from '@/components/Badge';
import TableNoData from '@/components/TableNoData';
import useGlobalSettings from '@/hooks/useGlobalSettings';
import React from "react";

interface TradeLog {
  data: TradeViewLog[];
  type: string;
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

function TradesViewLog({ data, type }: TradeLog) {
  const { data: globalSettings } = useGlobalSettings();
  const BlockTableData = data.map((com, index) => (
    <Table.BlockRow
      key={index}
      data={{
        'Initiated At': com.initiated_at,
        Amount: `${globalSettings?.currency_symbol}${com.amount}`,
        Price: `${globalSettings?.currency_symbol}${com.price}`,
        Volume: <Badge variant={getBadgeVariant(com.volume)}>
            {com.volume}
        </Badge>,
        Outcome: <Badge variant={getBadgeVariant(com.outcome)}>
          {com.outcome}
        </Badge>,
        Status: <Badge variant={getStatusVariant(com.status)}>
            {com.status}
        </Badge>,
      }}
    />
  ));

  return (
    <Card>
      <div className="overflow-x-auto md:block hidden">
        <Table>
          <Table.Header>
            <Table.Column className="rounded-l-full">Initiated At</Table.Column>
            <Table.Column>Amount</Table.Column>
            <Table.Column>Volume</Table.Column>
            <Table.Column>Price</Table.Column>
            <Table.Column>Outcome</Table.Column>
            <Table.Column className="rounded-r-full" align="end">
              Status
            </Table.Column>
          </Table.Header>
          {data.length === 0 && <TableNoData />}
          {data.map((com, index) => (
            <Table.Row key={index}>
              <Table.Column>{com.initiated_at}</Table.Column>
              <Table.Column>
                {globalSettings?.currency_symbol}
                {com.amount}
              </Table.Column>
              <Table.Column>
                <Badge variant={com.volume === 'High' ? 'active' : 'danger'}>
                  {com.volume}
                </Badge>
              </Table.Column>
              <Table.Column>
                {globalSettings?.currency_symbol}
                {com.price}
              </Table.Column>
              <Table.Column>
                  <Badge variant={getBadgeVariant(com.outcome)}>
                      {com.outcome}
                  </Badge>
              </Table.Column>
              <Table.Column align="end">
                  <Badge variant={getStatusVariant(com.status)}>
                      {com.status}
                  </Badge>
              </Table.Column>
            </Table.Row>
          ))}
        </Table>
      </div>

      <div className="block md:hidden">
        {data.length ? (
          BlockTableData
        ) : (
          <p className="text-center text-bold">No data available</p>
        )}
      </div>
    </Card>
  );
}

export default TradesViewLog;
