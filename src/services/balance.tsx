import { Api } from '../api/axios';

const BalanceService = {
    async getBalanceByAccountId(accountId: number, startDate?: Date, endDate?: Date, localDate?: Date): Promise<number> {
        return await Api.getInstance().get('/balance', { params: { accountId, startDate, endDate, localDate } });
    },
};

export default BalanceService;
