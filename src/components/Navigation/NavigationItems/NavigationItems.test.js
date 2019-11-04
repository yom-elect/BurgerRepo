import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import {NavLink} from 'react-router-dom';

configure({adapter : new Adapter()});

describe('NavigationItem', ()=>{
    let  wrapper;
    beforeEach(()=>{
         wrapper =  shallow(<NavigationItems />)           
    })

    it('should render two navigation element if not authenticated',
       ()=>{
        expect(wrapper.find(NavLink)).toHaveLength(2)
       }
    )
    it('should render three navigation element if authenticated',
       ()=>{
        //wrapper =  shallow(<NavigationItems isAuthenticated />)
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.find(NavLink)).toHaveLength(3);
       }
    )
    it('should render an exact logout button if authenticated',
       ()=>{
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.contains(<NavLink to ="/logout" activeClassName="active">Logout</NavLink>)).toEqual(true);
       }
    )
});