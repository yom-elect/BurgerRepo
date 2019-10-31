import * as actionTypes from '../actions/actionConstants';
import axios from 'axios'

export const authStart = ()=>{
    return {
        type: actionTypes.AUTH_START,
    }
}

export const authSuccess = (token, userId)=>{
    return {
        type:actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId,
    }
}

export const authFail = (error)=>{
    return {
        type:actionTypes.AUTH_FAIL,
        error: error,
    }
}
export const authLogOut = () =>{
    return {
        type:actionTypes.AUTH_LOGOUT,
    };
}

export const checkAuthTimeOut = (expirationTime)=>{
    return dispatch => {
          setTimeout(()=>{
            dispatch(authLogOut())             
        },expirationTime * 1000)  
    }
};

export const auth = (email,password, isSignup )=>{
    return dispatch =>{
        dispatch(authStart())
        const authData = {
            email : email, 
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCqrqMO4t1xaoz_3mngno88vFJd5iNKBYk'
        if (!isSignup){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCqrqMO4t1xaoz_3mngno88vFJd5iNKBYk'
        }
        axios.post(url,authData)
            .then(resp=>{
                let respns = resp.data
                dispatch(authSuccess(respns.idToken, respns.localId))
                dispatch(checkAuthTimeOut(respns.expiresIn))
            })
            .catch(err=>{
                console.log(err)
                dispatch(authFail(err.response.data.error))           
            })
    };
}
 