import React,{useState, useEffect} from 'react';
import classnames from "classnames";
import { usePagination, DOTS } from './UsepaginationHooks';
 import './styles/pagination.scss';

interface PaginationProps<T> {
  onPageChange: (page: any[]) => void;
  siblingCount?: number;
  currentPage?: number;
  pageSize: number;
  className?: string;
  data:T[]
}



function Pagination<T> ({
  onPageChange,
  siblingCount = 1,
  pageSize,
  currentPage:currPage,
  className,
  data
}: PaginationProps<T>): JSX.Element  {
    const totalCount=data.length

    const [currentPage, setCurrentPage] = useState(currPage??1);
    useEffect(() => {
      const firstPageIndex = (currentPage - 1) * pageSize;
      const lastPageIndex = firstPageIndex + pageSize;
       const currentTableData =data.slice(firstPageIndex, lastPageIndex);
       onPageChange(currentTableData)
    }, [currentPage,data]);
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });
 
  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return <></>;
  }

  const onNext = () => {
    setCurrentPage(currentPage + 1)
    //onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    setCurrentPage(currentPage - 1)
   // onPageChange(currentPage - 1);
  };
  const handlePageChange=(pageNumber:number)=>{
    setCurrentPage(pageNumber)
  }

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul
      className={classnames('pagination-container', { [className!]: className })}
    >
       {/* Left navigation arrow */}
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === 1
        })}
        onClick={onPrevious}
      >
        <div className="arrow left" />
      </li>
      {paginationRange.map((pageNumber) => {
         
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return <li className="pagination-item dots">&#8230;</li>;
        }
		
        // Render our Page Pills
        return (
          <li
            key={pageNumber}
            className={classnames('pagination-item', {
              selected: pageNumber === currentPage
            })}
            onClick={() => handlePageChange((pageNumber as number))}
          >
            {pageNumber}
          </li>
        );
      })}
      {/*  Right Navigation arrow */}
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === lastPage
        })}
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
    </ul>
  );
};

export default Pagination;
