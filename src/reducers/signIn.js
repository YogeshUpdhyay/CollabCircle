const signInReducer = (state={data: {}, isLogged: false}, action)=>{
  switch(action.type){
    case "SIGNIN":
      if(action.payload.access_token){
        state.isLogged = true;
      }
      return {...state, data: action.payload};
    default:
      return state;
  }
}

export default signInReducer;