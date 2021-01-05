import {combineReducers} from 'redux';
import registerReducer from "./register";

const allReducers = combineReducers({
  Register: registerReducer
})

export default allReducers;