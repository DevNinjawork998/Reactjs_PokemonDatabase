import React, { useContext } from "react";
import { Table } from "react-bootstrap";

import PokemonRow from "./PokemonRow";
import PokemonContext from "../PokemonContext";

function PokemonTable({ currentPage }) {
  const { filter, pokemon, selectedPokemonSet } = useContext(PokemonContext);

  //Set itemsDisplay for Pagination
  const itemsDisplay = 20;

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
            .map((pokemon +1) => (
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
