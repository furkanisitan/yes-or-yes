import axios from 'axios';

const baseURL = import.meta.env.DEV ? 'http://localhost:8888/.netlify/functions' : '/.netlify/functions';

const httpClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

export default httpClient;
