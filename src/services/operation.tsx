import { CreateOperation } from '../models/operation/createOperation';

const OperationService = {
    validCreateOperationInformation(operation: CreateOperation) {
        return operation.validProperty();
    },
};

export default OperationService;
