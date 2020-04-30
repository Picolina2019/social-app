import React from 'react';
import a from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader';
import ProfileStatusWithHook from './ProfileStatusWithHook';
import userPhoto from '../../../assets/images/profile.jpg';
import { useState } from 'react';
import ProfileDataForm from './ProfileDataForm';


const ProfileInfo = ({profile,status, updateStatus,isOwner, savePhoto, saveProfile}) =>{
 
  let [ editMode, setEditMode]= useState(false);
if (!profile){
    return <Preloader/>
  }
  const onMainPhotoSelected=(e)=>{
    if(e.target.files.length){
      savePhoto(e.target.files[0]);
    }
  }
  const onSubmit = (formData)=>{
    saveProfile(formData).then(
      ()=>{
    setEditMode(false);
  }
    );
    }
    return (
    <div className={a.content} >
      <div>
        <img src='https://www.cloudheroes.com/wp-content/uploads/2015/09/Fotolia_84795519_Subscription_Monthly_M.jpg' />
      </div>
       <div className={a.profileImage}>
         <img src={profile.photos.large || userPhoto}/>
        {isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}
         <br/>  
        </div>
         <div className={a.status}><b>Status:</b>
         <ProfileStatusWithHook  status={status} updateStatus={updateStatus} />
         </div> 
         {editMode 
         ? <ProfileDataForm initialValues ={profile} profile={profile} onSubmit={onSubmit}/>
         : <ProfileData profile={profile} isOwner={isOwner} 
         goToEditMode={()=>{setEditMode(true)}}/>}
    </div>
    )}

    const ProfileData=({profile, isOwner, goToEditMode})=>{
      return<div className={a.description}>
        <div>
         <b> Name:</b> {profile.fullName} 
        </div>
         <div>
          <b>Looking for a job: </b> {profile.lookingForAJob ? 'yes':'no'} 
         </div>
         {profile.lookingForAJob &&
         <div>
          <b>My professional skills: </b> {profile.lookingForAJobDescription} 
         </div>} 
         <div>
          <b>About me: </b> {profile.aboutMe} 
         </div>
         <div>
          <b>Contacts:</b> {Object.keys(profile.contacts).map(key=>{
            return <Contact key={key} contactTitle={key} 
            contactValue={profile.contacts[key]}/>
          })}
         </div>
         <div className={a.button}>
         { isOwner && <div><button onClick={goToEditMode}>EDIT</button></div>}
         </div>
        </div>
    }
    
    const Contact = ({ contactTitle, contactValue})=>{
      return <div className={a.contact}><span>{contactTitle}</span>:{contactValue}</div>
    }

export default ProfileInfo;