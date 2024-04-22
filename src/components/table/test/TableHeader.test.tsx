import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { TableHeader } from '../../table/TableHeader';

describe('TableHeader component', () => {
  test('renders table header with columns', () => {
    const testColumns = [
      { key: 'id', title: 'ID' },
      { key: 'name', title: 'Name' },
      { key: 'age', title: 'Age' },
    ];

    const { getByText } = render(
      <table>
        <thead>
          <TableHeader
            columns={testColumns}
            handleSort={jest.fn()}
            sortBy={undefined}
            sortOrder={undefined}
            isSortRequired={true}
          />
        </thead>
      </table>
    );

    // Check if table headers are rendered
    expect(getByText('ID')).toBeInTheDocument();
    expect(getByText('Name')).toBeInTheDocument();
    expect(getByText('Age')).toBeInTheDocument();
  });

  test('handles sort when isSortRequired is true', () => {
    const handleSort = jest.fn();
    const testColumns = [
      { key: 'id', title: 'ID' },
      { key: 'name', title: 'Name' },
      { key: 'age', title: 'Age' },
    ];

    const { getByText } = render(
      <table>
        <thead>
          <TableHeader
            columns={testColumns}
            handleSort={handleSort}
            sortBy={undefined}
            sortOrder={undefined}
            isSortRequired={true}
          />
        </thead>
      </table>
    );

    // Click on a table header cell
    fireEvent.click(getByText('ID'));

    // Verify that handleSort function is called with correct key
    expect(handleSort).toHaveBeenCalledWith('id');
  });

  test('does not handle sort when isSortRequired is false', () => {
    const handleSort = jest.fn();
    const testColumns = [
      { key: 'id', title: 'ID' },
      { key: 'name', title: 'Name' },
      { key: 'age', title: 'Age' },
    ];

    const { getByText } = render(
      <table>
        <thead>
          <TableHeader
            columns={testColumns}
            handleSort={handleSort}
            sortBy={undefined}
            sortOrder={undefined}
            isSortRequired={false}
          />
        </thead>
      </table>
    );

    // Click on a table header cell
    fireEvent.click(getByText('ID'));

    // Verify that handleSort function is not called
    expect(handleSort).not.toHaveBeenCalled();
  });
});
