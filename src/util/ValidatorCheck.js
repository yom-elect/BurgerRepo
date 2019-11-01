export const ValidatorChecker = (type)=>{
   
    let Validation = null
    switch (type){
        case ('name'):
            Validation = {
             validators:['required',],
             errorMessages:['this field is required']
             } 
            break;
        case ('email'):
            Validation = {
             validators:['required', 'isEmail'],
             errorMessages:['this field is required', 'email is not valid']
             } 
            break;
        case ('country'):
            Validation = {
                validators:['required',],
                errorMessages:['this field is required']
                } 
            break;
        case ('password'):
            Validation = {
                    validators:['required'],
                    errorMessages:['this field is required']
                    } 
            break;
        case ('repeatPassWord'):
            Validation = {
                    validators:['isPasswordMatch','required'],
                    errorMessages:['password mismatch','this field is required']
                    } 
            break;
        default:
            Validation = {
                validators:['required'],
                errorMessages:['this field is required']
                } 
            break;
    }
    return Validation;

}