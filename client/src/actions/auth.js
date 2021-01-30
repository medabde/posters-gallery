import * as api from '../api';
import {AUTH,LOGIN_ERROR} from '../constants/actionTypes';

export const signin = (formData,history)=> async(dispatch)=>{
    try {
        const {data} = await api.signIn(formData);
        dispatch({type:AUTH,data});
        history.push('/');
    } catch (error) {
        dispatch({type:LOGIN_ERROR,data:"Email and/or Password incorrect!"});
    }
}

export const signup = (formData,history)=> async(dispatch)=>{
    try {
        const {data} = await api.signUp(formData);
        dispatch({type:AUTH,data});
        history.push('/');
    } catch (error) {
        dispatch({type:LOGIN_ERROR,data:'User Already exists, try using a different email'});
    }
}

export const loginerror = (error) => async(dispatch)=>{
    try {
        dispatch({type:LOGIN_ERROR,data:error});
    } catch (error) {
    }
    
}