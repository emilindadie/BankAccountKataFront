import React from 'react';
import { axiosUserResponse, createUser } from '../../../tests-files';
import * as _ from 'lodash';
import UserService from '../../../services/user';
describe('User service : create user', () => {

    it('should valid user information', () => {
        // Arrange
        const inputCreateUser = createUser;

        // Act
        const output = UserService.validCreateUserInformation(inputCreateUser);

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

    it('should create user (all information is valid)', async () => {
        // Arrange
        const inputCreateUser = createUser;
        spyOn(UserService, 'createUser').and.returnValue(Promise.resolve(axiosUserResponse));

        // Act
        const output: any = await UserService.createUser(inputCreateUser);

        // Assert
        expect(output.data.id).toBeDefined();
    });

    it('should not create user (invalid property)', async () => {
        // Arrange
        const inputCreateUser = _.cloneDeep(createUser);
        inputCreateUser.email = '';
        inputCreateUser.password = '';

        // Act
        try {
            const output: any = await UserService.createUser(inputCreateUser);
        } catch (e) {
            // Assert
            expect(e).toBeInstanceOf(Error);
        }
    });

    it('should not create user (invalid email and password)', async () => {
        // Arrange
        const inputCreateUser = _.cloneDeep(createUser);
        inputCreateUser.email = 'dadie.emilin';

        // Act
        try {
            const output: any = await UserService.createUser(inputCreateUser);
        } catch (e) {
            // Assert
            expect(e).toBeInstanceOf(Error);
        }
    });
});
