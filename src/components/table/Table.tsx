import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";
export interface IDataType {
  ticker: string;
  price: number;
  assetClass: string;
}
interface Column<T> {
  key: keyof T;
  title: string;
}
export interface IColumnType {
  key: string;
  title: string;
}

type ObjectArray = { [key: string]: any };

type SortDirection = 'asc' | 'desc';

interface Props<T> {
  data: ObjectArray[];
  columns: Column<T>[];
  sort?:{
      isSortRequired:boolean,
      sortBy:string,
      sortOrder:SortDirection,
      handleSort:(key:string)=>void
  }
}



type SortByParam = "ticker" | "price" | "assetClass" | ""


export function Table<T extends any>({ data, columns,sort }: Props<T>): JSX.Element {

  return (
      <table>
        <thead>
          <TableHeader
            columns={columns}
            handleSort={(key: string) => sort?.handleSort((key as SortByParam))}
            sortBy={sort?.sortBy}
            sortOrder={sort?.sortOrder}
            isSortRequired={sort?.isSortRequired??false}
          />
        </thead>
        <tbody>
          <TableRow data={data} columns={columns} />
        </tbody>
      </table>
  );
}

