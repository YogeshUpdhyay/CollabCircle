import {combineReducers} from 'redux';
import registerReducer from "./register";
import signInReducer from "./signIn";

const allReducers = combineReducers({
  Register: registerReducer,
  SignIn: signInReducer
})

export default allReducers;