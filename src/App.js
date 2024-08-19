import React, { useState } from 'react';
import './App.css';
import Food from './Food';
import { foods } from './foods'; // Make sure this import is in your App.js file

function App() {
  // Initialize state with two random foods
  const getRandomFood = () => foods[Math.floor(Math.random() * foods.length)];

  const [food1, setFood1] = useState(getRandomFood);
  const [food2, setFood2] = useState(getRandomFood);

  // Function to generate new random foods
  const generateNewFoods = () => {
    setFood1(getRandomFood());
    setFood2(getRandomFood());
  };

  return (
    <div className="App">
      <h1>Asian food fight!</h1>
      <div className="food-vs-container">
        <div onClick={generateNewFoods}>
          <Food {...food1} />
        </div>
        <h2>VS</h2>
        <div onClick={generateNewFoods}>
          <Food {...food2} />
        </div>
      </div>
    </div>
  );
}

export default App;
