import React from 'react';
import {connect} from 'react-redux';
import Users from './Users';
import { acceptFollow, acceptUnfollow, follow, unfollow, setCurrentPage,  getUsers, } from '../../redux/usersReducer';
import Preloader from '../common/Preloader';
import {getUsersSelector, getUsersPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress } from '../../redux/usersSelectors';

class UsersApiContainer extends React.Component {

    componentDidMount(){
      const {currentPage,pageSize}= this.props;
        this.props.getUsers(currentPage,pageSize);
   }

    onPageChanged = (pageNumber)=> {
     const {pageSize}= this.props;
      this.props.getUsers(pageNumber,pageSize);
 
} 
render() {
   return <div >
     {this.props.isFetching ? 
     <Preloader/> : null}
     <Users totalUsersCount={this.props.totalUsersCount}
      pageSize={this.props.pageSize}
      users={this.props.users}
      onPageChanged={this.onPageChanged}
      currentPage={this.props.currentPage}
      follow={this.props.follow}
      unfollow={this.props.unfollow}
      followingInProgress={this.props.followingInProgress}
      />
    </div>
  }    
}
 
let mapStateToProps= (state)=>{
    return {
        users:getUsersSelector (state),
        pageSize:getUsersPageSize(state),
        totalUsersCount:getTotalUsersCount (state),
        currentPage:getCurrentPage (state),
        isFetching:getIsFetching (state),
        followingInProgress:getFollowingInProgress(state)
    }
}
  
export default connect ( mapStateToProps, {follow,unfollow,
      setCurrentPage, acceptFollow, acceptUnfollow, 
       getUsers  })
(UsersApiContainer);