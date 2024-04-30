import React, { useState, useEffect } from "react";
import classnames from "classnames";
import { usePagination, DOTS } from "./UsepaginationHooks";
import "./styles/pagination.scss";

interface PaginationProps<T> {
  onPageChange: (page: any[]) => void;
  siblingCount?: number;
  currentPage?: number;
  pageSize: number;
  className?: string;
  data: T[];
}

function Pagination<T>({
  onPageChange,
  siblingCount = 1,
  pageSize,
  currentPage: currPage = 1,
  className,
  data,
}: PaginationProps<T>): JSX.Element {
  const totalCount = data.length;

  const [currentPage, setCurrentPage] = useState(currPage);

  useEffect(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    const currentTableData = data.slice(firstPageIndex, lastPageIndex);
    onPageChange(currentTableData);
  }, [currentPage, data, onPageChange, pageSize]);

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return <></>;
  }

  const onNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const onPrevious = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul
      className={classnames("pagination-container", {
        [className!]: className,
      })}
    >
      <li
        className={classnames("pagination-item", {
          disabled: currentPage === 1,
        })}
        onClick={onPrevious}
      >
        <div className="arrow left" />
      </li>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <li key={index} className="pagination-item dots">
              &#8230;
            </li>
          );
        }
        return (
          <li
            key={pageNumber}
            className={classnames("pagination-item", {
              selected: pageNumber === currentPage,
            })}
            onClick={() => handlePageChange(pageNumber as number)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={classnames("pagination-item", {
          disabled: currentPage === lastPage,
        })}
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
    </ul>
  );
}

export default Pagination;
