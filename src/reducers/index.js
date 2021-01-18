import {combineReducers} from 'redux';
import registerReducer from "./register";
import signInReducer from "./signIn";
import userReducer from './user';

const allReducers = combineReducers({
  Register: registerReducer,
  SignIn: signInReducer,
  GetUser: userReducer,
})

export default allReducers;