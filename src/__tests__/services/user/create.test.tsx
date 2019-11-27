import React from 'react';
import { UserService } from '../../../services/user';
import { user, createUser } from '../../../tests-files';
import * as _ from 'lodash';
describe('User service : create user', () => {

    let service: UserService;

    beforeEach(() => {
        service = new UserService();
    });

    it('should valid user information', () => {
        // Arrange
        const inputCreateUser = createUser;

        // Act
        const output = service.validCreateUserInformation(inputCreateUser);

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

    it('should create user (all information is valid)', async () => {
        // Arrange
        const inputCreateUser = createUser;
        spyOn(service, 'createUser').and.returnValue(Promise.resolve(user));

        // Act
        const output: any = await service.createUser(inputCreateUser);

        // Assert
        expect(output.id).toBeDefined();
    });

    it('should not create user (invalid property)', async () => {
        // Arrange
        const inputCreateUser = _.cloneDeep(createUser);
        inputCreateUser.email = '';
        inputCreateUser.password = '';

        // Act
        try {
            const output: any = await service.createUser(inputCreateUser);
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
            const output: any = await service.createUser(inputCreateUser);
        } catch (e) {
            // Assert
            expect(e).toBeInstanceOf(Error);
        }
    });
});
