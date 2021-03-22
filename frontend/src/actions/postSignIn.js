export function postSignIn(requestOptions){
  return (dispatch)=>{
    fetch(`${process.env.REACT_APP_URL}/user/login`, requestOptions)
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
    fetch(`${process.env.REACT_APP_URL}/user/logout`, requestOptions)
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
    fetch(`${process.env.REACT_APP_URL}`,requestOptions)
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