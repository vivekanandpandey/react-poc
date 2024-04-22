import React from 'react';
import { render } from '@testing-library/react';
import { TableRow } from '../../table/TableRow';

describe('TableRow component', () => {
    const testColumns = [
      { key: 'id', title: 'ID' },
      { key: 'name', title: 'Name' },
      { key: 'age', title: 'Age' },
      // Add more columns if needed
    ];
  
    test('renders correct number of rows and cells', () => {
      const testData = [
        { id: 1, name: 'John', age: 30, assetClass: 'Commodities' },
        { id: 2, name: 'Jane', age: 25, assetClass: 'Equities' },
      ];
  
      const { getAllByRole } = render(
        <table>
          <tbody>
            <TableRow data={testData} columns={testColumns} />
          </tbody>
        </table>
      );
  
      // Check if the correct number of rows are rendered
      const rows = getAllByRole('row');
      expect(rows).toHaveLength(testData.length);
  
      // Check if the correct number of cells are rendered in each row
      rows.forEach((row) => {
        const cells = row.querySelectorAll('td');
        expect(cells).toHaveLength(testColumns.length);
      });
    });
  
    test('applies correct row colors based on asset class', () => {
      const testData = [
        { id: 1, name: 'John', age: 30, assetClass: 'Commodities' },
        { id: 2, name: 'Jane', age: 25, assetClass: 'Equities' },
        { id: 3, name: 'Doe', age: 35, assetClass: 'Credit' },
      ];
  
      const { getByText } = render(
        <table>
          <tbody>
            <TableRow data={testData} columns={testColumns} />
          </tbody>
        </table>
      );
  
      // Check if row colors are applied correctly
      expect(getByText('John').closest('tr')).toHaveStyle('background-color: white');
      expect(getByText('Jane').closest('tr')).toHaveStyle('background-color: #0068ff');
      expect(getByText('Doe').closest('tr')).toHaveStyle('background-color: Green');
    });
  
    test('handles missing asset class gracefully', () => {
      const testData = [
        { id: 1, name: 'John', age: 30 },
        { id: 2, name: 'Jane', age: 25 },
      ];
  
      const { getByText } = render(
        <table>
          <tbody>
            <TableRow data={testData} columns={testColumns} />
          </tbody>
        </table>
      );
  
      // Check if row colors are transparent for missing asset class
      expect(getByText('John').closest('tr')).toHaveStyle('background-color: transparent');
      expect(getByText('Jane').closest('tr')).toHaveStyle('background-color: transparent');
    });
  
    test('handles missing columns gracefully', () => {
      const testData = [
        { id: 1, name: 'John', age: 30, assetClass: 'Commodities' },
        { id: 2, name: 'Jane', age: 25, assetClass: 'Equities' },
      ];
  
      const { getAllByRole } = render(
        <table>
          <tbody>
            <TableRow data={testData} columns={[]} />
          </tbody>
        </table>
      );
  
      // Check if no cells are rendered when columns are missing
      const rows = getAllByRole('row');
      rows.forEach((row) => {
        const cells = row.querySelectorAll('td');
        expect(cells).toHaveLength(0);
      });
    });
  });
  
