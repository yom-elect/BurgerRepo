import React, { Component } from 'react';
import {connect} from 'react-redux';
import {authLogOut} from '../../../store/actions/authAction';
import {Redirect} from 'react-router-dom'



class Logout extends Component {
    componentDidMount () {
        this.props.onLogout();
    }
    render() {
        return <Redirect to="/"/>
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        onLogout: ()=> dispatch(authLogOut()),
    }
}

export default connect(null,mapDispatchToProps)(Logout);