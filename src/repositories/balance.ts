import { Api } from '../api/axios';
import { ApiResponse } from '../models/apiResponse/apiResponse';
import { AxiosResponse } from 'axios';

const BalanceRepository = {
    async getBalanceByAccountId(accountId: number, startDate?: Date, endDate?: Date, localDate?: Date): Promise<AxiosResponse<ApiResponse<number>>> {
        return await Api.getInstance().get('/balances', { params: { accountId, startDate, endDate, localDate } });
    },
};

export default BalanceRepository;
