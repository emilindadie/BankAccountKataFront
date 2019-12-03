import BalanceService from '../../../services/balance';
import { axiosBalanceResponse } from '../../../tests-files';
import { AxiosResponse } from 'axios';
import { ApiResponse } from '../../../models/apiResponse/apiResponse';

describe('Balance service : get balance', () => {
    it('should get account balance', async () => {
        // Arrange
        const inputAccountId = 1;
        const getSpy = jest.spyOn(BalanceService, 'getBalanceByAccountId').mockResolvedValue(axiosBalanceResponse);

        // Act
        const output: AxiosResponse<ApiResponse<number>> =
            await BalanceService.getBalanceByAccountId(inputAccountId, undefined, undefined, new Date());

        // Assert
        expect(output.data.data).toBe(100);
        expect(getSpy).toHaveBeenCalledTimes(1);
    });
});
