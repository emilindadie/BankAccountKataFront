
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { render, fireEvent, cleanup, act } from '@testing-library/react';
import Adapter from 'enzyme-adapter-react-16';
import Register from '../../../components/register/register';

Enzyme.configure({ adapter: new Adapter() });

afterEach(cleanup);

describe('Register component', () => {
    it('renders', () => {
        const wrapper = shallow(<Register />);
        expect(wrapper.exists()).toBe(true);
    });

    it('Should check that user information is not empty', () => {
        // Arrange
        const { container, debug } = render(<Register />);
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
});
