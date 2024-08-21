import axios from 'axios';

const API_URL = 'http://localhost:5001';

// Get all foods
export const fetchData = async () => {
  try {
    const response = await axios.get(`${API_URL}/food`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// Fetch food data by ID
export const fetchFoodById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/food/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching food with ID ${id}:`, error);
    throw error;
  }
};

// Fetch two random foods from the backend
export const fetchRandomFoods = async () => {
  try {
    const response = await axios.get(`${API_URL}/random-foods`);
    return response.data;
  } catch (error) {
    console.error('Error fetching random foods:', error);
    throw error;
  }
};
