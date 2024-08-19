import React from 'react';

function Food({ name, country, description }) {
  return (
    <div style={{ cursor: 'pointer', textAlign: 'center', margin: '10px' }}>
      <div style={{ fontSize: '48px', fontWeight: 'bold' }}>
        {name} {country}
      </div>
      <div style={{ fontSize: '14px', color: '#555' }}>{description}</div>
    </div>
  );
}

export default Food;
