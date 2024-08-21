import axios from 'axios';

const API_URL = 'http://localhost:5001';

// Example: Get data from the backend
export const fetchData = async () => {
  try {
    const response = await axios.get(`${API_URL}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
