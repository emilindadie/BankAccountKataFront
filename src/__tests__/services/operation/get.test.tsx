import React from 'react';
import * as _ from 'lodash';
import { axiosOperationByAccountIdResponse } from '../../../tests-files';
import OperationService from '../../../services/operation';
import { IOperation } from '../../../models/operation/operation.i';
import { ApiResponse } from '../../../models/apiResponse/apiResponse';
import { AxiosResponse } from 'axios';

describe('Account service : get account', () => {
    it('should get operations of one account', async () => {
        // Arrange
        const inputAccountId = 1;
        const getSpy = jest.spyOn(OperationService, 'getOperationByAccountId').mockResolvedValue(axiosOperationByAccountIdResponse);

        // Act
        const output: AxiosResponse<ApiResponse<IOperation[]>> = await OperationService.getOperationByAccountId(inputAccountId);

        // Assert
        expect(output.data.data[0].id).toBeDefined();
        expect(getSpy).toHaveBeenCalledTimes(1);
    });
});
