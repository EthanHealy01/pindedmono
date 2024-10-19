import unauthenticatedClient from './unauthenticatedClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const createUser = async (userData) => {
  try {
    const response = await unauthenticatedClient.post('/user_profile', userData);
    console.log('createUser response:', response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error creating user:', error.response.data);
    } else {
      console.error('Error creating user:', error.message);
    }
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await unauthenticatedClient.post('/auth', { email, password });
    console.log('loginUser response:', response.data);

    // Save the token to AsyncStorage upon successful login
    await AsyncStorage.setItem('authToken', response.data.token);

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