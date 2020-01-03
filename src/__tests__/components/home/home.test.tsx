import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import { cleanup, act } from '@testing-library/react';
import Adapter from 'enzyme-adapter-react-16';
import { axiosAccountByUserResponse, AuthContextMock } from '../../../tests-files';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from '../../../components/home/home';
import AccountRepository from '../../../repositories/account';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

Enzyme.configure({ adapter: new Adapter() });
afterEach(cleanup);

describe('Home component', () => {
    let store: any;
    const mockStore = configureStore([]);

    beforeEach(() => {
        store = mockStore({isAuthenticated : true, user : {id: 1}});
    });

    it('renders', () => {
        const wrapper = shallow(<Provider store={store}>
            <Router>
                <Home />
            </Router>
        </Provider>,
        );
        expect(wrapper.exists()).toBe(true);
    });

    it('Should find 4 account', async () => {
        // Arrange
        const accountsSpy = jest.spyOn(AccountRepository, 'getAccountByUserId').mockResolvedValue(axiosAccountByUserResponse);

        await act(async () => {
            // Act
            const wrapper = mount(<Provider store={store}>
                <Router>
                    <Home />
                </Router>
            </Provider>,
            );
            wrapper.update();
        });
        expect(accountsSpy).toHaveBeenCalled();
    });
});
