/*	
 * 	This file manages/modifies tracks state based on action recieved
 */

export default (state = [], action) => {
	switch(action.type){
		case "INDEX_TRACKS":
			return action.payload;
		case "DELETE_TRACK":
			return state.filter(track => track.track.id !== action.payload);	//filter out track with id, thus deleting it
		default:
			return state;
	}
}