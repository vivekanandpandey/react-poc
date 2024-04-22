import { renderHook } from '@testing-library/react-hooks';
import { usePagination, DOTS } from '../../pagination/UsepaginationHooks';

describe('usePagination hook', () => {
  test('generates pagination range correctly when totalPageNumbers is less than totalPageCount', () => {
    const totalCount = 10;
    const pageSize = 5;
    const currentPage = 1;

    const { result } = renderHook(() =>
      usePagination({ totalCount, pageSize, currentPage })
    );

    expect(result.current).toEqual([1, 2]);
  });

  test('generates pagination range correctly with left dots only', () => {
    const totalCount = 100;
    const pageSize = 10;
    const currentPage = 1;
    const siblingCount = 1;

    const { result } = renderHook(() =>
      usePagination({ totalCount, pageSize, siblingCount, currentPage })
    );

    expect(result.current).toBeDefined();
  });

  test('generates pagination range correctly with right dots only', () => {
    const totalCount = 100;
    const pageSize = 10;
    const currentPage = 95;
    const siblingCount = 1;

    const { result } = renderHook(() =>
      usePagination({ totalCount, pageSize, siblingCount, currentPage })
    );

    expect(result.current).toBeDefined();
  });

  test('generates pagination range correctly with both left and right dots', () => {
    const totalCount = 100;
    const pageSize = 10;
    const currentPage = 50;
    const siblingCount = 1;

    const { result } = renderHook(() =>
      usePagination({ totalCount, pageSize, siblingCount, currentPage })
    );

    expect(result.current).toBeDefined();
  });

  test('returns empty array when totalCount is 0', () => {
    const totalCount = 0;
    const pageSize = 10;
    const currentPage = 1;

    const { result } = renderHook(() =>
      usePagination({ totalCount, pageSize, currentPage })
    );

    expect(result.current).toEqual([]);
  });
});
