import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import {NavLink} from 'react-router-dom';

configure({adapter : new Adapter()});

describe('NavigationItem', ()=>{
    it('should render two navigation element if not authenticated',
       ()=>{
        const wrapper =  shallow(<NavigationItems />)
        expect(wrapper.find(NavLink)).toHaveLength(2)
       }
    )
});