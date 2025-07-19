import axios from 'axios';
const BASE_URL = 'http://localhost:5000/clients';

export const getClients = () => axios.get(BASE_URL);
export const addClient = (data) => axios.post(BASE_URL, data);
