export function postSignIn(requestOptions){
  return (dispatch)=>{
    fetch("https://cors-anywhere.herokuapp.com/http://35.154.56.92:8087/api/v1/user/login", requestOptions)
      .then(response=>response.json())
      .then(data=>{
        console.log(data)
        dispatch({type:"SIGNIN", payload: data});
      })
      .catch(err=>{
        console.log(err);
      })
  }
}

export function postLogOut(requestOptions){
  return(dispatch)=>{
    fetch("http://35.154.56.92:8087/api/v1/user/logout", requestOptions)
      .then(response=>response.json())
      .then(data=>{
        console.log(data);
        dispatch({type:"LOGOUT", payload: data});
      })
      .catch(err=>{
        console.log(err);
      })
  }
}

export function postNewToken(requestOptions){
  return(dispatch)=>{
    fetch("http://35.154.56.92:8087/api/v1/user/refresh",requestOptions)
      .then(response=>response.json())
      .then(data=>{
        console.log(data);
        dispatch({type:"NEWTOKEN",payload:data});
      })
      .catch(err=>{
        console.log(err);
      })
  }
}