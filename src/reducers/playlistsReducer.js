/*	
 * 	This file manages/modifies playlist state based on action recieved
 */

export default (state = [], action) => {
	switch(action.type){
		case "INDEX_PLAYLISTS":
			return action.payload;	//returns the response of spotify api request for all a user's playlist
		case "CREATE_PLAYLIST":
			return [...state, action.payload];	//copies current state array and adds new playlist
		case "DELETE_PLAYLIST":
			return state.filter(playlist => playlist.id !== action.payload);   //use filter because it returns a new array
		default:
			return state;
	}
}