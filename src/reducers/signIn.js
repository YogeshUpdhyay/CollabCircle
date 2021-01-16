const signInReducer = (state={data: {}, isLogged: false}, action)=>{
  switch(action.type){
    case "SIGNIN":
      console.log(action.payload.access_token);
      if(action.payload.access_token){
        state.isLogged = true;// so i have tried creating a global state for logged in but for some reason it is still acting like local state, like the value is changing from component to component
      }
      return {...state, data: action.payload};
    default:
      return state;
  }
}

export default signInReducer;