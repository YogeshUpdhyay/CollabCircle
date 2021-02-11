const createProjectReducer=(state={data:{}}, action)=>{
    switch(action.type){
      case "CREATEPROJECT":
        return {...state, data: action.payload};
      default:
        return state
    }
  }
  
  export default createProjectReducer;