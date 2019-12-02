import React from 'react';
import { createOperation, axiosCreateAccountResponse } from '../../../tests-files';
import * as _ from 'lodash';
import OperationService from '../../../services/operation';
import { AxiosResponse } from 'axios';
import { IAccount } from '../../../models/account/account.i';
import { ApiResponse } from '../../../models/apiResponse/apiResponse';
describe('operatiob service : create operation', () => {

    it('should valid create operation information', () => {
        // Arrange
        const inputCreateOperation = createOperation;

        // Act
        const output = OperationService.validCreateOperationInformation(inputCreateOperation);

        // Assert
        expect(output).toBe(true);
    });
});
