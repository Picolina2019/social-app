import {profileAPI, userAPI} from '../api/api';
import { stopSubmit } from 'redux-form';

const ADD_POST = '3_ADD_POST';
const SET_USER_PROFILE ='3_SET_USER_PROFILE';
const SET_STATUS ='3_SET_STATUS';
const UPDATE_NEW_POST_TEXT= '3_UPDATE_NEW_POST_TEXT';
const SAVE_PHOTO_SUCCESS = '3_SAVE_PHOTO_SUCCESS';

let initialState= {
  postData:[
    {message:'Hi, how are you?', likesCount:1, id:1},
    {message:'This is my first post', likesCount:35, id:2},
    {message:'I am here', likesCount:225, id:3}
],
  profile:null,
   status: ""
};

const  profileReducer = (state= initialState,action)=>{
    switch (action.type){
    case ADD_POST:{
        let newPost={
          id:4,
          message:action.newPostText,
          likesCount:0
          };
        return {
          ...state,
        postData:[...state.postData, newPost],
        
        }
      }
 
     case SET_USER_PROFILE:{
      return {
        ...state,
       profile:action.profile
      }
     }
     case SET_STATUS :{
      return {
        ...state,
       status:action.status
      }
     }
     case SAVE_PHOTO_SUCCESS :{
      return {
        ...state,
       profile:{...state.profile, photos:action.photos}
      }
     }
     default:
         return state;
         
  }  
}
export const addPostActionCreator= (newPostText)=>{
  return {
    type:ADD_POST, newPostText
  }
}

 export const updateNewPostTextActionCreator=(text)=>{
  return{
    type:UPDATE_NEW_POST_TEXT, newText: text
  }
}
export  const setUserProfile=(profile)=>{
  return{
    type:SET_USER_PROFILE, profile
  }
}
export const setStatus=(status)=>{
  return{
    type:SET_STATUS, status
  }}
  export const savePhotoSuccess=(photos)=>{
    return{
      type:SAVE_PHOTO_SUCCESS, photos
    }}
export const getUserProfile = (userId)=>async(dispatch)=>{
  let response = await userAPI.getProfile(userId)
  dispatch(setUserProfile(response.data));
  }
export const getStatus = (userId)=>async(dispatch)=>{
  let response = await profileAPI.getStatus(userId)
   dispatch(setStatus(response.data));
 }
export const updateStatus = (status)=>async(dispatch)=>{
  let response = await profileAPI.updateStatus(status)
  if( response.data.resultCode === 0){
  dispatch(setStatus(status));
      }}
export const savePhoto = (file)=>async(dispatch)=>{
  let response = await profileAPI.savePhoto(file)
  if( response.data.resultCode === 0){
   dispatch(savePhotoSuccess(response.data.data.photos));
            }}
 export const saveProfile = (profile)=>async(dispatch, getState)=>{
 const userId = getState().auth.id;
 let response = await profileAPI.saveProfile(profile);
  if( response.data.resultCode === 0){
   dispatch(getUserProfile(userId));
 } else{
   dispatch(stopSubmit('profileData',{_error:response.data.messages[0]}));
   return Promise.reject(response.data.messages[0]);
 }
}
 
export default profileReducer;