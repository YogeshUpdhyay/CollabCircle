export function getUser(requestOptions){
  return (dispatch)=>{
    fetch("http://35.154.56.92:8087/api/v1/user/", requestOptions)
      .then(response=>response.json())
      .then(data=>{
        console.log(data);
        dispatch({type:"GETUSER",payload:data});
      })
      .catch(err=>{
        console.log(err);
      })
  }
}

export function deleteUser(requestOptions){
  return (dispatch)=>{
    fetch("http://35.154.56.92:8087/api/v1/user/",requestOptions)
      .then(response=>response.json())
      .then(data=>{
        console.log(data);
        dispatch({type:"DELETEUSER",payload:data})
      })
  }
}