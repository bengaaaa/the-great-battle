import './App.css';
import Food from './Food';
import { foods } from './foods'; // Make sure this import is in your App.js file
import React, { useEffect, useState } from 'react';
import { fetchData } from './api';

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

  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const result = await fetchData();
      setData(result);
    };

    getData();
  }, []);

  return (
    <div className="App">
      <h1>Food Fight Asia</h1>
      <div className="food-vs-container">
        <div onClick={generateNewFoods}>
          <Food {...food1} />
        </div>
        <h2>VS</h2>
        <div onClick={generateNewFoods}>
          <Food {...food2} />
        </div>
      </div>
      <p>{data && JSON.stringify(data)}</p>
    </div>
  );
}

export default App;
