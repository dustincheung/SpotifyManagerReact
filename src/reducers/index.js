//file where we combine reducers
import {combineReducers} from "redux";

import authReducer from "./authReducer";
import playlistsReducer from "./playlistsReducer";
import tracksReducer from "./tracksReducer";

export default combineReducers({
	auth: authReducer,
	playlists: playlistsReducer,
	tracks: tracksReducer
});