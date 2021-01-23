import {combineReducers} from 'redux';
import registerReducer from "./register";
import signInReducer from "./signIn";
import userReducer from './user';
import updateUserReducer from './updateUser'

const allReducers = combineReducers({
  Register: registerReducer,
  GetUser: userReducer,
  SignIn: signInReducer,
  UpdateUser: updateUserReducer
})

export default allReducers;