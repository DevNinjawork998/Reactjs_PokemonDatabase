import React from "react";
import Styled from "@emotion/styled";
import { Spinner, Image } from "react-bootstrap";

//Import Components
import PokemonInfo from "./Components/PokemonInfo.jsx";
import PokemonContext from "./PokemonContext.js";
import PokemonFilter from "./Components/PokemonFilter.jsx";
import PokemonTable from "./Components/PokemonTable.jsx";
import Paginator from "./Components/Pagination.jsx";

//Import CSS file
import "./App.css";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKghiJtbL3y0nyjSQ6uNYadZAxliyKxuA",
  authDomain: "personal-website-3580d.firebaseapp.com",
  projectId: "personal-website-3580d",
  storageBucket: "personal-website-3580d.appspot.com",
  messagingSenderId: "508647798578",
  appId: "1:508647798578:web:1152f207c7f4657eb0892b",
  measurementId: "G-CMZX3BP4SV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//Styling for App css
const Title = Styled.h1`
text-align: Left;
margin-top: 3.0rem;
`;

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
          <div className="d-flex">
            <div className="flex-shrink-0">
              <Image src="./pikachu.png" height={100} />
            </div>
            <div className="flex-grow-1 ms-3">
              <Title>Pokemon Search</Title>
            </div>
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
