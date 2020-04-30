const ADD_MESSAGE='4_ADD_MESSAGE';

let initialState={
    dialogsData:[
        {name:'Bob', id: 1},
        {name:'Alex', id: 2},
        {name:'Man', id: 3},
        {name:'Katja', id: 4},
        {name:'Max', id: 5}
 ],  
     messagesData :[
      {id:1,message:"Hello my friend"},
      {id:2,message:"Hola"},
      {id:3,message:"Dosvidos"}
 ]
   
 };

const messageReducer= (state=initialState,action)=>{
 switch(action.type){
case ADD_MESSAGE:{
    let newMessageBody= action.newMessageText;
     return {
       ...state,
      messagesData:[...state.messagesData, {id:4, message:newMessageBody}]
      
    }
  }
default:
    return state;
 } 
} 
export const addMessageActionCreator= (newMessageText)=>{
    return {
      type:ADD_MESSAGE, newMessageText
    }
  }
  
     
export default messageReducer;