/*	
 * 	This file manages/modifies collabMode state.  collabMode state determines logic that happens in playlist
 *  components (regular playlist vs. collaborative playlist)
 */

export default (state = false, action) =>{
	switch(action.type){
		case "COLLAB_START":
			return action.payload;
		case "COLLAB_STOP":
			return action.payload;
		default:
			return state;
	}
};