import { cn } from '@/utilits';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalEntries?: number;
  to?: number;
  from?: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  totalEntries,
  to,
  from,
  onPageChange,
}: PaginationProps) => {
  const getPageNumbers = () => {
    let pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages = [1, 2, 3, 4, '...', totalPages];
      } else if (currentPage > totalPages - 3) {
        pages = [
          1,
          '...',
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ];
      } else {
        pages = [
          1,
          '...',
          currentPage - 1,
          currentPage,
          currentPage + 1,
          '...',
          totalPages,
        ];
      }
    }
    return pages;
  };

  return (
    <div className="flex sm:justify-between justify-center items-center  mt-5 flex-wrap gap-3">
      <div className="flex space-x-[10px] select-none">
        <button
          className={cn(
            'h-8 w-8 flex items-center justify-center text-[#DCE4E8] rounded-full border border-[#313131]',
            currentPage === 1 && 'pointer-events-none opacity-50'
          )}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.0002 13.2797L5.65355 8.93306C5.14022 8.41973 5.14022 7.57973 5.65355 7.06639L10.0002 2.71973"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="dark:text-[#DCE4E8] text-[#000]"
            />
          </svg>
        </button>

        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            className={cn(
              'h-8 w-8 flex items-center justify-center rounded-full text-xs',
              page === currentPage
                ? 'bg-primary text-black'
                : 'dark:text-[#DCE4E8] text-black',
              typeof page === 'string' && 'pointer-events-none'
            )}
            onClick={() => typeof page === 'number' && onPageChange(page)}
          >
            {page}
          </button>
        ))}

        <button
          className={cn(
            'h-8 w-8 flex items-center justify-center  text-[#DCE4E8] rounded-full border border-[#313131]',
            currentPage === totalPages && 'pointer-events-none opacity-50'
          )}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.94043 13.2797L10.2871 8.93306C10.8004 8.41973 10.8004 7.57973 10.2871 7.06639L5.94043 2.71973"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="text-[#000] dark:text-[#DCE4E8]"
            />
          </svg>
        </button>
      </div>
      {totalEntries && (
        <p className="dark:text-white-rgba-50 text-xs text-black">
          Showing {from} to {to} of {totalEntries} entries
        </p>
      )}
    </div>
  );
};

export default Pagination;
