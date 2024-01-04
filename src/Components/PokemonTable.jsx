import React, { useContext } from "react";
import { Table, Pagination } from "react-bootstrap";

import PokemonRow from "./PokemonRow";
import PokemonContext from "../PokemonContext";

function ArraySlicing(pokemon) {
  var size = 20; var arrayOfArray =[];
  while (pokemon.length > size) {
          arrayOfArray.push(pokemon.splice(0, size));
}};

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
      <tr>
      <Pagination>
        <Pagination.First/>
        <Pagination.Prev/>
        <Pagination.Next/>
        <Pagination.Last/>
      </Pagination>
      </tr>
    </Table>
  );
}

export default PokemonTable;