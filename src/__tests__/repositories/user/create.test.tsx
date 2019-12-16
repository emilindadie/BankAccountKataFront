import { axiosUserResponse, createUser } from '../../../tests-files';
import * as _ from 'lodash';
import UserRepository from '../../../repositories/user';
import { AxiosResponse } from 'axios';
import { ApiResponse } from '../../../models/apiResponse/apiResponse';
import { LoginResponse } from '../../../models/loginResponse/loginResponse';
describe('User Repository : create user', () => {

    it('should valid user information', () => {
        // Arrange
        const inputCreateUser = createUser;

        // Act
        const output: boolean = UserRepository.validCreateUserInformation(inputCreateUser);

        // Assert
        expect(output).toBe(true);
    });

    it('should valid email type', () => {
        // Arrange
        const inputEmail = 'dadie.emilin@gmail.com';

        // Act
        const output: boolean = UserRepository.validEmailType(inputEmail);

        // Assert
        expect(output).toBe(true);
    });

    it('should create user (all information is valid)', async () => {
        // Arrange
        const inputCreateUser = createUser;
        const createSpy = jest.spyOn(UserRepository, 'createUser').mockResolvedValue(axiosUserResponse);

        // Act
        const output: AxiosResponse<ApiResponse<LoginResponse>> = await UserRepository.createUser(inputCreateUser);

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
            const output: AxiosResponse<ApiResponse<LoginResponse>> = await UserRepository.createUser(inputCreateUser);
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
            const output: AxiosResponse<ApiResponse<LoginResponse>> = await UserRepository.createUser(inputCreateUser);
        } catch (e) {
            // Assert
            expect(e).toBeInstanceOf(Error);
        }
    });
});
