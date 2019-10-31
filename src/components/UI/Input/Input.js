import React from 'react'
import './Input.css'
import { TextValidator} from 'react-material-ui-form-validator';


const input= ({elementType,elementConfig ,value, changed, validator,id})=> {
    let inputElement = null;
    let checker = null
    if (validator(id)){
       // console.log(id)
        checker= validator(id)
         
    }

    switch (elementType){
        case ('input'):
            inputElement = <TextValidator 
            className="InputElement" 
            {...elementConfig}
            value = {value}
            onChange={changed}
            validators = {checker.validators}
            errorMessages = {checker.errorMessages}   
            />
            break;
        case ('textarea'):
            inputElement = <TextValidator 
            className="InputElement" 
            {...elementConfig}
            value = {value}
            onChange={changed}
            validators = {checker.validators}
            errorMessages = {checker.errorMessages}/>
            break;
        case ('select'):
            inputElement = (<select 
            className="InputElement" 
            value = {value} onChange={changed}>   
            {elementConfig.options.map(option=>(
                <option key ={option.value} 
                value={option.value}>{option.displayValue}</option>                           
            ))}
            </select>)
            break;
        default:
            inputElement = <TextValidator 
            className="InputElement" 
            {...elementConfig}
            value = {value} onChange={changed}
            validators = {checker.validators}
            errorMessages = {checker.errorMessages}/>
    }

    return (
        <div className="Input">
            <label className="Label">{}</label>
            {inputElement}
        </div>
    )
}

export default input
