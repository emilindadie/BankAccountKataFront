import React from 'react';
import { UserService } from '../../services/user';

describe('User service', () => {

    let service: UserService;

    beforeEach(() => {
        service = new UserService();
    });

    it('sould valid email and password', () => {

        // Arrange
        const inputEmail = 'dadie.emilin@gmail.com';
        const inputPassword = 'azerty';

        // Act
        const output = service.valideEmailAndPassword(inputEmail, inputPassword);

        // Assert 
        expect(output).toBe(true);

    });

});
