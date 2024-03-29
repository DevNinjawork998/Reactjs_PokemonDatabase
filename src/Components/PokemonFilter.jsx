import React, { useContext } from "react";
import styled from "@emotion/styled";

import PokemonContext from "../PokemonContext.js";

const Input = styled.input`
  width: 100%;
  padding: 0.2rem;
  font-size: large;
  padding-bottom: 0.5rem;
`;

const PokemonFilter = () => {
  const {
    state: { filter },
    dispatch,
  } = useContext(PokemonContext);

  return (
    <Input
      placeholder="Search"
      type="text"
      value={filter}
      onChange={(evt) =>
        dispatch({
          type: "SET_FILTER",
          payload: evt.target.value,
        })
      }
    />
  );
};

export default PokemonFilter;
