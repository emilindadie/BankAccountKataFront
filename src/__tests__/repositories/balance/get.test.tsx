import BalanceRepository from '../../../repositories/balance';
import { axiosBalanceResponse } from '../../../tests-files';
import { AxiosResponse } from 'axios';
import { ApiResponse } from '../../../models/apiResponse/apiResponse';

describe('Balance Repository : get balance', () => {
    it('should get account balance', async () => {
        // Arrange
        const inputAccountId = 1;
        const getSpy = jest.spyOn(BalanceRepository, 'getBalanceByAccountId').mockResolvedValue(axiosBalanceResponse);

        // Act
        const output: AxiosResponse<ApiResponse<number>> =
            await BalanceRepository.getBalanceByAccountId(inputAccountId, undefined, undefined, new Date());

        // Assert
        expect(output.data.data).toBe(100);
        expect(getSpy).toHaveBeenCalledTimes(1);
    });
});
