/*	
 * 	This file manages/modifies collabPlaylist state based on action recieved
 */

 export default (state = [], action) => {
 	switch(action.type){
 		case "INDEX_COLLAB_PLAYLISTS":
 			return action.payload;
 		case "CREATE_COLLAB_PLAYLIST":
 			console.log("IN CASE CREAT REDUCER");
 			return[...state, action.payload];
 		default:
 			return state;
 	}
 }