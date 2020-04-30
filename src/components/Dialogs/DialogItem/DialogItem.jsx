import React from 'react';
import d from './DialogItem.module.css';
import { NavLink } from 'react-router-dom';

const DialogItem =(props)=>{
    return(
    <div className={d.dialog}>
    <NavLink to={'/dialogs/'+ props.id}>{props.name}</NavLink>
    </div>)
};
export default DialogItem;