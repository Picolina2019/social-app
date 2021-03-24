import a from './Post.module.css';
import React from 'react';
const Post = (props) => {
  return (
    <div className={a.item}>
          <img src="https://img.zcool.cn/community/0149f855f6d7fd32f875a1320152e9.jpg" alt='user'/>
          {props.message}
     
      <div className={a.span}>
          <span>Likes: {props.likesCount}</span>
      </div>
     </div>  
    
  );
};
export default Post;
