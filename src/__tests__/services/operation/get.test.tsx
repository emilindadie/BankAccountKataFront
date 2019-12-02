import React from 'react';
import * as _ from 'lodash';

import OperationService from '../../../services/operation';
describe('Account service : get account', () => {
    it('should get operations of one account', async () => {
        // Arrange
        const inputAccountId = 1;

        // Act
        const output: any = await OperationService.getOperationByAccountId(inputAccountId);

        // Assert
        expect(output.data.data[0].id).toBeDefined();
    });
});
