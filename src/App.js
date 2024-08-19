import React from 'react';
import './App.css';
import Food from './Food';

function App() {
  return (
    <div className="App">
      <h1>The Great Battle!</h1>
      <Food name="Ramen" />
      <h2>VS</h2>
      <Food name="Pad thai" />
    </div>
  );
}

export default App;
