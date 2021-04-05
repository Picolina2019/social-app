import React from 'react';
import d from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { Redirect } from 'react-router-dom';
import { Field,reduxForm } from 'redux-form';
import { Textarea } from '../common/FormsControls/FormsControl';
import { required, maxLengthCreator } from '../../utils/validators/validator';



const Dialogs = (props) => {

let state= props.messagesPage

let dialogsElements = state.dialogsData.map(d => <DialogItem key={d.id} name={d.name} id={d.id}/>);

let messagesElements= state.messagesData.map(m => <Message key={m.message} message={m.message}/>);


 
const maxLength30 = maxLengthCreator (30);

const FormMessage =(props)=>{
    return (
    <div>
         <form onSubmit={props.handleSubmit}>
             <div>
               <Field validate={[required,maxLength30 ]} name={'newMessageText'}  component={Textarea} placeholder={'enter your message'}/>  
             </div>
             <div>
               <button>Add message</button>
             </div> 
           </form>
    </div> )
};
const MessageReduxForm = reduxForm ({
    form:'message'
}) (FormMessage);

let onSubmit=(values)=>{
    props.onMessageAddClick(values.newMessageText);
    

}

if(!props.isAuth) return <Redirect to= {'/login'}/>
    return(
        <div className={d.dialogs}>
            <div className={d.dialogsItems}>
                {dialogsElements}
            </div>
           
            <div className={d.messages}>
                {messagesElements}
             
            </div>
            <div>
                <MessageReduxForm onSubmit={onSubmit} />
            </div>
             
        </div>
    )
}
export default Dialogs;