import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TableComponent from '../../table';



const testData = [
  { id: 1, name: 'John', age: 30 },
  { id: 2, name: 'Jane', age: 25 },
];

const testColumns = [
  { key: 'id', title: 'ID' },
  { key: 'name', title: 'Name' },
  { key: 'age', title: 'Age' },
];

describe('TableComponent', () => {
  test('renders table without pagination', () => {
    const { getByText } = render(
      <TableComponent
        data={testData}
        columns={testColumns}
        pagination={{ isPaginationRequired: false }}
      />
    );

    // Check if table headers are rendered
    expect(getByText('ID')).toBeInTheDocument();
    expect(getByText('Name')).toBeInTheDocument();
    expect(getByText('Age')).toBeInTheDocument();

    // Check if table rows are rendered
    expect(getByText('John')).toBeInTheDocument();
    expect(getByText('Jane')).toBeInTheDocument();
  });

  test('renders table with pagination', () => {
    const { container,getByText } = render(
      <TableComponent
        data={testData}
        columns={testColumns}
        pagination={{ isPaginationRequired: true }}
      />
    );
    expect(getByText('1')).toBeInTheDocument();
    expect(getByText('2')).toBeInTheDocument();
    expect(container.getElementsByClassName('.pagination-bar')).toBeDefined();

  });
  test('renders table with sort', () => {
    const { container,getByText } = render(
      <TableComponent
        data={testData}
        columns={testColumns}
        pagination={{ isPaginationRequired: true }}
        sort={{
            isSortRequired:true,
            defaultSortkey:"",
            defaultSortOrder:"asc"
           }}
      />
    );
    expect(getByText('1')).toBeInTheDocument();
    expect(getByText('2')).toBeInTheDocument();
    expect(container.getElementsByClassName('.cursor-position')).toBeDefined();

  });

});
