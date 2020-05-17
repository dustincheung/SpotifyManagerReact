export default (state = null, action) =>{
	console.log("in auth reducer");
	console.log(action.payload);
	switch(action.type){
		case "GET_CURR_USER":
			return action.payload;    //if action.payload is not yet defined return false
		default:
			return state;
	}
};