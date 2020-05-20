export default (state = [], action) => {
	switch(action.type){
		case "INDEX_PLAYLISTS":
			return action.payload;
		case "DELETE_PLAYLIST":
			console.log("id payload " + action.payload);
			return state.filter(playlist => playlist.id !== action.payload);   //use filter because it returns a new array
		default:
			return state;
	}
}