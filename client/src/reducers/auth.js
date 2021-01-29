import {AUTH,LOGOUT,LOGIN_ERROR} from '../constants/actionTypes';

const authReducer = (state={authData:null,loginError:null},action)=>{
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile',JSON.stringify({...action?.data}));
            return {...state,authData :action?.data};
        case LOGOUT:
            localStorage.clear();
            return {...state,authData :null};
        case LOGIN_ERROR:
            return {...state,loginError:action.data};
        default:
            return state;
    }
}

export default authReducer;