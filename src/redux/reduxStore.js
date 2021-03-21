import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import profileReducer from './profileReducer';
import messageReducer from './messageReducer';
import usersReducer from './usersReducer';
import authReducer from './authReducer';
import appReducer from './appReducer';
import thunkMiddleWare from 'redux-thunk';
import { reducer as formReducer} from 'redux-form';


let reducers = combineReducers({
profilePage:profileReducer,
messagesPage:messageReducer,
usersPage:usersReducer,
auth: authReducer,
form:formReducer,
app:appReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleWare)
));


export default store;