import axios from "axios";

const api = axios.create({
    baseURL: 'https://tv-fronteira-project-backend.herokuapp.com/',
});

export default api;