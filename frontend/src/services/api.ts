import axios from 'axios';

const api = axios.create({
    // Forçando o endereço correto para teste
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

export default api;