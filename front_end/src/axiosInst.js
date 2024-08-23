import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs'


const baseURL = 'http://127.0.0.1:8000/';

const api = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    }
});


api.interceptors.request.use(async (config) => {

    const accessToken = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : null;
    const refreshToken = localStorage.getItem('refreshToken') ? localStorage.getItem('refreshToken') : null;

    if (accessToken) {
        const user = jwt_decode(accessToken)
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
        if (!isExpired) {
            config.headers.Authorization = `Bearer ${accessToken}`;
            return config;
        }
        try {
            const response = await axios.post(`${baseURL}api/token/refresh/`, { refresh: refreshToken });
            localStorage.setItem('accessToken', response.data.access);
            localStorage.setItem('refreshToken', response.data.refresh);
            config.headers.Authorization = `Bearer ${response.data.access}`;
            return config;
        } catch (error) {
            console.error('Token Refresh Failed: ', error);
            throw error;
        }
    }
    return config;
});

export default api;