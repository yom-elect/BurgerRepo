import React, {Component} from 'react';
import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import CheckOut from './containers/CheckOut/CheckOut'
import Auth from './containers/User/Auth'
import Logout from './containers/User/Logout/Logout'
import Orders from './containers/Orders/Orders'
import {Route, Switch, withRouter, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import  {authCheckState} from './store/actions/authAction'

class  App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignUp();
  }

  render(){
    const {isAuthenticated} = this.props

    return (
    <div className="">
        <Layout>
          <Switch>
            {isAuthenticated && <Route path="/checkout" component={CheckOut} />}
            {isAuthenticated && <Route path="/orders" component={Orders} />}
            {/* <Route path="/orders" component = {Orders} /> */}
            <Route path="/auth" component = {Auth} /> 
            {isAuthenticated && <Route path="/logout" component={Logout} />}
            {/* <Route path="/logout" component = {Logout} />  */}
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect to = "/" />
          </Switch>
        </Layout>
    </div>
  );
  }
  
}

const mapStateToProps = state =>{
  return {
    isAuthenticated: state.auth.token !== null,
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    onTryAutoSignUp  : ()=> dispatch(authCheckState()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
