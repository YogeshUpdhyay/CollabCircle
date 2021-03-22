export function postCreateProject(requestOptions){
  return (dispatch)=>{
    fetch(`${process.env.REACT_APP_URL}/projects/`, requestOptions)
      .then(response=>response.json())
      .then(data=>{
        console.log(data);
        dispatch({type:"CREATE_PROJECT", payload: data})
      })
  }
}