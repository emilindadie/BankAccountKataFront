
import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import { cleanup } from '@testing-library/react';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter as Router } from 'react-router-dom';
import { Manage } from '../../../components/manage/manage';

Enzyme.configure({ adapter: new Adapter() });

afterEach(cleanup);

describe('Manage component', () => {
    it('renders', () => {
        const wrapper = shallow(<Router><Manage /></Router>);
        expect(wrapper.exists()).toBe(true);
    });
});
