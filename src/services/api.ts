// Aula3 - 1:10:18

import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333',
})

export default api;