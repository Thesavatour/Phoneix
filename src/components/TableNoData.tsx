import Table from './Table';

interface TableNoDataProps {
  colSpan?: number;
}

function TableNoData({ colSpan = 6 }: TableNoDataProps) {
  return (
    <Table.Row>
      <Table.Column colSpan={colSpan} className="text-center py-4 font-bold">
        No data available
      </Table.Column>
    </Table.Row>
  );
}

export default TableNoData;
