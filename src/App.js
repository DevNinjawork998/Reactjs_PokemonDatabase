import React from "react";
import Styled from "@emotion/styled";
import { Spinner, Image, Row } from "react-bootstrap";

//Import components
import PokemonInfo from "./Components/PokemonInfo.jsx";
import PokemonContext from "./PokemonContext.js";
import PokemonFilter from "./Components/PokemonFilter.jsx";
import PokemonTable from "./Components/PokemonTable.jsx";
import Paginator from "./Components/Pagination.jsx";

import "./App.css";

const Title = Styled.h1`
text-align: center;
margin-top: 3.0rem
gap: 5px
}`;

const TwoColumnLayout = Styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
  grid-column-gap: 1rem;
`;

const PageContainer = Styled.div`
  margin: auto;
  width: 900px;
  padding-top: 1em;
`;

function App() {
  // State Initialisation for Pagination
  const [currentPage, setCurrentPage] = React.useState(0);
  const itemsDisplay = 40;

  // Use Reducer for Pokemon Context Management.
  const pokemonReducer = (state, action) => {
    switch (action.type) {
      case "SET_FILTER":
        return {
          ...state,
          filter: action.payload,
        };
      case "SET_POKEMON":
        return {
          ...state,
          pokemon: action.payload,
        };
      case "SET_SELECTED_POKEMON":
        return {
          ...state,
          selectedPokemon: action.payload,
        };
      case "SET_CURRENTPAGE":
        return {
          ...state,
          currentPage: action.payload,
        };
      default: {
        throw new Error("No Action");
      }
    }
  };

  //State Initialisation for Pokemon
  const [state, dispatch] = React.useReducer(pokemonReducer, {
    filter: "",
    pokemon: [],
    selectedPokemon: null,
    setCurrentPage: null,
    itemsDisplay: 40,
    currentPage: 0,
  });

  //Fetching pokemon data from localhost
  React.useEffect(() => {
    fetch("/pokemon.json")
      .then((resp) => resp.json())
      .then((data) => dispatch({ type: "SET_POKEMON", payload: data }));
  }, []);

  if (!state.pokemon) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  } else {
    return (
      <PokemonContext.Provider
        value={{
          state,
          dispatch,
        }}
      >
        <PageContainer>
          <div className="d-flex justify-content-center">
            <Image src="./pikachu.png" height={100}/>
            <Title>Pokemon Search</Title>
          </div>
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
            pokemon={state.pokemon}
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



