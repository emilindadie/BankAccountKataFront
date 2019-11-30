import React from 'react';
import { createAccount, axiosCreateAccountResponse } from '../../../tests-files';
import * as _ from 'lodash';
import AccountService from '../../../services/account';
import { AxiosResponse } from 'axios';
import { IAccount } from '../../../models/account/account.i';
import { ApiResponse } from '../../../models/apiResponse/apiResponse';
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

    it('should create account (all information is valid)', async () => {
        // Arrange
        const inputCreateAccount = createAccount;
        spyOn(AccountService, 'createAccount').and.returnValue(Promise.resolve(axiosCreateAccountResponse));
        const createSpy = jest.spyOn(AccountService, 'createAccount').mockReturnValue(Promise.resolve(axiosCreateAccountResponse));

        // Act
        const output: AxiosResponse<ApiResponse<IAccount>> = await AccountService.createAccount(inputCreateAccount);

        // Assert
        expect(output.data.data.id).toBeDefined();
        expect(createSpy).toHaveBeenCalledTimes(1);
    });

    it('should not create user (invalid property)', async () => {
        // Arrange
        const inputCreateAccount = _.cloneDeep(createAccount);
        inputCreateAccount.user.email = '';
        inputCreateAccount.user.password = '';

        // Act
        try {
            const output: AxiosResponse<ApiResponse<IAccount>> = await AccountService.createAccount(inputCreateAccount);
        } catch (e) {
            // Assert
            expect(e).toBeInstanceOf(Error);
        }
    });

    it('should not create user (invalid email type)', async () => {
        // Arrange
        const inputCreateAccount = _.cloneDeep(createAccount);
        inputCreateAccount.user.email = 'dadie.emilin';

        // Act
        try {
            const output: AxiosResponse<ApiResponse<IAccount>> = await AccountService.createAccount(inputCreateAccount);
        } catch (e) {
            // Assert
            expect(e).toBeInstanceOf(Error);
        }
    });
});
