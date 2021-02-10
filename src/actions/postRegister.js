export function postRegister(requestOptions){
  return (dispatch)=>{
    fetch(`${process.env.REACT_APP_URL}/user/register`, requestOptions)
      .then(response=>response.json())
      .then(data=>{
        console.log(data)
        dispatch({type:"REGISTER", payload: data});
      })
      .catch(err => {
        console.log(err);
      })
  }
}