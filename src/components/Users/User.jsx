import React from 'react';
import s from './users.module.css';
import userPhoto from '../../assets/images/profile.jpg';
import { NavLink } from 'react-router-dom';

const User = ({user,followingInProgress,unfollow,follow}) => {
  return (
    <div>
      <span>
        <div>
          <NavLink to={'Profile/' + user.id}>
            <img
              src={user.photos.small !== null ? user.photos.small : userPhoto}
              className={s.userPhoto}
            />
          </NavLink>
        </div>
        <div>
          {user.followed ? (
            <button
              disabled={followingInProgress.some(id => id === user.id)}
              className={s.button}
              onClick={() => {
                unfollow(user.id);
              }}
            >
              Unfollow{' '}
            </button>
          ) : (
            <button
              disabled={followingInProgress.some(id => id === user.id)}
              onClick={() => {
               follow(user.id);
              }}
            >
              Follow
            </button>
          )}
        </div>
      </span>
      <div className={s.nameStatus}>
          <div> {user.name}</div>
          <div>{user.status}</div>
        </div>
        {/* <span>
          <div>{'user.location'}</div>
        </span> */}
      
    </div>
  );
};
export default User;
