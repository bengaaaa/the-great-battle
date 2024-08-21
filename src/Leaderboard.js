import React, { useState, useEffect } from 'react';
import { fetchLeaderboard } from './api';
import axios from 'axios';

const Leaderboard = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const getLeaderboardData = async () => {
      try {
        const data = await fetchLeaderboard();
        setFoods(data);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      }
    };

    getLeaderboardData();
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Country</th>
            <th>ELO</th>
          </tr>
        </thead>
        <tbody>
          {foods.map((food, index) => (
            <tr key={food.id}>
              <td>{index + 1}</td>
              <td>{food.name}</td>
              <td>{food.country}</td>
              <td>{food.elo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
