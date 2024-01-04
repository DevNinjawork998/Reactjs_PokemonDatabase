import React, { useContext } from "react";
import styled from "@emotion/styled";

import PokemonContext from "../PokemonContext";

const PokemonInfo = () => {
    const { selectedPokemon } = useContext(PokemonContext);
  
    return selectedPokemon ? (
      <div>
        <h2>{selectedPokemon.name.english}</h2>
        <table>
          <tbody>
            {Object.keys(selectedPokemon.base).map((key) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{selectedPokemon.base[key]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : null;
  };

  export default PokemonInfo;