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
    localStorage.removeItem('token')
    localStorage.removeItem('expiration')
    localStorage.removeItem('userId')
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
                const expirationDate = new Date(new Date().getTime() + respns.expiresIn * 1000);
                //console.log(expirationDate)
                localStorage.setItem('token', respns.idToken );
                localStorage.setItem('expiration', expirationDate)
                localStorage.setItem('userId', respns.localId)
                dispatch(authSuccess(respns.idToken, respns.localId))
                dispatch(checkAuthTimeOut(respns.expiresIn))
            })
            .catch(err=>{
                console.log(err)
                dispatch(authFail(err.resp.data.error))           
            })
    };
}

export const setAuthRedirectPath = (path)=>{
    return  {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path:path,
    }
}

export const authCheckState = ()=> {
    return dispatch =>{
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(authLogOut());
        }
        else {
            const expirationDate = localStorage.getItem('expiration')
            
            if (expirationDate <= new Date()){
                dispatch(authLogOut())
            }else{
                const userId =  localStorage.getItem('userId')
                dispatch(authSuccess(token, userId))
                dispatch(checkAuthTimeOut(new Date(expirationDate).getSeconds() - new Date().getSeconds()))
                
            }
        }
    }
}