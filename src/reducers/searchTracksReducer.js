export default (state=[], action) => {
	switch(action.type){
		case "INDEX_SEARCHTRACKS":
			return action.payload;
		case "CREATE_SEARCHTRACK":
			return [...state, action.payload];
		case "DELETE_SEARCHTRACK":
			return state.filter(track => track.id !== action.payload);   //use filter because it returns a new array
		case "CLEAR_TRACKS":
			return action.payload;
		default:
			return state;
	}
}