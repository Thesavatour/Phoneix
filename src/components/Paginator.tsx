import React from 'react';
import Button from './Button';

interface PaginatorProps {
  currentPage: number;
  isFetching: boolean;
  hasNextPage?: boolean;
  onPageChange: (newPage: number) => void;
}

const Paginator: React.FC<PaginatorProps> = ({
  currentPage,
  isFetching,
  hasNextPage,
  onPageChange,
}) => {
  const handleNextPage = () => {
    if (!isFetching && hasNextPage) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <div className="flex items-center justify-end gap-5 border-t dark:border-[#313131] border-[#E4E4E2] pt-5">
      <Button
        onClick={handlePrevPage}
        type="outline"
        disabled={currentPage === 1 || isFetching}
      >
        Previous
      </Button>
      <Button
        onClick={handleNextPage}
        loading={isFetching}
        type="outline"
        disabled={!hasNextPage}
      >
        Next
      </Button>
    </div>
  );
};

export default Paginator;
