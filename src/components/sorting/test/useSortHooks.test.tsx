import { renderHook, act } from '@testing-library/react-hooks';
import { useSort } from '../useSortHooks';

describe('useSort hook', () => {
  test('initializes state correctly', () => {
    const { result } = renderHook(() => useSort({defaultSortkey:"",defaultSortOrder:"asc"}));

    expect(result.current.sortBy).toBe('');
    expect(result.current.sortOrder).toBe('asc');
  });

  test('handles sorting correctly', () => {
    const { result } = renderHook(() => useSort({defaultSortkey:"",defaultSortOrder:"asc"}));

    // Simulate sorting by a column for the first time
    act(() => {
      result.current.handleSort('name');
    });
    expect(result.current.sortBy).toBe('name');
    expect(result.current.sortOrder).toBe('asc');

    // Simulate sorting by the same column again
    act(() => {
      result.current.handleSort('name');
    });
    expect(result.current.sortBy).toBe('name');
    expect(result.current.sortOrder).toBe('desc');

    // Simulate sorting by a different column
    act(() => {
      result.current.handleSort('age');
    });
    expect(result.current.sortBy).toBe('age');
    expect(result.current.sortOrder).toBe('asc');
  });

  test('toggles sort order correctly', () => {
    const { result } = renderHook(() => useSort({defaultSortkey:"",defaultSortOrder:"asc"}));

    // Simulate sorting by a column for the first time
    act(() => {
      result.current.handleSort('name');
    });
    expect(result.current.sortOrder).toBe('asc');

    // Simulate sorting by the same column again
    act(() => {
      result.current.handleSort('name');
    });
    expect(result.current.sortOrder).toBe('desc');

    // Simulate sorting by a different column
    act(() => {
      result.current.handleSort('age');
    });
    expect(result.current.sortOrder).toBe('asc');
  });
});
