import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import ProfileContainer from './components/Profile/ProfileContainer';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import { Route, withRouter, Redirect,  } from 'react-router-dom';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { connect } from 'react-redux';
import { initializeApp} from './redux/appReducer';
import { compose } from 'redux';
import Preloader from './components/common/Preloader';
import {HashRouter, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './redux/reduxStore';

class  App extends React.Component {
  componentDidMount(){
    this.props.initializeApp();
}
  render(){
    if(!this.props.initialized){
    return <Preloader/>
    }
   return (
    
      <div className='app-wrapper'>
        <HeaderContainer />
        <Navbar />
        <div className='app-wrapper-content'>
          <Switch>
          <Route exact path='/'
                 render={()=> <Redirect to={"/profile"}/>}/>
          <Route path='/profile/:userId?' render={ () =><ProfileContainer  />} />
          <Route path='/dialogs' render={ () =><DialogsContainer />} />
          <Route path='/news' render={ () =><News/>} />
          <Route path='/music' render={ () =><Music/>} />
          <Route path='/users' render={ () =><UsersContainer/>} />
          <Route path='/settings' render={ () =><Settings/>} />
          <Route path='/login' render={ () =><Login/>} />
          <Route path='*' render ={()=><div>404 NOT FOUND</div>}/>
          </Switch>
        </div>
      </div>
   
  );
}
}
 const mapStateToProps = (state)=>({
   initialized: state.app.initialized
 });

let AppContainer = compose (withRouter,
   connect (mapStateToProps,{initializeApp })) (App);

let MainApp = (props)=>{
return <HashRouter>
<Provider store={store}>
<AppContainer />
</Provider>
</HashRouter>
}
export default MainApp;