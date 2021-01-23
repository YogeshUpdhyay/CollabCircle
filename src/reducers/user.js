 const userReducer = (state={data:{}}, action)=>{
  switch(action.type){
    case "GETUSER":
      console.log(action.payload);
      return {...state, data: action.payload}

    case "DELETEUSER":
      console.log(action.payload);
      console.log(action);
      return {...state, data: action.payload}

    default:
      return state;
  }
}

export default userReducer;