
import axios from 'axios';
import { getCookieValue } from '../utils';

export class Api {
    static getInstance() {
        return axios.create({
            baseURL: 'http://localhost:3001',
            headers: {
                Authorization: 'bearer ' + getCookieValue('accessToken'),
            },
        });
    }
}
