import React from 'react';
import s from './Header.module.css';
import { NavLink } from 'react-router-dom';

const Header = (props)=>{
    return (
      <header className={s.header}>
        <img
          src='https://winaero.com/blog/wp-content/uploads/2017/07/Paint-3D-icon-logo.png'
          alt='logo'
        />
        <div className={s.loginBlock}>
          {props.isAuth ? (
            <div>
              {' '}
              {props.login} <button onClick={props.logout}>Log out</button>
            </div>
          ) : (
            <NavLink to={'/login'}>
              <span>Login</span>
            </NavLink>
          )}
        </div>
      </header>
    );
     
}
export default Header;

