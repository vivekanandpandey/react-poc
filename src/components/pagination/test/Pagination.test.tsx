import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Pagination from '../../pagination/Pagination';

describe('Pagination component', () => {
    const mockOnPageChange = jest.fn();
    const data = Array.from({ length: 50 }, (_, i) => i + 1);
  
    test('renders pagination buttons correctly', () => {
      const { container } = render(
        <Pagination onPageChange={mockOnPageChange} pageSize={10} data={data} />
      );
  
      const paginationContainer = container.querySelector('.pagination-container');
      expect(paginationContainer).toBeInTheDocument();
  
      const paginationItems = container.querySelectorAll('.pagination-item');
      expect(paginationItems).toHaveLength(7); // Including previous, next, and dots
    });
  
    test('calls onPageChange with correct page number when page is clicked', () => {
      const { container, getByText, debug} = render(
        <Pagination onPageChange={mockOnPageChange} pageSize={10} data={data} />
      );
  console.log(debug())
  let secondPageButton:any;
    secondPageButton=  getByText('2')
      //const secondPageButton = getByText('2');
      fireEvent.click(secondPageButton);
  
      expect(mockOnPageChange).toHaveBeenCalledWith(data.slice(10, 20));
    });
  
    test('calls onPageChange with previous page number when previous button is clicked', () => {
      const { container } = render(
        <Pagination onPageChange={mockOnPageChange} pageSize={10} data={data} currentPage={3} />
      );
  
      const previousButton = container.querySelector('.left');
      if(previousButton)
      fireEvent.click(previousButton);
  
      expect(mockOnPageChange).toHaveBeenCalledWith(data.slice(10, 20));
    });
  
    test('calls onPageChange with next page number when next button is clicked', () => {
      const { container } = render(
        <Pagination onPageChange={mockOnPageChange} pageSize={10} data={data} currentPage={2} />
      );
  
      const nextButton = container.querySelector('.right');
      if(nextButton)
      fireEvent.click(nextButton);
  
      expect(mockOnPageChange).toHaveBeenCalledWith(data.slice(20, 30));
    });
  });
function waitFor(arg0: () => void) {
    throw new Error('Function not implemented.');
}

