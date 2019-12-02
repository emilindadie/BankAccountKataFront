import { CreateOperation } from '../models/operation/createOperation';

const OperationService = {
    validCreateOperationInformation(operation: CreateOperation) {
        return operation.validProperty();
    },

    createOperation(operation: CreateOperation) {
        const validProperty = operation.validProperty();
        if (!validProperty) {
            throw new Error('Tous les champs sont obligatoires!');
        }
        return '';
    },
};

export default OperationService;
