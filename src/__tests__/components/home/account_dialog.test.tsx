import React from 'react';
import Enzyme from 'enzyme';
import { render, fireEvent, cleanup, act } from '@testing-library/react';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from '../../../components/home/home';
import { axiosAccountByUserResponse, AuthContextMock, axiosCreateAccountResponse } from '../../../tests-files';
import AccountRepository from '../../../repositories/account';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
Enzyme.configure({ adapter: new Adapter() });
afterEach(cleanup);

describe('New account dialog in home component', () => {

    let store: any;
    const mockStore = configureStore([]);

    beforeEach(() => {
        store = mockStore({isAuthenticated : true, user : {}});
    });

    it('Should not call Repository (input is empty)', async () => {
        await act(async () => {
            // Arrange
            const accountsSpy = jest.spyOn(AccountRepository, 'getAccountByUserId').mockResolvedValue(axiosAccountByUserResponse);
            const createAccountsSpy = jest.spyOn(AccountRepository, 'createAccount').mockResolvedValue(axiosCreateAccountResponse);
            const { container, getByTestId } = render(
                <Provider store={store}>
                    <Router>
                        <Home />
                    </Router>
                </Provider>,
            );
            await fireEvent.click(getByTestId('open_new_account_dialog'));

            // Act
            await fireEvent.click(getByTestId('create_account_submit_btn'));

            // Assert
            expect(createAccountsSpy).not.toHaveBeenCalled();
        });
    });
});
