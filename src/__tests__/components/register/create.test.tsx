
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { render, fireEvent, cleanup, act } from '@testing-library/react';
import Adapter from 'enzyme-adapter-react-16';
import UserRepository from '../../../repositories/user';
import { axiosUserResponse } from '../../../tests-files';
import { BrowserRouter as Router } from 'react-router-dom';
import { Register } from '../../../components/register/register';

Enzyme.configure({ adapter: new Adapter() });

afterEach(cleanup);

describe('Register component', () => {
    it('renders', () => {
        const wrapper = shallow(<Router><Register /></Router>);
        expect(wrapper.exists()).toBe(true);
    });

    it('Should check that user information is not empty', () => {
        // Arrange
        const { container } = render(<Router><Register /></Router>);
        const nameField: any = container.querySelector('#register_name_input');
        const emailField: any = container.querySelector('#register_email_input');
        const passwordField: any = container.querySelector('#register_password_input');
        const addressField: any = container.querySelector('#register_address_input');

        // Act
        act(() => {
            fireEvent.change(nameField, { target: { value: 'Emilin' } });
            fireEvent.change(emailField, { target: { value: 'dadie.emilin@gmail.com' } });
            fireEvent.change(passwordField, { target: { value: 'azerty' } });
            fireEvent.change(addressField, { target: { value: '14 rue de Mulhouse' } });
        });

        // Assert
        expect(nameField.value.length > 0).toBe(true);
        expect(emailField.value.length > 0).toBe(true);
        expect(passwordField.value.length > 0).toBe(true);
        expect(addressField.value.length > 0).toBe(true);
    });

    it('Should call create user Repository when the form is submitted', async () => {
        // Arrange
        const { container, getByTestId } = render(<Router><Register /></Router>);
        const loginSpy = jest.spyOn(UserRepository, 'createUser').mockResolvedValue(axiosUserResponse);

        const nameField: any = container.querySelector('#register_name_input');
        const emailField: any = container.querySelector('#register_email_input');
        const passwordField: any = container.querySelector('#register_password_input');
        const addressField: any = container.querySelector('#register_address_input');

        // Act
        await act(async () => {
            await fireEvent.change(nameField, { target: { value: 'Emilin' } });
            await fireEvent.change(emailField, { target: { value: 'dadie.emilin@gmail.com' } });
            await fireEvent.change(passwordField, { target: { value: 'azerty' } });
            await fireEvent.change(addressField, { target: { value: '14 rue de Mulhouse' } });
            await fireEvent.click(getByTestId('register_submit_btn'));
        });

        // Assert
        expect(loginSpy).toHaveBeenCalledTimes(1);
    });
});
