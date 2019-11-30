import React from 'react';
import { user, axiosUserResponse } from '../../../tests-files';
import UserService from '../../../services/user';

describe('User service : log user', () => {

    it('should valid email and password', () => {
        // Arrange
        const inputEmail = 'dadie.emilin@gmail.com';
        const inputPassword = 'azerty';

        // Act
        const output = UserService.validEmailAndPassword(inputEmail, inputPassword);

        // Assert
        expect(output).toBe(true);
    });

    it('should valid email type', () => {
        // Arrange
        const inputEmail = 'dadie.emilin@gmail.com';

        // Act
        const output = UserService.validEmailType(inputEmail);

        // Assert
        expect(output).toBe(true);
    });

    it('should log user (email and password valid)', async () => {
        // Arrange
        const inputEmail = 'dadie.emilin@gmail.com';
        const inputPassword = 'azerty';
        spyOn(UserService, 'logUser').and.returnValue(Promise.resolve(axiosUserResponse));

        // Act
        const output: any = await UserService.logUser(inputEmail, inputPassword);

        // Assert
        expect(output.data.id).toBeDefined();
    });

    it('should not log user (invalid email type)', async () => {
        // Arrange
        const inputEmail = 'dadie.emilin';
        const inputPassword = 'azerty';

        // Act
        try {
            const output: any = await UserService.logUser(inputEmail, inputPassword);

        } catch (e) {
            // Assert
            expect(e).toBeInstanceOf(Error);
        }
    });

    it('should not log user (invalid email and password)', async () => {
        // Arrange
        const inputEmail = '';
        const inputPassword = '';

        // Act
        try {
            const output: any = await UserService.logUser(inputEmail, inputPassword);
        } catch (e) {
            // Assert
            expect(e).toBeInstanceOf(Error);
        }
    });
});
