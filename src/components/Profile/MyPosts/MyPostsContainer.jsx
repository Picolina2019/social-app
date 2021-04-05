import { connect } from 'react-redux';
import { addPostActionCreator } from '../../../redux/profileReducer';
import MyPosts from './MyPosts';

let getStateForProps = (state) => {
  return {
    postData: state.profilePage.postData,
    newPostText: state.profilePage.newPostText,
  };
};
let getDispatchForProps = (dispatch) => {
  return {
    addClick: (newPostText) => {
      dispatch(addPostActionCreator(newPostText));
    },
  };
};

const MyPostsContainer = connect(
  getStateForProps,
  getDispatchForProps
)(MyPosts);
export default MyPostsContainer;
