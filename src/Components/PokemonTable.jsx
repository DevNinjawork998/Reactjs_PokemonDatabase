import React, { useContext } from "react";
import { Table } from "react-bootstrap";

import PokemonRow from "./PokemonRow";
import PokemonContext from "../PokemonContext";

function PokemonTable() {
  const { filter, pokemon, selectedPokemonSet } = useContext(PokemonContext);
  return (
    <Table striped width="100%">
      <tbody>
        {pokemon
          .filter(({ name: { english } }) =>
            english.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
          )
          .slice(0, 20)
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