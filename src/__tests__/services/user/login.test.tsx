import React from 'react';
import { UserService } from '../../../services/user';

describe('User service', () => {

    let service: UserService;

    beforeEach(() => {
        service = new UserService();
    });

    it('should valid email and password', () => {
        // Arrange
        const inputEmail = 'dadie.emilin@gmail.com';
        const inputPassword = 'azerty';

        // Act
        const output = service.valideEmailAndPassword(inputEmail, inputPassword);

        // Assert
        expect(output).toBe(true);
    });

    it('should valid email type', () => {
        // Arrange
        const inputEmail = 'dadie.emilin@gmail.com';

        // Act
        const output = service.valideEmailType(inputEmail);

        // Assert
        expect(output).toBe(true);
    });

    it('should log user', () => {
        // Arrange
        const inputEmail = 'dadie.emilin@gmail.com';
        const inputPassword = 'azerty';

        // Act
        const output: any = service.logUser(inputEmail, inputPassword);

        // Assert
        expect(output.id).toBeDefined();
    });

});
