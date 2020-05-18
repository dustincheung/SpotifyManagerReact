export default (state = null, action) =>{
	switch(action.type){
		case "GET_CURR_USER":
			return action.payload;    //if action.payload is not yet defined return false
		default:
			return state;
	}
};