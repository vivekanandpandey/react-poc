import { useEffect, useState } from 'react';
import './App.scss';
import Table from "./components/table";
import {tableData,tableColumns} from './mocks/data'

let PageSize = 10;

interface IData {
  ticker: string;
  price: number;
  assetClass: string;
}

 interface IColumnType {
  key: string;
  title: string;
}


function App() {
 const [data,setData] =useState<IData[]>([])
 const [columns,setColumns] =useState<IColumnType[]>([])

 useEffect(()=>{
  setData([...tableData])
  setColumns([...tableColumns])
 },[])
 
  return (
      <div className="app-container">
      <h1>Financial Asset Overview</h1>
      <Table
        data={data}
        columns={columns}
        pagination={
          {isPaginationRequired:true,pageSize:PageSize}
        }
        sort={
          {isSortRequired:true,defaultSortkey:"assetClass",defaultSortOrder:"asc"}
        }
      />
      </div>
  );
}

export default App;
