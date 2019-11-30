
import React from 'react';
import Login from '../../../components/login/login';
import Enzyme, { shallow } from 'enzyme';
import { render, fireEvent, cleanup, act } from '@testing-library/react';
import Adapter from 'enzyme-adapter-react-16';
import { axiosUserResponse } from '../../../tests-files';
import UserService from '../../../services/user';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from '../../../components/home/home';

Enzyme.configure({ adapter: new Adapter() });

afterEach(cleanup);

describe('Home component', () => {
    it('renders', () => {
        const wrapper = shallow(<Router><Home /></Router>);
        expect(wrapper.exists()).toBe(true);
    });

    it('Should find 4 account', () => {
        // Arrange
        const { container } = render(<Router><Home /></Router>);

        // Act
        const field: any = container.querySelector('.account');

        // Assert
        expect(field.length.length).toBe(4);
    });
});
