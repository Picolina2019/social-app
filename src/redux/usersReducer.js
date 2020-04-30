import {userAPI} from '../api/api';

const FOLLOW = '1_FOLLOW';
const UNFOLLOW = '1_UNFOLLOW';
const SET_USERS = '1_SET_USERS';
const SET_CURRENT_PAGE = '1_SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = '1_SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = '1_TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = '1_TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState= {
     users:[
      ],
      pageSize:10,
      totalUsersCount:20,
      currentPage:1,
      isFetching:true,
      followingInProgress:[]
};
const  usersReducer = (state= initialState,action)=>{
      switch (action.type){
      case FOLLOW:
          return {
              ...state,
              users:state.users.map(u => {
                  if( u.id===action.userID){
                      return {...u, followed:true}
                  }
                  return u;
              })
}
       case UNFOLLOW:
        return {
            ...state,
            users:state.users.map(u => {
            if( u.id===action.userID){
                return {...u, followed:false}
            }
                return u;
            })
}
       case SET_USERS:{
        return {
            ...state, users: action.users
            }
      }
      case SET_CURRENT_PAGE:{
        return {
            ...state, currentPage:action.currentPage
            }
      }
      case SET_TOTAL_USERS_COUNT:{
        return {
            ...state, totalUsersCount:action.count
            }
      }
      case TOGGLE_IS_FETCHING:{
        return {
            ...state, isFetching:action.isFetching
            }
      }
      case TOGGLE_IS_FOLLOWING_PROGRESS:{
        return {
            ...state, 
            followingInProgress:action.isFetching 
            ? [...state.followingInProgress, action.userId]
            :  state.followingInProgress.filter (id => id !== action.userId)
            }
      }
       default:
           return state;
           }  
  }
  export const acceptFollow= (userID)=>{
    return {
      type:FOLLOW, userID
    }
  }
  
   export const acceptUnfollow=(userID)=>{
    return{
      type:UNFOLLOW, userID
    }
  }
  export const setUsers=(users)=>{
    return{
      type:SET_USERS, users
    }
  }
  export const setCurrentPage=(currentPage)=>{
    return{
      type:SET_CURRENT_PAGE, currentPage
    }
  }
  export const setTotalUsersCount=(totalUsersCount)=>{
    return{
      type:SET_TOTAL_USERS_COUNT, count:totalUsersCount
    }
  }
  export const toggleIsFetching=(isFetching)=>{
    return{
      type:TOGGLE_IS_FETCHING, isFetching
    }
  }
  export const toggleIsFollowingProgress=(isFetching, userId)=>{
    return{
      type:TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId
    }
  }

export const getUsers = (currentPage, pageSize)=>{
  return async(dispatch) =>{
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(currentPage));
let data = await userAPI.getUsers(currentPage, pageSize);
dispatch(toggleIsFetching(false));
dispatch(setUsers(data.items));
dispatch(setTotalUsersCount(data.totalCount));
}
}
export const unfollow = (userId)=>{
  return async(dispatch) =>{
    dispatch(toggleIsFollowingProgress(true, userId));
    let response = await userAPI.unfollow(userId);
    if(response.data.resultCode===0){
    dispatch(acceptUnfollow(userId));
    }
    dispatch(toggleIsFollowingProgress(false, userId));
}
}
export const follow = (userId)=>{
  return async(dispatch) =>{
    dispatch(toggleIsFollowingProgress(true, userId));
    let response = await userAPI.follow(userId);
    if(response.data.resultCode===0){
    dispatch(acceptFollow(userId));
    }
    dispatch(toggleIsFollowingProgress(false, userId));
  }
}
export default usersReducer;