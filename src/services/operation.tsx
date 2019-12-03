import { CreateOperation } from '../models/operation/createOperation';
import { Api } from '../api/axios';
import { IOperation } from '../models/operation/operation.i';
import { AxiosResponse } from 'axios';
import { ApiResponse } from '../models/apiResponse/apiResponse';

const OperationService = {
    validCreateOperationInformation(operation: CreateOperation) {
        return operation.validProperty();
    },

    async createOperation(operation: CreateOperation): Promise<AxiosResponse<ApiResponse<IOperation>>> {
        const validProperty = operation.validProperty();
        if (!validProperty) {
            throw new Error('Tous les champs sont obligatoires!');
        }
        return await Api.getInstance().post('/operation', { accountId: operation.accountId, amount: operation.amount });
    },

    async getOperationByAccountId(accountId: number, startDate?: Date, endDate?: Date, localDate?: Date):
        Promise<AxiosResponse<ApiResponse<IOperation[]>>> {
        return await Api.getInstance().get('/operation', { params: { accountId, startDate, endDate, localDate } });
    },
};

export default OperationService;
