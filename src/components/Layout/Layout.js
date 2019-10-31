import React, { Component } from 'react'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
import './Layout.css'
import { connect} from 'react-redux';


class Layout extends Component {

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
        const {isAuthenticated} = this.props
        return (
            <div>
                <Toolbar 
                isAuth = {isAuthenticated}
                drawerToggleClicked={this.SideDrawerToggleHandler}/>
                <SideDrawer open={showSideDrawer}
                isAuth = {isAuthenticated}
                closed={this.SideDrawerClosedHandler}/>
                <main className="Content">
                    {this.props.children}
                </main>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        isAuthenticated: state.auth.token !== null,
    }
}

export default connect(mapStateToProps)(Layout);