import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import { cleanup, act } from '@testing-library/react';
import Adapter from 'enzyme-adapter-react-16';
import { axiosAccountByUserResponse, AuthContextMock } from '../../../tests-files';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from '../../../components/home/home';
import AccountService from '../../../services/account';
import * as authCtx from '../../../contexts/auth';

Enzyme.configure({ adapter: new Adapter() });
afterEach(cleanup);

describe('Home component', () => {
    it('renders', () => {
        const wrapper = shallow(<Router><Home /></Router>);
        expect(wrapper.exists()).toBe(true);
    });

    it('Should find 4 account', async () => {
        // Arrange
        const useAuthSpy = jest.spyOn(authCtx, 'default').mockReturnValue(AuthContextMock);
        const accountsSpy = jest.spyOn(AccountService, 'getAccountByUserId').mockResolvedValue(axiosAccountByUserResponse);

        await act(async () => {
            // Act
            const wrapper = mount(<Router><Home /></Router>);
            wrapper.instance().forceUpdate();
            wrapper.update();
        });
        expect(useAuthSpy).toHaveBeenCalled();
        expect(accountsSpy).toHaveBeenCalled();
    });
});
