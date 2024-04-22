import { useEffect, useState } from "react";
import { Table } from "./Table";
import Pagination from "../pagination/Pagination";
import { useSort, SortDirection } from '../sorting/useSortHooks';
import classnames from "classnames";
import'./styles/table.scss';
interface Column<T> {
  key: keyof T;
  title: string;
}
type ObjectArray = { [key: string]: any };
interface Itable<T> {
  data: ObjectArray[];
  columns: Column<T>[];
  pagination?: { isPaginationRequired: Boolean; pageSize?: number };
  sort?:{
   isSortRequired:boolean,
   defaultSortkey?:string,
   defaultSortOrder?:SortDirection
  }
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
  sort={
    isSortRequired:false,
    defaultSortkey:"",
    defaultSortOrder:"asc"
   }
}: Itable<T>): JSX.Element {
  const [currentPageData, setCurrentPageData] = useState(data);
  const [dataList,setDataList]=useState(data);
  const { sortBy, sortOrder, handleSort } = useSort({defaultSortkey:sort?.defaultSortkey,defaultSortOrder:sort?.defaultSortOrder});

  const sortedData = (sData:any=dataList)=> {
    if (!sortBy) return sData;
    let sortByField = (sortBy as any)?.toLocaleLowerCase()
    let sortedArray :ObjectArray[]= [...sData].sort((a, b) => {
      const aElement = sortByField === "assetclass" ? AssetClassWeight[a[sortBy] as number] : sortByField === "ticker" ? (a[sortBy] as string)?.toLocaleLowerCase() : a[sortBy];
      const bElement = sortByField === "assetclass" ? AssetClassWeight[b[sortBy] as number] : sortByField === "ticker" ? (b[sortBy] as string)?.toLocaleLowerCase() : b[sortBy]
      return sortData(sortOrder, aElement, bElement)
    });
    setDataList([...sortedArray]);
    if(!pagination?.isPaginationRequired){
        setCurrentPageData([...sortedArray])
    }
  };
  useEffect(()=>{
    if(data.length>0){
        setCurrentPageData([...data])
        setDataList([...data])  
        sortedData(data)
    }
  },[data])
  const sortData = (order: SortDirection, firstElemet: string | number, secondElement: string | number) => {
    if (order === 'asc') {
      return firstElemet > secondElement ? 1 : -1;
    } else {
      return firstElemet < secondElement ? 1 : -1;
    }
  }
useEffect(()=>{
    if(sort?.isSortRequired && dataList.length>0){
        sortedData()
    }
},[sortBy,sortOrder])

  return (
    <>
      <div className={classnames('table-container', {
          'custom-height': !pagination?.isPaginationRequired
        })}>
        {currentPageData.length>0 &&<Table 
        data={currentPageData} 
        columns={columns}
        sort={{isSortRequired:sort.isSortRequired,sortBy, sortOrder,handleSort:(key: string) => handleSort((key))}}
        />}
      </div>
      {pagination?.isPaginationRequired && (
        <Pagination
          className="pagination-bar"
          pageSize={pagination?.pageSize || 10}
          onPageChange={(data) => {
            setCurrentPageData(data);
          }}
          data={dataList}
        />
      )}
    </>
  );
}
export default TableComponent;
