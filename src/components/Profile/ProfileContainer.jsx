import React from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {getUserProfile, getStatus, updateStatus,savePhoto, saveProfile } from '../../redux/profileReducer';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';


class ProfileContainer extends React.Component {
refreshProfile (){
    let userId = this.props.match.params.userId;
    if(!userId){
        userId = this.props.authUserId;
        if(!userId){
            this.props.history.push('/login');
        }
    }
    this.props.getUserProfile(userId);
    this.props.getStatus(userId);
   } 

componentDidMount(){
   this.refreshProfile();
   } 

componentDidUpdate(prevProps, prevState){
    if (this.props.match.params.userId !== prevProps.match.params.userId){
    this.refreshProfile();
}}
render(){
    return(
        <Profile {...this.props} 
        profile={this.props.profile}
        status={this.props.status}
        updateStatus={this.props.updateStatus} 
        isOwner = {!this.props.match.params.userId}
        savePhoto ={ this.props.savePhoto}
    
           />
    )
}
}
let mapStateToProps =(state)=>({
 profile: state.profilePage.profile,
 status: state.profilePage.status,
 authUserId: state.auth.id,
 isAuth: state.auth.isAuth
 
});
export default compose (connect (mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}) , withRouter)(ProfileContainer);
