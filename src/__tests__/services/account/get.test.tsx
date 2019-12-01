import React from 'react';
import * as _ from 'lodash';
import AccountService from '../../../services/account';
import { axiosAccountByUserResponse } from '../../../tests-files';
import { AxiosResponse } from 'axios';
import { IAccount } from '../../../models/account/account.i';
import { ApiResponse } from '../../../models/apiResponse/apiResponse';
describe('Account service : get account', () => {

    it('should get user account', async () => {
        // Arrange
        const inputUserId = 1;

        const getSpy = jest.spyOn(AccountService, 'getAccountByUserId').mockResolvedValue(axiosAccountByUserResponse);

        // Act
        const output: AxiosResponse<ApiResponse<IAccount[]>> = await AccountService.getAccountByUserId(inputUserId);

        // Assert
        expect(output.data.data[0].id).toBeDefined();
        expect(getSpy).toHaveBeenCalledTimes(1);
    });
});
