import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import TodoList from './TodoList';

import * as Enzyme from 'enzyme';
import * as EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter:new EnzymeAdapter()})

let control:ShallowWrapper<undefined, undefined>;
beforeEach(()=>{
    control = shallow(<TodoList />);
});

describe('TodoList', ()=>{
    it("Renders a containing div", ()=>{
        expect(control.find("div").length).toBe(1);
    });
});