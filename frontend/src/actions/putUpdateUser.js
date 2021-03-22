export function putUpdateUser(requestOptions){
  return(dispatch)=>{
    fetch(`${process.env.REACT_APP_URL}/user/credentials`, requestOptions)
      .then(data=>{
        console.log(data);
        dispatch({type:"UPDATE_USER",payload: data});
      })
      .catch(err=>{
        console.log(err);
      })
  }
}