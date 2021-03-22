import {combineReducers} from 'redux';
import registerReducer from "./register";
import signInReducer from "./signIn";
import userReducer from './user';
import updateUserReducer from './updateUser'
import deleteReducer from './deleteUser';

const allReducers = combineReducers({
  Register: registerReducer,
  GetUser: userReducer,
  SignIn: signInReducer,
  UpdateUser: updateUserReducer,
  DeleteUser: deleteReducer
})

export default allReducers;