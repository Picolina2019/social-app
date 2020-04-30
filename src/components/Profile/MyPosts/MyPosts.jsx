import React from 'react';
import a from './MyPosts.module.css';
import Post from './Post/Post';
import { Field,reduxForm } from 'redux-form';
import {required, maxLengthCreator} from '../../../utils/validators/validator'
import { Textarea } from '../../common/FormsControls/FormsControl';

const MyPosts= React.memo (props=>  {
 
  // shouldComponentUpdate(nextProps, nextState){
  //   return nextProps !==this.props || nextState !==this.state;
  // }
// let textarea = React.createRef();
      let postsElements = props.postData.map(p=><Post key={p.id} message={p.message} 
      likesCount={p.likesCount} /> );
      let maxLenght = maxLengthCreator(20);

    let  MyPostForm=(props)=>{
        return<div>
              <form onSubmit = {props.handleSubmit}> 
               <div>
                 <Field component={Textarea} name={'newPostText'}
                  placeholder={'enter post'} validate={[required, maxLenght]}/>
               </div>
               <div>
                  <button>Add post</button>
               </div>
              </form>
              </div>
      }
      let addPost=(value)=>{
        props.addClick(value.newPostText);
      }
      const PostReduxForm = reduxForm ({
        form:'post'
      }) (MyPostForm);

    return (
    <div className={a.myPosts}>
      <div className={a.postArea}>
        <h3>My posts</h3>
        <div><PostReduxForm onSubmit={addPost}/></div>
      </div>
      <div className={a.posts}>
         {postsElements}
      </div>
    </div>
  )
});
export default MyPosts;
