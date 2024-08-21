import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  return (
    <header>
      <h1>Food Fight Asia</h1>
      {location.pathname !== '/leaderboard' ? (
        <Link
          to="/leaderboard"
          style={{ position: 'absolute', top: 10, right: 10 }}
        >
          Leaderboard
        </Link>
      ) : (
        <Link to="/" style={{ position: 'absolute', top: 10, left: 10 }}>
          Back
        </Link>
      )}
    </header>
  );
};

export default Header;
