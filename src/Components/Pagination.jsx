import React from "react";
import Pagination from "react-bootstrap/Pagination";
// import returnPaginationRange from "../Utils/appUtils";

const Paginator = ({ pokemon, itemsDisplay, setCurrentPage, currentPage }) => {
  if (pokemon != null) {
    let pages = [];
    let active = currentPage;

    for (let i = 0; i <= Math.ceil(pokemon.length / itemsDisplay); i++) {
      pages.push(
        <Pagination.Item
          key={i}
          active={i === active}
          onClick={() => setCurrentPage(i)}
        >
          {i + 1}
        </Pagination.Item>
      );
    }

    return (
      <div>
        <Pagination>
          <Pagination.First />
          <Pagination.Prev />
          {pages}
          {/* <Pagination.Ellipsis /> */}
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>
      </div>
    );
  }
};

export default Paginator;
