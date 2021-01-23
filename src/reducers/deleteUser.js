const deleteReducer = (state={data:{}}, action)=>{
  switch(action.type){
    case "DELETEUSER":
      console.log(action.payload);
      console.log(action);
      return {...state, data: action.payload}

    default:
      return state;
  }
}

export default deleteReducer;