import React from 'react';
import { UserService } from '../../../services/user';
import { user } from '../../../tests-files';

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
        const output = service.validEmailAndPassword(inputEmail, inputPassword);

        // Assert
        expect(output).toBe(true);
    });

    it('should valid email type', () => {
        // Arrange
        const inputEmail = 'dadie.emilin@gmail.com';

        // Act
        const output = service.validEmailType(inputEmail);

        // Assert
        expect(output).toBe(true);
    });

    it('should log user (email and password valid)', async () => {
        // Arrange
        const inputEmail = 'dadie.emilin@gmail.com';
        const inputPassword = 'azerty';
        spyOn(service, 'logUser').and.returnValue(Promise.resolve(user));

        // Act
        const output: any = await service.logUser(inputEmail, inputPassword);

        // Assert
        expect(output.id).toBeDefined();
    });

    it('should log user (invalid email type)', async () => {
        // Arrange
        const inputEmail = 'dadie.emilin';
        const inputPassword = 'azerty';

        // Act
        try {
            const output: any = await service.logUser(inputEmail, inputPassword);

        } catch (e) {
            // Assert
            expect(e).toBeInstanceOf(Error);
        }
    });

    it('should log user (invalid email and password)', async () => {
        // Arrange
        const inputEmail = '';
        const inputPassword = '';

        // Act
        try {
            const output: any = await service.logUser(inputEmail, inputPassword);
        } catch (e) {
            // Assert
            expect(e).toBeInstanceOf(Error);
        }
    });
});
