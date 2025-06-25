import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

/**
 * Pagination Component - Reusable pagination controls
 * @param {Object} props - Component props
 * @param {number} props.currentPage - Current active page
 * @param {number} props.totalPages - Total number of pages
 * @param {Function} props.onPageChange - Function to handle page changes
 * @param {boolean} props.canGoPrevious - Whether previous navigation is available
 * @param {boolean} props.canGoNext - Whether next navigation is available
 * @param {Function} props.onFirst - Function to go to first page
 * @param {Function} props.onLast - Function to go to last page
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} - Pagination component
 */
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  canGoPrevious,
  canGoNext,
  onFirst,
  onLast,
  className = "",
}) => {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show smart pagination
      const halfVisible = Math.floor(maxVisible / 2);
      let start = Math.max(1, currentPage - halfVisible);
      let end = Math.min(totalPages, start + maxVisible - 1);
      
      // Adjust start if we're near the end
      if (end - start < maxVisible - 1) {
        start = Math.max(1, end - maxVisible + 1);
      }
      
      // Add first page if not included
      if (start > 1) {
        pages.push(1);
        if (start > 2) {
          pages.push('...');
        }
      }
      
      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      // Add last page if not included
      if (end < totalPages) {
        if (end < totalPages - 1) {
          pages.push('...');
        }
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = getPageNumbers();

  return (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      {/* First and Previous buttons */}
      <div className="flex space-x-1">
        <Button
          variant="secondary"
          size="sm"
          onClick={onFirst}
          disabled={!canGoPrevious}
          className="hidden sm:block"
        >
          ⏮️ First
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!canGoPrevious}
        >
          ⬅️ Previous
        </Button>
      </div>

      {/* Page numbers */}
      <div className="flex space-x-1">
        {pageNumbers.map((page, index) => (
          <React.Fragment key={index}>
            {page === '...' ? (
              <span className="px-3 py-2 text-gray-500 dark:text-gray-400">
                ...
              </span>
            ) : (
              <Button
                variant={page === currentPage ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => onPageChange(page)}
                className="min-w-[40px]"
              >
                {page}
              </Button>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Next and Last buttons */}
      <div className="flex space-x-1">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!canGoNext}
        >
          Next ➡️
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={onLast}
          disabled={!canGoNext}
          className="hidden sm:block"
        >
          Last ⏭️
        </Button>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  canGoPrevious: PropTypes.bool.isRequired,
  canGoNext: PropTypes.bool.isRequired,
  onFirst: PropTypes.func.isRequired,
  onLast: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default Pagination;
