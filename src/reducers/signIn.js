const signInReducer = (state={data: {}, isLogged: false}, action)=>{
  switch(action.type){
    case "SIGNIN":
      console.log(action.payload);
      if(action.payload.access_token){
        state.isLogged = true;// so i have tried creating a global state for logged in but for some reason it is still acting like local state, like the value is changing from component to component
        localStorage.setItem('access_token', action.payload.access_token);
        localStorage.setItem('refresh_token', action.payload.refresh_token);
      }
      return {...state, data: action.payload};

    case "LOGOUT":
      console.log(action.payload);
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      return {...state, data: action.payload};
      
    default:
      return state;
  }
}

export default signInReducer;