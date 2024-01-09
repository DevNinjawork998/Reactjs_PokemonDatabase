import React, { useContext } from "react";
import { Table } from "react-bootstrap";

import PokemonRow from "./PokemonRow";
import PokemonContext from "../PokemonContext";

function PokemonTable({ currentPage, itemsDisplay }) {
  const { filter, pokemon, selectedPokemonSet } = useContext(PokemonContext);

  //Pagination function
  const lastPostIndex = currentPage * itemsDisplay;

  return (
    <Table striped width="100%">
      <thead>
        <tr>
          <th>Pokemon</th>
          <th>Type</th>
          <th>More Info</th>
        </tr>
      </thead>
      <tbody>
        {pokemon
          .filter(({ name: { english } }) =>
            english.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
          )
          .slice(lastPostIndex, lastPostIndex + itemsDisplay)
          .map((pokemon) => (
            <PokemonRow
              pokemon={pokemon}
              onClick={(pokemon) => selectedPokemonSet(pokemon)}
            />
          ))}
      </tbody>
    </Table>
  );
}

export default PokemonTable;
