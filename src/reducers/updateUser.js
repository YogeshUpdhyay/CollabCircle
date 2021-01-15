const updateUserReducer = (state={data: {}}, action)=>{
  switch(action.type){
    case "UPDATE_USER":
      return {...state, data: action.payload};
    default:
      return state;
  }
}