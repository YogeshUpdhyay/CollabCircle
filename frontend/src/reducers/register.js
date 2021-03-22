const registerReducer=(state={data:{}}, action)=>{
  switch(action.type){
    case "REGISTER":
      return {...state, data: action.payload};
    default:
      return state
  }
}

export default registerReducer;