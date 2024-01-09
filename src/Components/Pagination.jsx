import React from "react";
import Pagination from "react-bootstrap/Pagination";
// import returnPaginationRange from "../Utils/appUtils";

const Paginator = ({ pokemon, itemsDisplay, setCurrentPage, currentPage }) => {
  if (pokemon != null) {
    let pages = [];
    let active = currentPage;

    for (let i = 0; i < Math.ceil(pokemon.length / itemsDisplay); i++) {
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
        <Pagination className="pagination justify-content-center">
          <Pagination.First onClick={() => setCurrentPage(0)} />
          <Pagination.Prev
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 0))}
          />
          {pages}
          <Pagination.Next
            onClick={() =>
              setCurrentPage(Math.min(currentPage + 1, pages.length - 1))
            }
          />
          <Pagination.Last onClick={() => setCurrentPage(pages.length - 1)} />
        </Pagination>
      </div>
    );
  }
};

export default Paginator;
