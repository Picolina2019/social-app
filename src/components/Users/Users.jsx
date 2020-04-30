import React from 'react';
import Pagination from '../common/Paginator/Pagination'; 
import User from './User';

const Users = ({totalUsersCount,pageSize,currentPage,onPageChanged,users,...props})=> {

return <div>
       <Pagination totalItemsCount={totalUsersCount}
    pageSize={pageSize} currentPage={currentPage} 
    onPageChanged={onPageChanged} />
    <div>
           {
            users.map(u => < User key={u.id}
            followingInProgress={props.followingInProgress}
            user={u}
            follow={props.follow}
            unfollow={props.unfollow}
            />) 
           }
    </div>
</div>
}
export default Users;
