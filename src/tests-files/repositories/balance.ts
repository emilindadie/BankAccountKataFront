
import { AxiosResponse } from 'axios';
import { ApiResponse } from '../../models/apiResponse/apiResponse';

export const axiosBalanceResponse: AxiosResponse<ApiResponse<number>> = {
    data: {
        data: 100,
        error: { message : 'Default error'},
    },
    headers: [],
    config: {},
    request: [],
    status: 200,
    statusText: 'OK',
};
