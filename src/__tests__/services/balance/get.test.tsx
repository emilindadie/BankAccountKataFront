import BalanceService from '../../../services/balance';

describe('Balance service : get balance', () => {
    it('should get account balance', async () => {
        // Arrange
        const inputAccountId = 1;
        const getSpy = jest.spyOn(BalanceService, 'getBalanceByAccountId').mockResolvedValue(100);

        // Act
        const output: any = await BalanceService.getBalanceByAccountId(inputAccountId, undefined, undefined, new Date());

        // Assert
        expect(output).toBe(100);
        expect(getSpy).toHaveBeenCalledTimes(1);
    });
});
