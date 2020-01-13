import { axiosOperationByAccountIdResponse } from '../../../tests-files';
import OperationRepository from '../../../repositories/operation';
import { IOperation } from '../../../models/operation/operation.i';
import { ApiResponse } from '../../../models/apiResponse/apiResponse';
import { AxiosResponse } from 'axios';

describe('Account Repository : get account', () => {
    it('should get operations of one account (default get)', async () => {
        // Arrange
        const inputAccountId = 1;
        const getSpy = jest.spyOn(OperationRepository, 'getOperationByAccountId').mockResolvedValue(axiosOperationByAccountIdResponse);

        // Act
        const output: AxiosResponse<ApiResponse<IOperation[]>> =
            await OperationRepository.getOperationByAccountId(inputAccountId, undefined, undefined, new Date());

        // Assert
        expect(output.data!.data![0].id).toBeDefined();
        expect(getSpy).toHaveBeenCalledTimes(1);
    });
});
