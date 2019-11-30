import React from 'react';
import * as _ from 'lodash';
import AccountService from '../../../services/account';
describe('Account service : get account', () => {

    it('should get user account', () => {
        // Arrange
        const inputUserId = 1;

        // Act
        const output: any = AccountService.getAccount(inputUserId);

        // Assert
        expect(output.data.id).toBeDefined();
    });
});
