import React, {Component} from 'react';
import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import CheckOut from './containers/CheckOut/CheckOut'
import Auth from './containers/User/Auth'
import Logout from './containers/User/Logout/Logout'
import Orders from './containers/Orders/Orders'
import {Route, Switch, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import  {authCheckState} from './store/actions/authAction'

class  App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignUp();
  }

  render(){
    return (
    <div className="">
        <Layout>
          <Switch>
            <Route path="/checkout" component={CheckOut} />
            <Route path="/orders" component = {Orders} />
            <Route path="/auth" component = {Auth} /> 
            <Route path="/logout" component = {Logout} /> 
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        </Layout>
    </div>
  );
  }
  
}

const mapDispatchToProps = (dispatch)=>{
  return {
    onTryAutoSignUp  : ()=> dispatch(authCheckState()),
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App));
