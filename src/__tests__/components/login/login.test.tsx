
import React from 'react';
import Login from '../../../components/login/login';
import Enzyme, { shallow } from 'enzyme';
import { render, fireEvent, cleanup, act } from '@testing-library/react';
import Adapter from 'enzyme-adapter-react-16';
import { axiosUserResponse } from '../../../tests-files';
import UserRepository from '../../../repositories/user';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
Enzyme.configure({ adapter: new Adapter() });
import configureStore from 'redux-mock-store';

afterEach(cleanup);

describe('Login component', () => {
    let store: any;
    const mockStore = configureStore([]);

    beforeEach(() => {
        store = mockStore({isAuthenticated : false, user : null});
    });

    it('renders', () => {
        const wrapper = shallow(
            <Provider store={store}>
                <Router>
                    <Login />
                </Router>
            </Provider>,
        );
        expect(wrapper.exists()).toBe(true);
    });

    it('Should change the state of email input', () => {
        // Arrange
        const { container } = render(
            <Provider store={store}>
                <Router>
                    <Login />
                </Router>
            </Provider>,
        );
        const field: any = container.querySelector('#login_email_input');

        // Act
        act(() => {
            fireEvent.change(field, { target: { value: 'dadie.emilin@gmail.com' } });
        });

        // Assert
        expect(field.value).toBe('dadie.emilin@gmail.com');
    });

    it('Should change the state of password input', () => {
        // Arrange
        const { container } = render(
            <Provider store={store}>
                <Router>
                    <Login />
                </Router>
            </Provider>,
        );
        const field: any = container.querySelector('#login_password_input');

        // Act
        act(() => {
            fireEvent.change(field, { target: { value: 'azerty' } });
        });

        // Assert
        expect(field.value).toBe('azerty');
    });

    it('Should call login Repository when the form is submitted', async () => {
        // Arrange
        const { container, getByTestId } = render(
            <Provider store={store}>
                <Router>
                    <Login />
                </Router>
            </Provider>,
        );
        const loginSpy = jest.spyOn(UserRepository, 'logUser').mockResolvedValue(axiosUserResponse);
        const passwordField: any = container.querySelector('#login_password_input');
        const emailField: any = container.querySelector('#login_email_input');

        // Act
        await act(async () => {
            await fireEvent.change(emailField, { target: { value: 'dadie.emilin@gmail.com' } });
            await fireEvent.change(passwordField, { target: { value: 'azerty' } });
            await fireEvent.click(getByTestId('login_submit_btn'));
        });

        // Assert
        expect(loginSpy).toHaveBeenCalledTimes(1);
    });
});
