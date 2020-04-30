import React, {useState} from 'react';
import { useEffect } from 'react';


const ProfileStatusWithHook=(props) =>{
  let [editMode, setEditMode] = useState(false);
  let [status, setStatus]= useState(props.state);
  useEffect(()=>{
      setStatus(props.status);
  }, [ props.status]);
  
  const activateEditMode= ()=>{
       setEditMode(true);
  }
  const deactivateEditMode=()=>{
      setEditMode(false);
      props.updateStatus(status);

  }
  const onStatusChange=(e)=>{
      setStatus(e.currentTarget.value);
  }
return (
        <div> {!editMode && 
            <div>
                
            <span onClick={activateEditMode}>{props.status|| 'no status'} </span>
   
            </div>}     
             { editMode &&
            <div>
             <input onBlur={deactivateEditMode} autoFocus={true} onChange={onStatusChange} value={status} />
            </div>}

        </div>)
    }   
 
export default ProfileStatusWithHook;