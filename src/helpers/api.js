import axios from 'axios';

const api = axios.create({
  timeout: 60000,
  baseURL :'http://localhost:4321'
});

export default api;
