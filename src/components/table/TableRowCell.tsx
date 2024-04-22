


interface Column<T> {
  key: keyof T;
  title: string;
}

interface Props<T> {
  item: any;
  column: Column<T>;
}

interface ColorCodeFunction {
  (value: number): 'red' | 'blue' | 'black';
}

const getNumberColor: ColorCodeFunction = (value: number) => {
  if (value > 0) {
    return 'blue';
  } else if (value < 0) {
    return 'red';
  } else {
    return 'black';
  }
};

export function TableRowCell<T>({ item, column }: Props<T>): JSX.Element {
  
  const value = item[column.key as keyof typeof item] as any;
  return (
    <td className="table-header" style={column.key === "price" && typeof value === "number" ? { color: `${getNumberColor(value)}` } : {}}>{value}</td>
  );
}