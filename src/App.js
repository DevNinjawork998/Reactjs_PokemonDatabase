import './App.css';
import React from 'react';
import Pokemon from './Pokemon';



function App() {
  return (
    <div style={{
      margin: "auto",
      width: 800,
      paddingTop: "1rem",
    }}>
      <h1 className='title'>Pokemon Search</h1>
      <table width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {Pokemon.slice(0, 20).map((pokemon) => (
            <tr
              key={pokemon.id}
            >
              <td>{pokemon.name.english}</td>
              <td>{pokemon.type.join(',')}</td>
            </tr>))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
