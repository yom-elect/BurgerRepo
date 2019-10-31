export const InputTag = (val,id)=>{
    return {
        elementType: 'input',
        elementConfig: {
            type:id,
            placeholder:`${val}`
        },
        value: ''
    }
}

export const PasswordTag = (val,id)=>{
    return {
        elementType: 'input',
        elementConfig: {
            type:id,
            label:`${val}`
        },
        value: ''
    }
}
export const DeliveryTag = ()=>{
    return {
        elementType: 'select',
        elementConfig: {
            options:[
                {value:'fastest', displayValue:'Fastest'},
                {value:'cheapest', displayValue:'Cheapest'},                
            ]
        },
        value: 'fastest'
    }
}