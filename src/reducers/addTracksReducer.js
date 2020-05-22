export default (state=[], action) => {
	switch(action.type){
		case "CREATE_TRACKSTOADD":
			return [...state, action.payload];
		case "DELETE_ADDTRACK":
			return state.filter(track => track.id !== action.payload);   //use filter because it returns a new array
		case "CLEAR_TRACKS":
			return action.payload;
		default:
			return state;
	}
}