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
      </thead>
    </Table>
  );
}

export default PokemonTable;
