import { useCallback, useEffect, useState } from "react";
import { Table } from "./Table";
import Pagination from "../pagination/Pagination";
import { useSort, SortDirection } from "../sorting/useSortHooks";
import classnames from "classnames";
import "./styles/table.scss";
interface Column<T> {
  key: keyof T;
  title: string;
}
type ObjectArray = { [key: string]: any };
interface Itable<T> {
  data: ObjectArray[];
  columns: Column<T>[];
  pagination?: { isPaginationRequired: Boolean; pageSize?: number };
  sort?: {
    isSortRequired: boolean;
    defaultSortkey?: string;
    defaultSortOrder?: SortDirection;
  };
}
enum AssetClassWeight {
  Commodities = 10,
  Equities = 100,
  Credit = 1000,
}

function TableComponent<T>({
  data = [],
  columns = [],
  pagination = {
    isPaginationRequired: false,
    pageSize: 10,
  },
  sort = {
    isSortRequired: false,
    defaultSortkey: "",
    defaultSortOrder: "asc",
  },
}: Itable<T>): JSX.Element {
  const { isSortRequired, defaultSortkey, defaultSortOrder } = sort;
  const { isPaginationRequired, pageSize } = pagination;
  const [currentPageData, setCurrentPageData] = useState<ObjectArray[]>([]);
  const [dataList, setDataList] = useState<ObjectArray[]>([]);
  const { sortBy, sortOrder, handleSort } = useSort({
    defaultSortkey,
    defaultSortOrder,
  });

  const updatePageData = useCallback((updataedData: ObjectArray[]) => {
    setCurrentPageData(updataedData);
  }, []);

  useEffect(() => {
    setDataList([...data]);
  }, [data, isPaginationRequired]);

  useEffect(() => {
    const sortedData = () => {
      const sortData = (
        order: SortDirection,
        firstElemet: string | number,
        secondElement: string | number
      ) => {
        if (order === "asc") {
          return firstElemet > secondElement ? 1 : -1;
        } else {
          return firstElemet < secondElement ? 1 : -1;
        }
      };

      if (!sortBy) return;

      let sortByField = (sortBy as any)?.toLocaleLowerCase();
      let sortedArray: ObjectArray[] = [...data].sort((a, b) => {
        const aElement =
          sortByField === "assetclass"
            ? AssetClassWeight[a[sortBy] as number]
            : sortByField === "ticker"
            ? (a[sortBy as keyof typeof a] as string)?.toLocaleLowerCase()
            : a[sortBy as keyof typeof a];
        const bElement =
          sortByField === "assetclass"
            ? AssetClassWeight[b[sortBy] as number]
            : sortByField === "ticker"
            ? (b[sortBy as keyof typeof b] as string)?.toLocaleLowerCase()
            : b[sortBy as keyof typeof b];
        return sortData(sortOrder, aElement, bElement);
      });

      setDataList([...sortedArray]);
      if (!isPaginationRequired) {
        setCurrentPageData([...sortedArray]);
      }
    };

    sortedData();
  }, [
    data,
    sortBy,
    sortOrder,
    isSortRequired,
    defaultSortkey,
    defaultSortOrder,
    isPaginationRequired,
    pageSize,
    updatePageData,
  ]);

  return (
    <>
      <div
        className={classnames("table-container", {
          "custom-height": !isPaginationRequired,
        })}
      >
        {currentPageData.length > 0 && (
          <Table
            data={currentPageData}
            columns={columns}
            sort={{ isSortRequired, sortBy, sortOrder, handleSort }}
          />
        )}
      </div>
      {isPaginationRequired && (
        <Pagination
          className="pagination-bar"
          pageSize={pageSize || 10}
          onPageChange={updatePageData}
          data={dataList}
        />
      )}
    </>
  );
}

export default TableComponent;
