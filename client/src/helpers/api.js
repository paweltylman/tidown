import axios from 'axios';

// api with long timeout for server downloads

const api = axios.create({
  timeout: 60000,
});

export default api;
