/*	
 * 	This file manages/modifies collabPlaylist state based on action recieved
 */

 export default (state = [], action) => {
 	switch(action.type){
 		case "GET_COLLAB_PLAYLISTS":
 			return action.payload;
 		default:
 			return state;
 	}
 }