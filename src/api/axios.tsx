
import axios from 'axios';
import { getCookieValue } from '../utils';

export class Api {
    static getInstance() {
        return axios.create({
            headers: {
                Authorization: 'bearer ' + getCookieValue('accessToken'),
            },
        });
    }
}
