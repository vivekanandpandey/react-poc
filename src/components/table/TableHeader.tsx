import classNames from "classnames";

interface Column<T> {
  key: keyof T;
  title: string;
}
interface Props<T>{
  columns: Column<T>[];
  handleSort: (data:string) => void;
  sortBy:undefined|string
  sortOrder:undefined|string
  isSortRequired:boolean
}



export function TableHeader<T>({ columns,handleSort,sortBy,sortOrder,isSortRequired }: Props<T>): JSX.Element {
  return (
    <tr>
      {columns.map((column, columnIndex) => (
        <th
        className={classNames("table-header",{"cursor-position":isSortRequired})}
          key={`table-head-cell-${columnIndex}`}
          data-testid=  {`sort-${columnIndex}`}
          onClick={()=>isSortRequired && handleSort((column.key as string))}
        >
          {column.title} {isSortRequired && sortBy === column.key && (sortOrder === 'asc' ? '↑' : '↓')}
        </th>
      ))}
    </tr>
  );
}