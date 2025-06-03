import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'http://localhost:8888/.netlify/functions',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

export default httpClient;
