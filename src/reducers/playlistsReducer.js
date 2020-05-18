export default (state = [], action) => {
	switch(action.type){
		case "INDEX_PLAYLISTS":
			return action.payload;
		default:
			return state;
	}
}