import React, { useState } from "react";
import styled from "@emotion/styled";

import PokemonInfo from "./Components/PokemonInfo.jsx";
import PokemonContext from "./PokemonContext";
import PokemonFilter from "./Components/PokemonFilter.jsx";
import PokemonTable from "./Components/PokemonTable.jsx";

import "./App.css";

const Title = styled.h1`
  text-align: center;
}`;

const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
  grid-column-gap: 1rem;
`;

const PageContainer = styled.div`
  margin: auto;
  width: 800px;
  padding-top: 1em;
`;

function App() {
  const [filter, filterSet] = React.useState("");
  const [pokemon, pokemonSet] = React.useState(null);
  const [selectedPokemon, selectedPokemonSet] = React.useState(null);

  React.useEffect(() => {
    fetch("http://localhost:3000/pokemon.json")
      .then((resp) => resp.json())
      .then((data) => pokemonSet(data));
  }, []);

  if (!pokemon) {
    return <div>Loading data</div>;
  }

  return (
    <PokemonContext.Provider
      value={{
        filter,
        pokemon,
        filterSet,
        pokemonSet,
        selectedPokemon,
        selectedPokemonSet,
      }}
    >
      <PageContainer>
        <Title>Pokemon Search</Title>
        <TwoColumnLayout>
          <div>
            <PokemonFilter />
            <PokemonTable />
          </div>
          <PokemonInfo />
        </TwoColumnLayout>
      </PageContainer>
    </PokemonContext.Provider>
  );
}

export default App;
