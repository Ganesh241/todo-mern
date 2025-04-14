import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5005/api'
});

// Register a new user
export const registerUser = (userData) => api.post('/users/register', userData);

// Login a user
export const loginUser = (userData) => api.post('/users/login', userData);


export default {
    registerUser,
    loginUser
};