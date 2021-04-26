import axios from 'axios';

const apiRegistro = axios.create({ 
    baseURL: "https://localhost:5001/Registro"
});

export default apiRegistro;