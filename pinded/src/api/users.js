import apiClient from "./client";

export const createUser = async (userData) => {
  try {
    const response = await apiClient.post('/user_profile', userData);
    return response.data;
  } catch (error) {
    if (error.response) {
      // Server responded with a status code outside of 2xx
      console.error('Error creating user:', error.response.data);
    } else {
      // Network error or other issue
      console.error('Error creating user:', error.message);
    }
    throw error;
  }
};

export const loginUser = async (email, password) => {
  console.log('email:', email);
  console.log('password:', password);
  try {
    const response = await apiClient.post('/auth', { email, password });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error logging in:', error.response.data);
    } else {
      console.error('Error logging in:', error.message);
    }
    throw error;
  }
};
