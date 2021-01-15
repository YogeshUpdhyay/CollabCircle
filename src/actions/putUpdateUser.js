export function putUpdateUser(requestOptions){
  return(dispatch)=>{
    fetch("http://35.154.56.92:8087/api/v1/user/credentials", requestOptions)
      .then(data=>{
        console.log(data);
        dispatch({type:"UPDATE_USER",payload: data});
      })
      .catch(err=>{
        console.log(err);
      })
  }
}