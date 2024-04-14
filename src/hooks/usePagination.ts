import { useState, useMemo } from "react";

interface PaginationResult<T> {
  currentPage: number;
  totalPages: number;
  currentItems: T[];
  indexOfFirstItem: number;
  handlePageChange: (newPage: number) => void;
}

const usePagination = <T>(data: T[], itemsPerPage = 5): PaginationResult<T> => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(
    () => Math.ceil((data || [])?.length / itemsPerPage) || 1,
    [data, itemsPerPage]
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem) || [];

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return {
    currentPage,
    totalPages,
    currentItems,
    indexOfFirstItem,
    handlePageChange,
  };
};

export default usePagination;
