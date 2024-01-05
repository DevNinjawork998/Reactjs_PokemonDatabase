import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import styled from "@emotion/styled";

import PokemonType from "../PokemonType";

const PokemonRow = ({ pokemon, onClick }) => (
  <>
    <tr key={pokemon.id}>
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
  pokemon: PropTypes.arrayOf(PokemonType),
};

export default PokemonRow;
