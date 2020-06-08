/*	
 * 	This file imports all of our reducers and combines them.  The states in the 
 *  combineReducers call are the states that will exist in our redux store.
 */

import {combineReducers} from "redux";
import {reducer as formReducer} from "redux-form";	

import authReducer from "./authReducer";
import playlistsReducer from "./playlistsReducer";
import tracksReducer from "./tracksReducer";
import searchTracksReducer from "./searchTracksReducer";
import addTracksReducer from "./addTracksReducer";
import collabPlaylistsReducer from "./collabPlaylistsReducer";

export default combineReducers({
	auth: authReducer,
	playlists: playlistsReducer,
	tracks: tracksReducer,
	form: formReducer,					//formsReducer is imported from redux-form
	searchTracks: searchTracksReducer,
	addTracks: addTracksReducer,
	collabPlaylists: collabPlaylistsReducer
});