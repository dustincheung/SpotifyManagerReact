export default (state = [], action) => {
	switch(action.type){
		case "INDEX_TRACKS":
			return action.payload;
		default:
			return state;
	}
}