export const InputTag = (val)=>{
    return {
        elementType: 'input',
        elementConfig: {
            type:'text',
            placeholder:`${val}`
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