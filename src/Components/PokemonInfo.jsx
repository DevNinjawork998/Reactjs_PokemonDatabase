import React, { useContext } from "react";
import Table from "react-bootstrap/Table";
import PokemonContext from "../PokemonContext";

const PokemonInfo = () => {
  const { selectedPokemon } = useContext(PokemonContext);

  return selectedPokemon ? (
    <div>
      <h2>{selectedPokemon.name.english}</h2>
      <Table>
        <tbody>
          {Object.keys(selectedPokemon.base).map((key) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{selectedPokemon.base[key]}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  ) : null;
};

export default PokemonInfo;
