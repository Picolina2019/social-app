import {authAPI, securityAPI} from '../api/api';
import { stopSubmit } from 'redux-form';
const SET_USERS_DATA ='2_SET_USERS_DATA';
const GET_CAPTCHA_URL_SUCCESS ='2_GET_CAPTCHA_URL_SUCCESS';

let initialState= {
    id:null,
    email:null,
    login:null,  
    isAuth:false,
    captchaUrl:null
   };
  const  authReducer = (state= initialState,action)=>{
      switch (action.type){
      case  SET_USERS_DATA:{
          
          return {
            ...state, 
            ...action.payload
           }
          }
            case GET_CAPTCHA_URL_SUCCESS :{
                 return {
                  ...state, 
                  ...action.payload
                 }
                }
        default:
           return state;
            } 
} 
  const setUsersData=(id, email, login, isAuth)=>{
        return{
          type:SET_USERS_DATA, payload:{id, email, login, isAuth}
        }};
  const getCaptchaUrlSuccess=(captchaUrl)=>{
          return{
            type:GET_CAPTCHA_URL_SUCCESS, payload:{captchaUrl}
          }};
  
    export const getAuthData =() => async (dispatch)=>{
       let response = await authAPI.me()
       if (response.data.resultCode===0){
       let {id, email, login}= response.data.data;
       dispatch(setUsersData(id,email,login,true));
      }
  } 
    
    export const login =(email,password,rememberMe, captcha) => async(dispatch)=>{
   
      let response = await authAPI.login(email,password, rememberMe, captcha)
      if (response.data.resultCode===0){
          dispatch(getAuthData())
      }else{
        if (response.data.resultCode ===10){
          dispatch(getCaptchaUrl());
        }
        let message= response.data.messages.length > 0 ? response.data.messages[0]: 'Error';
        dispatch(stopSubmit('login', {_error:message}));
      } 
}  
    export const logout =() =>async(dispatch)=>{
      let response = await authAPI.logout()
      if (response.data.resultCode===0){
        dispatch(setUsersData(null, null, null, false));
      }
    }  
    export const getCaptchaUrl =() =>async(dispatch)=>{
      const response = await securityAPI.getCaptchaUrl()
      const captchaUrl =response.data.url;
        dispatch(getCaptchaUrlSuccess(captchaUrl));
      }
      

   export default authReducer;