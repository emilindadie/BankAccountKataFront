import React from 'react';
import Enzyme from 'enzyme';
import { render, fireEvent, cleanup, act } from '@testing-library/react';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from '../../../components/home/home';
import * as authCtx from '../../../contexts/auth';
import { axiosAccountByUserResponse, AuthContextMock, axiosCreateAccountResponse } from '../../../tests-files';
import AccountRepository from '../../../repositories/account';

Enzyme.configure({ adapter: new Adapter() });
afterEach(cleanup);

describe('New account dialog in home component', () => {
    it('Should not call Repository (input is empty)', async () => {
        await act(async () => {
            // Arrange
            const useAuthSpy = jest.spyOn(authCtx, 'default').mockReturnValue(AuthContextMock);
            const accountsSpy = jest.spyOn(AccountRepository, 'getAccountByUserId').mockResolvedValue(axiosAccountByUserResponse);
            const createAccountsSpy = jest.spyOn(AccountRepository, 'createAccount').mockResolvedValue(axiosCreateAccountResponse);
            const { container, getByTestId } = render(<Router><Home /></Router>);
            await fireEvent.click(getByTestId('open_new_account_dialog'));

            // Act
            await fireEvent.click(getByTestId('create_account_submit_btn'));

            // Assert
            expect(createAccountsSpy).not.toHaveBeenCalled();
        });
    });
});
