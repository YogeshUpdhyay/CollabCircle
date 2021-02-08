import Cookies from 'js-cookie';

const signInReducer = (state={data: {}, isLogged: false}, action)=>{
  switch(action.type){
    case "SIGNIN":
      console.log(action.payload);
      if(action.payload.access_token){
        // state.isLogged = true;// so i have tried creating a global state for logged in but for some reason it is still acting like local state, like the value is changing from component to component
        localStorage.setItem('access_token', action.payload.access_token);
        localStorage.setItem('refresh_token', action.payload.refresh_token);
        var inFiveMinutes = new Date(new Date().getTime() + 5 * 60 * 1000);
        Cookies.set('access_token',action.payload.access_token,{expires: inFiveMinutes});
        Cookies.set('refresh_token',action.payload.refresh_token,{expires: 30});

      }
      return {...state, data: action.payload, isLogged: true};
      
    case "LOGOUT":
      console.log(action.payload);
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      Cookies.remove('access_token');
      Cookies.remove('refresh_token');
      return {...state, data: action, isLogged: false}

    case "NEWTOKEN":
      console.log(action.payload);
      Cookies.set('access_token', action.payload.access_token);
      return {...state, data: action.payload}
    
    default:
      return state;
  }
}

export default signInReducer;