

import { TableRowCell } from "./TableRowCell";

interface Column<T> {
  key: keyof T;
  title: string;
}
type ObjectArray = { [key: string]: any };
interface Props<T> {
  data: ObjectArray[];
  columns: Column<T>[];
}
enum AssetClassColorCode {
  commodities = "white",
  equities = "#0068ff",
  credit = "Green",
}

export function TableRow<T>({ data, columns }: Props<T>): JSX.Element {
  const getRowColor = (columnName: string): string => {
    switch (columnName?.toLocaleLowerCase()) {
      case 'commodities':
        return AssetClassColorCode.commodities;
      case 'equities':
        return AssetClassColorCode.equities;
      case 'credit':
        return AssetClassColorCode.credit;
      default:
        return 'transparent';
    }
  };
  return (
    <>
      {data.map((item:any , itemIndex: number) => (
        <tr key={`table-body-${itemIndex}`} className="table-row"
          style={{ backgroundColor: getRowColor((data[itemIndex] as any).assetClass) }}
        >
          {columns.map((column:Column<T>, columnIndex) => (
            <TableRowCell
              key={`table-row-cell-${columnIndex}`}
              item={item}
              column={column}
            />
          ))}
        </tr>
      ))}
    </>
  );
}