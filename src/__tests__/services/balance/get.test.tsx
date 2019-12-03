import BalanceService from '../../../services/balance';

describe('Balance service : get balance', () => {
    it('should get account balance', async () => {
        // Arrange
        const inputAccountId = 1;

        // Act
        const output: any = BalanceService.getBalanceByAccountId(inputAccountId, undefined, undefined, new Date());

        // Assert
        expect(output).toBe(100);
    });
});
