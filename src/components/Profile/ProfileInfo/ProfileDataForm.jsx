import React from  'react';
import { createField, Input, Textarea } from '../../common/FormsControls/FormsControl';
import { reduxForm } from 'redux-form';
import a from './ProfileInfo.module.css';
import s from '../../common/FormsControls/FormsControl.module.css'


const ProfileDataForm = ({handleSubmit,profile, error})=>{
return <form onSubmit={handleSubmit}>
       { error && <div className={s.formSummaryError}>
         {error}
         </div> 
         } 
         <div>
         <b> Name:</b> {createField('Full name', 'fullName',[], Input )} 
         </div>
         <div>
          <b>Looking for a job: </b> 
           {createField('', 'lookingForAJob',[], Input, {type:'checkbox'} )} 
         </div>
         <div>
          <b>My professional skills: </b> {createField('My professional skills', 'lookingForAJobDescription',[], Textarea)} 
         </div>
         <div>
          <b>About me: </b> {profile.aboutMe} {createField('About me', 'aboutMe',[],Textarea)}
         </div>
         <div>
          <b>Contacts:</b> {Object.keys(profile.contacts).map(key=>{
            return <div key={key} className={a.contact}> 
            <b>{key}:</b> {createField(key, 'contacts.' + key,[], Input)} </div>
          })}
         </div> 
          <div><button>Save</button></div>
 </form>
}

const ProfileDataFormRedux = reduxForm({form:'profileData'})(ProfileDataForm)
export default ProfileDataFormRedux;