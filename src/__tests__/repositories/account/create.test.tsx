import React from 'react';
import { createAccount, axiosCreateAccountResponse } from '../../../tests-files';
import * as _ from 'lodash';
import AccountRepository from '../../../repositories/account';
import { AxiosResponse } from 'axios';
import { IAccount } from '../../../models/account/account.i';
import { ApiResponse } from '../../../models/apiResponse/apiResponse';
describe('Account Repository : create account', () => {

    it('should valid create account information', () => {
        // Arrange
        const inputCreateAccount = createAccount;

        // Act
        const output = AccountRepository.validCreateAccountInformation(inputCreateAccount);

        // Assert
        expect(output).toBe(true);
    });

    it('should valid email type', () => {
        // Arrange
        const inputEmail = 'dadie.emilin@gmail.com';

        // Act
        const output = AccountRepository.validEmailType(inputEmail);

        // Assert
        expect(output).toBe(true);
    });

    it('should create account (all information is valid)', async () => {
        // Arrange
        const inputCreateAccount = createAccount;
        const createSpy = jest.spyOn(AccountRepository, 'createAccount').mockResolvedValue(axiosCreateAccountResponse);

        // Act
        const output: AxiosResponse<ApiResponse<IAccount>> = await AccountRepository.createAccount(inputCreateAccount);

        // Assert
        expect(output.data!.data!.id).toBeDefined();
        expect(createSpy).toHaveBeenCalledTimes(1);
    });

    it('should not create account (invalid property)', async () => {
        // Arrange
        const inputCreateAccount = _.cloneDeep(createAccount);
        inputCreateAccount.user.email = '';
        inputCreateAccount.user.password = '';

        // Act
        try {
            const output: AxiosResponse<ApiResponse<IAccount>> = await AccountRepository.createAccount(inputCreateAccount);
        } catch (e) {
            // Assert
            expect(e).toBeInstanceOf(Error);
        }
    });

    it('should not create account (invalid email type)', async () => {
        // Arrange
        const inputCreateAccount = _.cloneDeep(createAccount);
        inputCreateAccount.user.email = 'dadie.emilin';

        // Act
        try {
            const output: AxiosResponse<ApiResponse<IAccount>> = await AccountRepository.createAccount(inputCreateAccount);
        } catch (e) {
            // Assert
            expect(e).toBeInstanceOf(Error);
        }
    });
});
