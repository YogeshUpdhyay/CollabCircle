const updateUserReducer = (state={data: {}}, action)=>{
  switch(action.type){
    case "UPDATE_USER":
      console.log(action.payload);
      return {...state, data: action.payload};
    default:
      return state;
  }
}

export default updateUserReducer;