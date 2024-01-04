import React from "react";
import Pagination from "react-bootstrap/Pagination";

const Paginator = ({ totalPages, currentPage, onPageChange }) => {
  const createPageItems = () => {
    const items = [];
    for (let i = 1; i <= totalPages; i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => onPageChange(i)}
        >
          {items}
        </Pagination.Item>
      );
    }
    return items;
  };

  return (
    <Pagination>
      <Pagination.Prev
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
      {createPageItems()}
      <Pagination.Next
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  );
};

export default Paginator;
