import React from "react";
import { Button } from "react-bootstrap";

import PokemonType from "../PokemonType";

const PokemonRow = ({ pokemon, onClick }) => (
  <>
    <tr>
      <td>{pokemon.name.english}</td>
      <td>{pokemon.type.join(", ")}</td>
      <td>
        <Button variant="info" color="primary" onClick={() => onClick(pokemon)}>
          More Information
        </Button>
      </td>
    </tr>
  </>
);

PokemonRow.propTypes = {
  pokemon: PokemonType,
};

export default PokemonRow;
