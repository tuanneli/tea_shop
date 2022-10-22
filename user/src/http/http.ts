import axios from 'axios';
import {IResponse} from "../types/authTypes";

// export const baseURL = 'http://localhost:5000';
export const baseURL = 'https://tranquil-stream-61391.herokuapp.com'

const $host = axios.create({
    withCredentials: true,
    baseURL: baseURL
});

$host.interceptors.request.use((config: any) => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
    console.log(config.headers.authorization);
    return config;
});

$host.interceptors.response.use((config: any) => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
}, (async (error) => {
    const originRequest = error.config;
    if (error.response?.status == 401 && error.config && !error.config._isRetry) {
        originRequest._isRetry = true;
        try {
            const response = await axios.get<IResponse>(`${baseURL}/refresh`, {withCredentials: true});
            localStorage.setItem('token', response.data.accessToken);
            return $host.request(originRequest);
        } catch (e) {
            console.log('Не авторизован');
        }
    }
    throw error;
}))

export {
    $host,
}