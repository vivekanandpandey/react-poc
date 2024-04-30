import { useEffect, useState } from "react";

export type SortDirection = "asc" | "desc";

export const useSort = ({ defaultSortkey, defaultSortOrder }: any) => {
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<SortDirection>("asc");

  useEffect(() => {
    setSortBy(defaultSortkey);
    setSortOrder(defaultSortOrder);
  }, [defaultSortkey, defaultSortOrder]);

  const handleSort = (columnName: string): void => {
    if (sortBy === columnName) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(columnName);
      setSortOrder("asc");
    }
  };

  return { sortBy, sortOrder, handleSort };
};
