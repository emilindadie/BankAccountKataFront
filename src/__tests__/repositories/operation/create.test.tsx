import { createOperation, axiosCreateOperationResponse } from '../../../tests-files';
import OperationRepository from '../../../repositories/operation';
import { AxiosResponse } from 'axios';
import { ApiResponse } from '../../../models/apiResponse/apiResponse';
import { IOperation } from '../../../models/operation/operation.i';

describe('operatiob Repository : create operation', () => {
    it('should valid create operation information', () => {
        // Arrange
        const inputCreateOperation = createOperation;

        // Act
        const output = OperationRepository.validCreateOperationInformation(inputCreateOperation);

        // Assert
        expect(output).toBe(true);
    });

    it('should create operation', async () => {
        // Arrange
        const inputCreateOperation = createOperation;
        const createSpy = jest.spyOn(OperationRepository, 'createOperation').mockResolvedValue(axiosCreateOperationResponse);

        // Act
        const output: AxiosResponse<ApiResponse<IOperation>> = await OperationRepository.createOperation(inputCreateOperation);

        // Assert
        expect(createSpy).toHaveBeenCalledTimes(1);
        expect(output.data.data.id).toBeDefined();
    });
});
