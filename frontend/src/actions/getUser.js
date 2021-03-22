export function getUser(requestOptions){
  return (dispatch)=>{
    fetch(`${process.env.REACT_APP_URL}/user/`, requestOptions)
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
    fetch(`${process.env.REACT_APP_URL}/user/`,requestOptions)
      .then(response=>response.json())
      .then(data=>{
        console.log(data);
        dispatch({type:"DELETEUSER",payload:data})
      })
  }
}