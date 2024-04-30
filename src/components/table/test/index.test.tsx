import React from 'react';
import { render, fireEvent, waitFor,  } from '@testing-library/react';
import TableComponent from '../../table';

describe('TableComponent', () => {
  const testData = [
    { id: 1, name: 'John', age: 30 },
    { id: 2, name: 'Jane', age: 25 },
  ];

  const testColumns = [
    { key: 'id', title: 'ID' },
    { key: 'name', title: 'Name' },
    { key: 'age', title: 'Age' },
  ];

  test('renders table without pagination', async () => {
    const { getByText } = render(
      <TableComponent
        data={testData}
        columns={testColumns}
        pagination={{ isPaginationRequired: false }}
        sort={
          {isSortRequired:true,defaultSortkey:"assetClass",defaultSortOrder:"asc"}
        }
      />
    );
  //await waitFor(()=>{
 // Check if table headers are rendered
 expect(getByText('ID')).toBeInTheDocument();
 expect(getByText('Name')).toBeInTheDocument();
 expect(getByText('Age')).toBeInTheDocument();

 // Check if table rows are rendered
 expect(getByText('John')).toBeInTheDocument();
 expect(getByText('Jane')).toBeInTheDocument();
  //})
   
  });
  
  test('renders table with pagination', async () => {
    const { getByTestId ,getByText} = render(
      <TableComponent
        data={testData}
        columns={testColumns}
        pagination={{ isPaginationRequired: true }}
      />
    );
  
   await waitFor(()=>{
      // Check if pagination component is rendered
   // expect(getByTestId('pagination-bar')).toBeInTheDocument();
    // Check if pagination controls are rendered
    expect(getByText('1')).toBeInTheDocument();
    expect(getByText('2')).toBeInTheDocument();
    })
  });
  
  test('renders table with sorting', async () => {
    const { getByText, getByTestId } = render(
      <TableComponent
        data={testData}
        columns={testColumns}
        sort={{
          isSortRequired: true,
          defaultSortkey: 'id',
          defaultSortOrder: 'asc'
        }}
      />
    );
  
    // Check if sorting controls are rendered
    const idHeader = getByText('ID ↑');
    fireEvent.click(idHeader); // Trigger sorting by ID
  
    // Wait for sorting to take effect
    await waitFor(() => {
      expect(getByTestId('sort-0')).toHaveTextContent('ID');
      // Assert other sorting-related changes here
    });
  });
  
});
