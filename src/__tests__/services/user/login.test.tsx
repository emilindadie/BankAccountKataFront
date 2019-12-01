import React from 'react';
import { user, axiosUserResponse } from '../../../tests-files';
import UserService from '../../../services/user';
import { IUser } from '../../../models/user/user.i';
import { AxiosResponse } from 'axios';
import { ApiResponse } from '../../../models/apiResponse/apiResponse';
import { LoginResponse } from '../../../models/loginResponse/loginResponse';

describe('User service : log user', () => {

    it('should valid email and password', () => {
        // Arrange
        const inputEmail = 'dadie.emilin@gmail.com';
        const inputPassword = 'azerty';

        // Act
        const output: boolean = UserService.validEmailAndPassword(inputEmail, inputPassword);

        // Assert
        expect(output).toBe(true);
    });

    it('should valid email type', () => {
        // Arrange
        const inputEmail = 'dadie.emilin@gmail.com';

        // Act
        const output: boolean = UserService.validEmailType(inputEmail);

        // Assert
        expect(output).toBe(true);
    });

    it('should log user (email and password valid)', async () => {
        // Arrange
        const inputEmail = 'dadie.emilin@gmail.com';
        const inputPassword = 'azerty';
        const loginSpy = jest.spyOn(UserService, 'logUser').mockResolvedValue(axiosUserResponse);

        // Act
        const output: AxiosResponse<ApiResponse<LoginResponse>> = await UserService.logUser(inputEmail, inputPassword);

        // Assert
        expect(output.data.data.user.id).toBeDefined();
        expect(loginSpy).toHaveBeenCalledTimes(1);
    });

    it('should not log user (invalid email type)', async () => {
        // Arrange
        const inputEmail = 'dadie.emilin';
        const inputPassword = 'azerty';

        // Act
        try {
            const output: AxiosResponse<ApiResponse<LoginResponse>> = await UserService.logUser(inputEmail, inputPassword);

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
            const output: AxiosResponse<ApiResponse<LoginResponse>> = await UserService.logUser(inputEmail, inputPassword);
        } catch (e) {
            // Assert
            expect(e).toBeInstanceOf(Error);
        }
    });
});
