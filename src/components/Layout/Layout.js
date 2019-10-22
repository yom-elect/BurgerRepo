import React, { Component } from 'react'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
import './Layout.css'


export default class Layout extends Component {

    state = {
        showSideDrawer : false,
    }

    SideDrawerClosedHandler = ()=>{
        this.setState({showSideDrawer: false})
    }
    
    SideDrawerToggleHandler = ()=>{
        this.setState((prevState)=>{ 
            return {showSideDrawer : !prevState.showSideDrawer}
        })
    }

    render() {
        const {showSideDrawer} = this.state
        return (
            <div>
                <Toolbar drawerToggleClicked={this.SideDrawerToggleHandler}/>
                <SideDrawer open={showSideDrawer}
                closed={this.SideDrawerClosedHandler}/>
                <main className="Content">
                    {this.props.children}
                </main>
            </div>
        )
    }
}
