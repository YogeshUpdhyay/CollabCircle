export function postSignIn(requestOptions){
  return (dispatch)=>{
    fetch("http://35.154.56.92:8087/api/v1/user/login", requestOptions)
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
  }
}