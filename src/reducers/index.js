import {combineReducers} from 'redux';
import registerReducer from "./register";
import signInReducer from "./signIn";
import updateUserReducer from "./updateUser"

const allReducers = combineReducers({
  Register: registerReducer,
  SignIn: signInReducer,
  UpdateUser: updateUserReducer
})

export default allReducers;