
import React from 'react';
import Login from '../../../components/login/login';
import Enzyme, { shallow } from 'enzyme';
import { render, fireEvent, cleanup } from '@testing-library/react';

import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

afterEach(cleanup);

describe('Login component', () => {
    test('renders', () => {
        const wrapper = shallow(<Login />);
        expect(wrapper.exists()).toBe(true);
    });

    test('should change the state of email input', () => {

        // Arrange
        const { container, debug } = render(<Login />);
        const field: any = container.querySelector('#email');

        // Act
        fireEvent.change(field, { target: { value: 'dadie.emilin@gmail.com' } });

        // Assert
        expect(field.value).toBe('dadie.emilin@gmail.com');
    });
});
