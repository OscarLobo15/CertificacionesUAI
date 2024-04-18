import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

const authService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      return response.data.token;
    } catch (error) {
      throw error.response.data.error;
    }
  },
  signUp: async (name, email, password) => {
    try {
      await axios.post(`${API_URL}/register`, { name, email, password });
    } catch (error) {
      throw error.response.data.error;
    }
  }
};

export default authService;