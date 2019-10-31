import React, { Component } from 'react'
import {InputTag,PasswordTag} from '../../util/InputConfig.js'
import {connect} from 'react-redux'
import {ValidatorChecker} from '../../util/ValidatorCheck';
import { ValidatorForm} from 'react-material-ui-form-validator';
import Button from '../../components/UI/Buttons/Button';
import Input from '../../components/UI/Input/Input'
import './Auth.css'
import Spinner from '../../components/UI/Spinner/Spinner'
import {auth} from '../../store/actions/authAction'

class Auth extends Component {
    state = {
        controls: {
            email: InputTag('Your E-Mail','email'),
            password: PasswordTag('Enter Valid Password','password'),
            repeatPassWord:PasswordTag('Repeat Password','password')
        },
        isSignup : true,
    }
    
    componentWillMount() {
        // custom rule will have name 'isPasswordMatch'
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== this.state.controls.password.value) {
                return false;
            }
            return true;
        });
    }
    
    componentWillUnmount() {
        // remove rule when it is not needed
        ValidatorForm.removeValidationRule('isPasswordMatch');
    }
    submitHandler = (event)=> {
        let  {onAuth} = this.props
        const {controls, isSignup } = this.state
        event.preventDefault()
        onAuth(controls.email.value, controls.password.value, isSignup)
        //console.log('Almost working')
      
    }
    
    inputChangedHandler = (event,inputIdentifier)=>{
        const {controls} = this.state
        const updatedControls = {
             ...controls,
                [inputIdentifier]:{
                    ...controls[inputIdentifier],
                    value:event.target.value
                }
        };
        this.setState({controls:updatedControls})
    }
    
    switchHandler = ()=>{
        let  {controls} = this.state
        let signInForm = {...controls                  
        }

        
        if (signInForm["repeatPassWord"]){
           delete signInForm["repeatPassWord"] 
        }else {
            signInForm["repeatPassWord"] = PasswordTag('Repeat Password','password')
        }

        this.setState(prevState=>{
           return {isSignup : !prevState.isSignup ,
            controls : signInForm,           
        }               
        })
    }
    
    render() {
        let {controls, isSignup} =this.state
        let  {loading,error} = this.props
        const formElementsArray = [];
        for (let key in controls ){
            formElementsArray.push({
                id: key,
                config: controls[key]   
            })
        }
        let form = ( <ValidatorForm 
            ref="form"
            onSubmit={this.submitHandler}
            onError={errors => console.log(errors)} >
        {formElementsArray.map((formElement,i)=>(
            <Input key={i} elementType={formElement.config.elementType}
            elementConfig = {formElement.config.elementConfig}
            value = {formElement.config.value}
            changed={(event)=>this.inputChangedHandler(event,formElement.id)}
            validator= {ValidatorChecker}
            id={formElement.id}
            />
        ))}
        <Button btnType="Success" > {isSignup ? 'SIGN UP' : 'SIGN IN'}</Button>
        </ValidatorForm>)
        
        {loading && (form = <Spinner/>)};
        let errorMessage = null;
        {error && (errorMessage = <p>{error.message}</p>)}

        return (
            <div className="Auth">
                {errorMessage}
                {form}
                <Button clicked = {this.switchHandler} btnType="Danger">
                   SWITCH TO {isSignup ? 'SIGN IN' : 'SIGN UP'}
                </Button>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        loading:state.auth.loading,
        error: state.auth.error,
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        onAuth: (email,password,isSignup)=>dispatch(auth(email,password,isSignup))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Auth);