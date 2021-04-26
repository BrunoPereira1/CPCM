import axios from 'axios';

const apiUsuario = axios.create({ 
    baseURL: "https://localhost:6001/Usuario"
});

export default apiUsuario;