
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { cleanup } from '@testing-library/react';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter as Router } from 'react-router-dom';
import { Operation } from '../../../components/operation/operation';

Enzyme.configure({ adapter: new Adapter() });

afterEach(cleanup);

describe('Operation component', () => {
    it('renders', () => {

        const accountId = 1;
        const wrapper = shallow(<Router><Operation {...accountId} /></Router>);
        expect(wrapper.exists()).toBe(true);
    });
});
