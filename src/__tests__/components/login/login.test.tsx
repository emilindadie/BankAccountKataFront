
import React from 'react';
import Login from '../../../components/login/login';
import Enzyme, { shallow } from 'enzyme';
import { render, fireEvent, cleanup, act } from '@testing-library/react';
import Adapter from 'enzyme-adapter-react-16';
import { axiosUserResponse } from '../../../tests-files';
import UserService from '../../../services/user';

Enzyme.configure({ adapter: new Adapter() });

afterEach(cleanup);

describe('Login component', () => {
    it('renders', () => {
        const wrapper = shallow(<Login />);
        expect(wrapper.exists()).toBe(true);
    });

    it('Should change the state of email input', () => {
        // Arrange
        const { container, debug } = render(<Login />);
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
        const { container, debug } = render(<Login />);
        const field: any = container.querySelector('#login_password_input');

        // Act
        act(() => {
            fireEvent.change(field, { target: { value: 'azerty' } });
        });

        // Assert
        expect(field.value).toBe('azerty');
    });

    it('Should call login service when the form is submitted', async () => {
        // Arrange
        const { container, debug, getByTestId } = render(<Login />);
        const loginSpy = jest.spyOn(UserService, 'logUser').mockReturnValue(Promise.resolve(axiosUserResponse));

        await act(async () => {
            fireEvent.click(getByTestId('login_submit_btn'));
        });

        // Assert
        expect(loginSpy).toHaveBeenCalledTimes(1);
    });
});

