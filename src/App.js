import './App.css';
import Food from './Food';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { fetchRandomFoods, updateEloRatings } from './api';
import Leaderboard from './Leaderboard';

function App() {
  const [food1, setFood1] = useState(null);
  const [food2, setFood2] = useState(null);
  const [eloChange1, setEloChange1] = useState(null);
  const [eloChange2, setEloChange2] = useState(null);
  const [eloUpdated, setEloUpdated] = useState(false);

  const K_FACTOR = 32; // Standard K-Factor used in ELO calculations

  const calculateNewElo = (winnerElo, loserElo) => {
    const expectedScoreWinner =
      1 / (1 + Math.pow(10, (loserElo - winnerElo) / 400));
    const expectedScoreLoser =
      1 / (1 + Math.pow(10, (winnerElo - loserElo) / 400));

    const winnerNewElo = Math.round(
      winnerElo + K_FACTOR * (1 - expectedScoreWinner)
    );
    const loserNewElo = Math.round(
      loserElo + K_FACTOR * (0 - expectedScoreLoser)
    );

    return { winnerNewElo, loserNewElo };
  };

  const handleFoodClick = async (winner, loser, isWinnerFood1) => {
    if (!food1 || !food2 || eloUpdated) return;

    const { winnerNewElo, loserNewElo } = calculateNewElo(
      winner.elo,
      loser.elo
    );

    const winnerEloChange = winnerNewElo - winner.elo;
    const loserEloChange = loserNewElo - loser.elo;

    // Update state to show new ELO and changes
    if (isWinnerFood1) {
      setFood1({ ...winner, elo: winnerNewElo });
      setFood2({ ...loser, elo: loserNewElo });
      setEloChange1(winnerEloChange);
      setEloChange2(loserEloChange);
    } else {
      setFood1({ ...loser, elo: loserNewElo });
      setFood2({ ...winner, elo: winnerNewElo });
      setEloChange1(loserEloChange);
      setEloChange2(winnerEloChange);
    }

    setEloUpdated(true);

    try {
      await updateEloRatings(winner.id, loser.id, winnerNewElo, loserNewElo);
    } catch (error) {
      console.error('Failed to update ELO ratings:', error);
    }
  };

  const generateNewFoods = async () => {
    try {
      const [newFood1, newFood2] = await fetchRandomFoods();
      setFood1(newFood1);
      setFood2(newFood2);
      setEloChange1(null);
      setEloChange2(null);
      setEloUpdated(false);
    } catch (error) {
      console.error('Failed to fetch random foods:', error);
    }
  };

  useEffect(() => {
    generateNewFoods(); // Fetch initial foods on component mount
  }, []);

  return (
    <Router basename="/the-great-battle">
      <div className="App">
        <header>
          <h1>Food Fight Asia</h1>
          <Link
            to="/leaderboard"
            style={{ position: 'absolute', top: 10, right: 10 }}
          >
            Leaderboard
          </Link>
        </header>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <div className="food-vs-container">
                  <div onClick={() => handleFoodClick(food1, food2, true)}>
                    {food1 ? (
                      <div>
                        <Food {...food1} />
                        {eloChange1 !== null && (
                          <p>
                            New ELO: {food1.elo}{' '}
                            <span
                              style={{
                                color: eloChange1 > 0 ? 'green' : 'red',
                              }}
                            >
                              ({eloChange1 > 0 ? `+${eloChange1}` : eloChange1})
                            </span>
                          </p>
                        )}
                      </div>
                    ) : (
                      <p>Loading...</p>
                    )}
                  </div>
                  <h2>VS</h2>
                  <div onClick={() => handleFoodClick(food2, food1, false)}>
                    {food2 ? (
                      <div>
                        <Food {...food2} />
                        {eloChange2 !== null && (
                          <p>
                            New ELO: {food2.elo}{' '}
                            <span
                              style={{
                                color: eloChange2 > 0 ? 'green' : 'red',
                              }}
                            >
                              ({eloChange2 > 0 ? `+${eloChange2}` : eloChange2})
                            </span>
                          </p>
                        )}
                      </div>
                    ) : (
                      <p>Loading...</p>
                    )}
                  </div>
                </div>
                <button onClick={generateNewFoods}>Next</button>
              </div>
            }
          />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
