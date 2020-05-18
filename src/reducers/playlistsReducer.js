import _ from "lodash";

export default (state = [], action) => {
	switch(action.type){
		case "INDEX_PLAYLISTS":
			//return {...state, ..._.mapKeys(action.payload, "id")};
			return [...state, action.payload];
		default:
			return state;
	}
}