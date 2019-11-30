import React from 'react';
import { createAccount } from '../../../tests-files';
import * as _ from 'lodash';
import AccountService from '../../../services/account';
describe('Account service : create account', () => {

    it('should valid create account information', () => {
        // Arrange
        const inputCreateAccount = createAccount;

        // Act
        const output = AccountService.validCreateAccountInformation(inputCreateAccount);

        // Assert
        expect(output).toBe(true);
    });

    it('should valid email type', () => {
        // Arrange
        const inputEmail = 'dadie.emilin@gmail.com';

        // Act
        const output = AccountService.validEmailType(inputEmail);

        // Assert
        expect(output).toBe(true);
    });
});
