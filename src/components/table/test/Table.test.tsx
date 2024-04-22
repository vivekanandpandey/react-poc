import React from 'react';
import { fireEvent, getByTestId, getByText, render } from '@testing-library/react';
import { Table } from '../../table/Table';
import {screen} from '@testing-library/dom'
// Mock TableHeader and TableRow components


describe('Table component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders table with TableHeader and TableRow components', () => {
    const testData = [
      { id: 1, name: 'John', age: 30 },
      { id: 2, name: 'Jane', age: 25 },
    ];

    const testColumns = [
      { key: 'id', title: 'ID' },
      { key: 'name', title: 'Name' },
      { key: 'age', title: 'Age' },
    ];

    const testSort = {
      isSortRequired: true,
      sortBy: 'name',
      sortOrder: 'asc',
      handleSort: jest.fn().mockImplementation(()=>{}),
    };

   const{container}= render(
      <Table
        data={testData}
        columns={testColumns}
      />
    );
    expect(container.getElementsByTagName("table")).toBeDefined()
    const element = screen.getByTestId('sort-1')
    fireEvent.click(element);

  });
});
