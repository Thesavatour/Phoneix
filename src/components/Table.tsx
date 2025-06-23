import { cva } from 'class-variance-authority';
import React, { PropsWithChildren } from 'react';

import { cn } from '@/utilits';

const columnStyles = cva(
  'py-4 px-3 text-[rgba(255, 255, 255, 0.80)] text-sm leading-[21px] font-normal border-b-0',
  {
    variants: {
      align: {
        start: 'text-left',
        end: 'text-right',
        center: 'text-center',
      },
    },
    defaultVariants: {
      align: 'start',
    },
  }
);

const rowStyles = cva('border-b-0 border-gray-700 last:border-b-0');
const tableStyles = cva('w-full border-collapse');

interface TableProps {
  className?: string;
}

const Table = ({ children, className = '' }: PropsWithChildren<TableProps>) => {
  return (
    <div className={cn(className)}>
      <div className="overflow-x-auto overflow-y-hidden">
        <table className={cn(tableStyles())}>
          <thead>
            <tr>{/* Table header will go here */}</tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </div>
  );
};

interface TableRowProps {
  className?: string;
  children: React.ReactNode;
}

const TableRow = ({ children, className = '' }: TableRowProps) => {
  return <tr className={cn(rowStyles(), className)}>{children}</tr>;
};

interface TableColumnProps {
  className?: string;
  align?: 'start' | 'end' | 'center';
  children: React.ReactNode;
  colSpan?: number;
}

const TableColumn = ({
  children,
  className = '',
  align = 'start',
  colSpan,
}: TableColumnProps) => {
  return (
    <td className={cn(columnStyles({ align }), className)} colSpan={colSpan}>
      {children}
    </td>
  );
};

interface TableBlockRowProps {
  data: {
    [key: string]: React.ReactNode;
  };
}

const TableBlockRow = ({ data }: TableBlockRowProps) => {
  console.log(data, 'data----');
  return (
    <div className="flex flex-col p-4 border dark:border-[#313131] border-[#E4E4E2] rounded-md mb-2">
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="flex justify-between">
          <span className="font-semibold text-[rgba(255, 255, 255, 0.80)]">
            {key}:
          </span>
          <span>{value}</span>
        </div>
      ))}
    </div>
  );
};

interface TableHeaderProps {
  children: React.ReactNode;
}

const TableHeader = ({ children }: TableHeaderProps) => {
  return (
    <tr className="dark:bg-[#000000] dark:text-white bg-green border-none rounded-2xl">
      {children}
    </tr>
  );
};

Table.Row = TableRow;
Table.Column = TableColumn;
Table.Header = TableHeader;
Table.BlockRow = TableBlockRow;

export default Table;
