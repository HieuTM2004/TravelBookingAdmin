// Pagination.tsx - Reusable pagination component
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  onPrev: () => void;
  onNext: () => void;
  getPageNumbers: () => number[];
}

const PaginationComponent: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalCount,
  onPageChange,
  onPrev,
  onNext,
  getPageNumbers,
}) => {
  return (
    <div className="mt-4 flex justify-center items-center space-x-2">
      <button
        onClick={onPrev}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600"
      >
        Prev
      </button>
      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 mx-1 rounded ${
            currentPage === page
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600"
      >
        Next
      </button>
      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
        Page {currentPage} of {totalPages} ({totalCount} total)
      </span>
    </div>
  );
};

export default PaginationComponent;
