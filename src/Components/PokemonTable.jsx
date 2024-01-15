import React, { useContext } from "react";
import { Table } from "react-bootstrap";

import PokemonRow from "./PokemonRow";
import PokemonContext from "../PokemonContext";

function PokemonTable({ currentPage, itemsDisplay }) {
  const {
    state: { filter, pokemon },
    dispatch,
  } = useContext(PokemonContext);

  //Pagination function
  const lastPostIndex = currentPage * itemsDisplay;

  return (
    <Table striped width="auto">
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
              key={pokemon.id}
              pokemon={pokemon}
              onClick={(pokemon) =>
                dispatch({ type: "SET_SELECTED_POKEMON", payload: pokemon })
              }
            />
          ))}
      </tbody>
    </Table>
  );
}

export default PokemonTable;
