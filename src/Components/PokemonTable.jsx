import React, { useContext, useState } from "react";
import { Table } from "react-bootstrap";

import PokemonRow from "./PokemonRow";
import PokemonContext from "../PokemonContext";
import Paginator from "./Pagination";

function PokemonTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 20;
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const { filter, pokemon, selectedPokemonSet } = useContext(PokemonContext);

  return (
    <Table striped width="100%">
      <thead>
        <tbody>
          {pokemon
            .filter(({ name: { english } }) =>
              english.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
            )
            .map((pokemon) => (
              <PokemonRow
                pokemon={pokemon}
                onClick={(pokemon) => selectedPokemonSet(pokemon)}
              />
            ))}
        </tbody>
      </thead>
      <tr>
        <Paginator
          className="pagination-md"
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
        <Paginator.First />
        <Paginator.Prev />
        <Paginator.Next />
        <Paginator.Last />
      </tr>
    </Table>
  );
}

export default PokemonTable;
