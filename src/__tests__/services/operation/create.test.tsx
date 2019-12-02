import React from 'react';
import { createOperation, axiosCreateOperationResponse } from '../../../tests-files';
import * as _ from 'lodash';
import OperationService from '../../../services/operation';
import { AxiosResponse } from 'axios';
import { ApiResponse } from '../../../models/apiResponse/apiResponse';
import { IOperation } from '../../../models/operation/operation.i';
describe('operatiob service : create operation', () => {
    it('should valid create operation information', () => {
        // Arrange
        const inputCreateOperation = createOperation;

        // Act
        const output = OperationService.validCreateOperationInformation(inputCreateOperation);

        // Assert
        expect(output).toBe(true);
    });

    it('should create operation', async () => {
        // Arrange
        const inputCreateOperation = createOperation;
        const createSpy = jest.spyOn(OperationService, 'createOperation').mockResolvedValue(axiosCreateOperationResponse);

        // Act
        const output: AxiosResponse<ApiResponse<IOperation>> = await OperationService.createOperation(inputCreateOperation);

        // Assert
        expect(createSpy).toHaveBeenCalledTimes(1);
        expect(output.data.data.id).toBeDefined();
    });
});
