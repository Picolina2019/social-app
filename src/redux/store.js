import profileReducer from "./profileReducer";
import messageReducer from "./messageReducer";

let store = {
  _state:{
    profilePage:{

      postData:[
       {message:'Hi, how are you?', likesCount:1, id:1},
       {message:'This is my first post', likesCount:35, id:2},
       {message:'I am here', likesCount:225, id:3}
],
      newPostText:'Katja Front-End',
      
},
  messagesPage:{
  
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
],
   newMessageText:""
}
},
  getState(){
    return this._state;
  },
  rerenderEntireTree(){
  console.log('yes');
},
subscribe (observer){
  this._rerenderEntireTree = observer;
},

dispatch(action){
  this._state.profilePage = profileReducer(this._state.profilePage, action);
  this._state.messagesPage = messageReducer(this._state.messagesPage, action);
  this._rerenderEntireTree(this._state);
 }
}




 
export default store;