import React from 'react';
import { axiosUserResponse, createUser } from '../../../tests-files';
import * as _ from 'lodash';
import UserService from '../../../services/user';
import { IUser } from '../../../models/user/user.i';
import { AxiosResponse } from 'axios';
import { ApiResponse } from '../../../models/apiResponse/apiResponse';
import { LoginResponse } from '../../../models/loginResponse/loginResponse';
describe('User service : create user', () => {

    it('should valid user information', () => {
        // Arrange
        const inputCreateUser = createUser;

        // Act
        const output: boolean = UserService.validCreateUserInformation(inputCreateUser);

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

    it('should create user (all information is valid)', async () => {
        // Arrange
        const inputCreateUser = createUser;
        const createSpy = jest.spyOn(UserService, 'createUser').mockReturnValue(Promise.resolve(axiosUserResponse));

        // Act
        const output: AxiosResponse<ApiResponse<LoginResponse>> = await UserService.createUser(inputCreateUser);

        // Assert
        expect(output.data.data.user.id).toBeDefined();
        expect(createSpy).toHaveBeenCalledTimes(1);
    });

    it('should not create user (invalid property)', async () => {
        // Arrange
        const inputCreateUser = _.cloneDeep(createUser);
        inputCreateUser.email = '';
        inputCreateUser.password = '';

        // Act
        try {
            const output: AxiosResponse<ApiResponse<LoginResponse>> = await UserService.createUser(inputCreateUser);
        } catch (e) {
            // Assert
            expect(e).toBeInstanceOf(Error);
        }
    });

    it('should not create user (invalid email type)', async () => {
        // Arrange
        const inputCreateUser = _.cloneDeep(createUser);
        inputCreateUser.email = 'dadie.emilin';

        // Act
        try {
            const output: AxiosResponse<ApiResponse<LoginResponse>> = await UserService.createUser(inputCreateUser);
        } catch (e) {
            // Assert
            expect(e).toBeInstanceOf(Error);
        }
    });
});
