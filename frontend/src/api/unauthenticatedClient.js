import axios from 'axios';
import Constants from 'expo-constants';

const API_HOST = Constants.expoConfig.extra.API_HOST;

console.log('API_HOST:', API_HOST);

const unauthenticatedClient = axios.create({
  baseURL: `${API_HOST}/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default unauthenticatedClient;
