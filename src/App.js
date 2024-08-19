import React from 'react';
import './App.css';
import Greeting from './Greeting';

function App() {
  return (
    <div className="App">
      <h1>Hello, World!</h1>
      <Greeting name="Alice" />
      <Greeting name="Bob" />
    </div>
  );
}

export default App;

