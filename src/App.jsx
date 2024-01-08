import React from "react";
import styled from "@emotion/styled";

import PokemonInfo from "./Components/PokemonInfo.jsx";
import PokemonContext from "./PokemonContext.js";
import PokemonFilter from "./Components/PokemonFilter.jsx";
import PokemonTable from "./Components/PokemonTable.jsx";

import "./App.css";
import Paginator from "./Components/Pagination.jsx";

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
  width: 900px;
  padding-top: 1em;
`;

function App() {
  // State Initialisation for Pagination
  const [currentPage, setCurrentPage] = React.useState(0);
  const itemsDisplay = 35;

  //State Initialisation for Pokemon
  const [filter, filterSet] = React.useState("");
  const [pokemon, pokemonSet] = React.useState(null);
  const [selectedPokemon, selectedPokemonSet] = React.useState(null);

  //Fetching pokemon data from localhost
  React.useEffect(() => {
    fetch("http://localhost:3000/pokemon.json")
      .then((resp) => resp.json())
      .then((data) => pokemonSet(data));
  }, []);

  if (!pokemon) {
    return <div>Loading data</div>;
  } else {
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
              <PokemonTable
                currentPage={currentPage}
                itemsDisplay={itemsDisplay}
              />
            </div>
            <PokemonInfo />
          </TwoColumnLayout>
          <Paginator
            pokemon={pokemon}
            itemsDisplay={itemsDisplay}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </PageContainer>
      </PokemonContext.Provider>
    );
  }
}

export default App;
