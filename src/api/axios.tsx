
import axios, { AxiosInstance } from 'axios';

export class Api {
    private static instance: AxiosInstance;

    constructor() {
        Api.instance = axios.create({
            baseURL: 'http://localhost:3001',
        });
    }

    static setToken(token: string) {
        Api.instance.defaults.headers.common['Authorization'] = 'bearer ' + token;
    }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        return axios.create({
            baseURL: 'http://localhost:3001',
        });
    }
}
