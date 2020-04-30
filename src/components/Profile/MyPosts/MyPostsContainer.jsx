import React from 'react';
import MyPosts from "./MyPosts";
import { addPostActionCreator} from '../../../redux/profileReducer';
import { connect } from "react-redux";

let getStateForProps=(state)=>{
  return{
    postData:state.profilePage.postData,
    newPostText:state.profilePage.newPostText
  }
};
 let getDispatchForProps = (dispatch)=>{
   return{
   
   addClick:(newPostText)=>{
    dispatch(addPostActionCreator(newPostText));
   }
   }
  }

const MyPostsContainer = connect (getStateForProps, getDispatchForProps)(MyPosts);
export default MyPostsContainer;