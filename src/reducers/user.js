const userReducer = (state={data:{}}, action)=>{
  switch(action.type){
    case "GETUSER":
      console.log(action.payload);
      return {...state, data: action}

    default:
      return state;
  }
}