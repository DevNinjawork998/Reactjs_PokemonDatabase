import React from "react";
import styled from "@emotion/styled";
import "./App.css";
import { Button, Table } from 'react-bootstrap';
import MyPagination from './Components/MyPagination';
import PaginationComponent from "./Components/MyPagination";

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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: "",
      pokemon: [],
      selectedItem: null,
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/pokemon.json")
      .then((resp) => resp.json())
      .then((pokemon) =>
        this.setState({
          ...this.state,
          pokemon,
        })
      );
  }

  render() {
    return (
      <Container>
        <Title>Pokemon Search</Title>
        <TwoColumnLayout>
          <div>
            <Input
              placeholder="Search"
              value={this.state.filter}
              onChange={(evt) =>
                this.setState({
                  ...this.state,
                  filter: evt.target.value,
                })
              }
            />
            <Table width="100%">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {this.state.pokemon
                  .filter((pokemon) =>
                    pokemon.name.english
                      .toLowerCase()
                      .includes(this.state.filter.toLowerCase())
                  )
                  .slice(0, 20)
                  .map((pokemon) => (
                    <PokemonRow
                      pokemon={pokemon}
                      key={pokemon.id}
                      onClick={(pokemon) =>
                        this.setState({
                          ...this.state,
                          selectedItem: pokemon,
                        })
                      }
                    />
                  ))}
              </tbody>
              <tr>
                <PaginationComponent>{ }</PaginationComponent>
              </tr>
            </Table>
          </div>
          {this.state.selectedItem && (
            <PokemonInfo {...this.state.selectedItem} />
          )}
        </TwoColumnLayout>
      </Container>
    );
  }
}

export default App;