/*	
 * 	This file manages/modifies addTracks (right col of TracksCreate component showing tracks wished to be added) 
 *  state based on action recieved
 */

export default (state=[], action) => {
	switch(action.type){
		case "CREATE_TRACKSTOADD":
			return [...state, action.payload]; //copies current state array and adds new track
		case "DELETE_ADDTRACK":
			return state.filter(track => track.id !== action.payload);   //use filter because it returns a new array
		case "CLEAR_TRACKS":
			return action.payload;
		default:
			return state;
	}
}