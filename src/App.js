import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import "./App.css";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

const PokemonType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.shape({
    english: PropTypes.string.isRequired,
    japanese: PropTypes.string.isRequired,
    chinese: PropTypes.string.isRequired,
    french: PropTypes.string.isRequired,
  }),
  type: PropTypes.arrayOf(PropTypes.string.isRequired),
  base: PropTypes.shape({
    HP: PropTypes.number.isRequired,
    Attack: PropTypes.number.isRequired,
    Defense: PropTypes.number.isRequired,
    "Sp. Attack": PropTypes.number.isRequired,
    "Sp. Defense": PropTypes.number.isRequired,
    Speed: PropTypes.number.isRequired,
  }),
});

const PokemonRow = ({ pokemon, onClick }) => (
  <>
    <tr key={pokemon.id}>
      <td>{pokemon.name.english}</td>
      <td>{pokemon.type.join(", ")}</td>
      <td>
        <Button variant="info" onClick={() => onClick(pokemon)}>More Information</Button>
      </td>
    </tr>
  </>
);

PokemonRow.propTypes = {
  pokemon: PropTypes.arrayOf(PokemonType),
};

const PokemonInfo = ({ name: { english }, base }) => (
  <div>
    <h2>{english}</h2>
    <table>
      <tbody>
        {Object.keys(base).map((key) => (
          <tr key={key}>
            <td>{key}</td>
            <td>{base[key]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

PokemonInfo.propTypes = PokemonType;

const Title = styled.h1`
  text-align: center;
}`;

const TwoColumnLayout = styled.div`
display: grid;
grid-template-columns: 70% 30%;
grid-column-gap: 1rem;
`;

const Container = styled.div`
margin: auto;
width: 800px;
padding-top: 1rem';
`;

const Input = styled.input`
width: auto;
font-size: x-large;
padding: 0.2rem;
`;

function App() {
  const [filter, filterSet] = React.useState("");
  const [pokemon, pokemonSet] = React.useState([]);
  const [selectedPokemon, selectedPokemonSet] = React.useState(null);

  React.useEffect(() => {
    fetch('http://localhost:3000/pokemon.json').then(response => response.json()).then(data => pokemonSet(data))
  }, [])

  return (
    <Container>
      <Title>Pokemon Search</Title>
      <TwoColumnLayout>
        <div>
          <Input
            type="text"
            value={filter}
            onChange={(evt) => filterSet(evt.target.value)}
          />
          <Table width="100%">
            <tbody>
              {pokemon
                .filter(({ name: { english } }) =>
                  english
                    .toLocaleLowerCase()
                    .includes(filter.toLocaleLowerCase())
                )
                .slice(0, 20)
                .map((pokemon) => (
                  <PokemonRow
                    pokemon={pokemon}
                    onClick={(pokemon) => selectedPokemonSet(pokemon)}
                  />
                ))}
            </tbody>
          </Table>
        </div>
        {selectedPokemon && <PokemonInfo {...selectedPokemon} />}
      </TwoColumnLayout>
    </Container>
  );
}

export default App;