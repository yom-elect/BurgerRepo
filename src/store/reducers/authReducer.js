import * as actionTypes from '../actions/actionConstants'

const initialState = {
    token : null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/',
};

const reducer = (state  = initialState, action) =>{
    switch(action.type){
        case actionTypes.AUTH_START :
            return {
                ...state,
                error:null,
                loading: true,
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                token: action.idToken,
                userId: action.userId,
                error: null,
                loading: false,
                authRedirectPath: '/',
            }
        case actionTypes.AUTH_FAIL :
            return {
                ...state,
                error: action.error,
                loading: false,
            }
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                userId: null,
                token: null,
            }
        case actionTypes.SET_AUTH_REDIRECT_PATH:
           // console.log(action.path)
            return {
                ...state,
                authRedirectPath:action.path,
            }
        default:
            return state;
    }
};

export default reducer;