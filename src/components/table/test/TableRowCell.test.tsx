import React from 'react';
import { render } from '@testing-library/react';
import { TableRowCell } from '../TableRowCell';

describe('TableRowCell component', () => {
  test('renders correct value', () => {
    const testItem = { id: 1, name: 'John', age: 30 };
    const testColumn = { key: "name", title: "Name"};

    const { getByText } = render(<TableRowCell item={testItem} column={testColumn} />);

    expect(getByText('John')).toBeInTheDocument();
  });

  test('applies color based on positive number', () => {
    const testItem = { id: 1, name: 'John', price: 50 };
    const testColumn = { key: 'price', title: 'Price' };

    const { getByText } = render(<TableRowCell item={testItem} column={testColumn} />);

    expect(getByText('50')).toHaveStyle('color: blue');
  });

  test('applies color based on negative number', () => {
    const testItem = { id: 1, name: 'John', price: -50 };
    const testColumn = { key: 'price', title: 'Price' };

    const { getByText } = render(<TableRowCell item={testItem} column={testColumn} />);

    expect(getByText('-50')).toHaveStyle('color: red');
  });

  test('applies black color for zero value', () => {
    const testItem = { id: 1, name: 'John', price: 0 };
    const testColumn = { key: 'price', title: 'Price' };

    const { getByText } = render(<TableRowCell item={testItem} column={testColumn} />);

    expect(getByText('0')).toHaveStyle('color: black');
  });

  test('does not apply color for non-numeric value', () => {
    const testItem = { id: 1, name: 'John', price: 'N/A' };
    const testColumn = { key: 'price', title: 'Price' };

    const { getByText } = render(<TableRowCell item={testItem} column={testColumn} />);

    expect(getByText('N/A')).toHaveStyle('color: inherit');
  });

  test('renders value without color if column key does not match "price"', () => {
    const testItem = { id: 1, name: 'John', age: 30 };
    const testColumn = { key: 'age', title: 'Age' };

    const { getByText } = render(<TableRowCell item={testItem} column={testColumn} />);

    expect(getByText('30')).toHaveStyle('color: inherit');
  });
});
