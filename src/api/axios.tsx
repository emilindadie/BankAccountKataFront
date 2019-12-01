
import axios, { AxiosInstance } from 'axios';
import { getLocalStorageValue } from '../utils';

export class Api {
    static getInstance() {
        return axios.create({
            baseURL: 'http://localhost:3001',
            headers: {
                Authorization: 'bearer ' + getLocalStorageValue('token'),
            },
        });
    }
}
