import axios from 'axios';

const API = axios.create({
  baseURL: 'https://app.infox.bot/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export default API;
