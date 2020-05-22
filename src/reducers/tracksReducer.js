export default (state = [], action) => {
	switch(action.type){
		case "INDEX_TRACKS":
			return action.payload;
		case "DELETE_TRACK":
			return state.filter(track => track.track.id !== action.payload);
		default:
			return state;
	}
}