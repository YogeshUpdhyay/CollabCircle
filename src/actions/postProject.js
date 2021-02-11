export function postProject(requestOptions){
    return (dispatch)=>{
      fetch("http://35.154.56.92:8087/api/v1/projects/", requestOptions)
        .then(response=>response.json())
        .then(data=>{
          console.log(data)
          dispatch({type:"CREATEPROJECT", payload: data});
        })
        .catch(err => {
          console.log(err);
        })
    }
  }