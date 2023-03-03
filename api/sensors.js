const { default: axios } = require("axios");
require('dotenv').config();

const API = process.env.API;
const API_KEY = process.env.API_KEY;

const fetchSensors = () => {
  console.log('Fetching sensors from API...');
  return axios.get(`${API}/sensors?apiKey=${API_KEY}`);
}; 


module.exports = {
  fetchSensors
};