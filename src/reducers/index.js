//file where we combine reducers
import {combineReducers} from "redux";
import {reducer as formReducer} from "redux-form";

import authReducer from "./authReducer";
import playlistsReducer from "./playlistsReducer";
import tracksReducer from "./tracksReducer";
import searchTracksReducer from "./searchTracksReducer";
import addTracksReducer from "./addTracksReducer";

export default combineReducers({
	auth: authReducer,
	playlists: playlistsReducer,
	tracks: tracksReducer,
	form: formReducer,
	searchTracks: searchTracksReducer,
	addTracks: addTracksReducer
});