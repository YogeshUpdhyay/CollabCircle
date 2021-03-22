import Cookies from 'js-cookie';

const projectReducer = (state={data:{}}, action)=>{
  switch(action.type){
    case "CREATE_PROJECT":
      console.log(action.payload);
      console.log(action);
      return {...state, data: action.payload}

    default:
      return state;
  }
}