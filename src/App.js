import './App.css';
import Food from './Food';
import React, { useEffect, useState } from 'react';
import { fetchRandomFoods } from './api';

function App() {
  const [food1, setFood1] = useState(null);
  const [food2, setFood2] = useState(null);

  // Function to generate new random foods
  const generateNewFoods = async () => {
    try {
      const [food1, food2] = await fetchRandomFoods();
      setFood1(food1);
      setFood2(food2);
    } catch (error) {
      console.error('Failed to fetch random foods:', error);
    }
  };

  useEffect(() => {
    generateNewFoods(); // Fetch initial foods on component mount
  }, []);

  return (
    <div className="App">
      <h1>Food Fight Asia</h1>
      <div className="food-vs-container">
        <div onClick={generateNewFoods}>
          {food1 ? <Food {...food1} /> : <p>Loading...</p>}
        </div>
        <h2>VS</h2>
        <div onClick={generateNewFoods}>
          {food2 ? <Food {...food2} /> : <p>Loading...</p>}
        </div>
      </div>
    </div>
  );
}

export default App;
