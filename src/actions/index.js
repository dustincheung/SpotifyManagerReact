import axios from "axios";
import history from "../history";
import hashParams from "../utils/hashParams";
import Spotify from 'spotify-web-api-js';

// Action creator that handles setting the auth state. 
// Auth userId comes from db, access tokens come from URL params.
export const getCurrUser = () => {
	return async (dispatch, getState) => {
		const uri = process.env.REACT_APP_BACKEND_URI || 'http://localhost:5000';
		const response = await axios.get(uri + "/api/current_user");
		const params = hashParams();

		let authStateData;
		if(!response.data[0]){							//if there is no user currently in database auth state is false
			authStateData = false;
		}else{
			authStateData = {
				userId: response.data[0].userId,
				accessToken:  params.access_token || getState().auth.accessToken,	//handles redirects where no param string is given in url
				refreshToken: params.refresh_token || getState().auth.refreshToken  //if auth state is already set we dont want to set undefined tokens
			}																		//a non initial redirect to /playlists shouldn't change state
		}

		dispatch({type: "GET_CURR_USER", payload: authStateData});
	};
};

export const createPlaylist = (formValues) => {
	return async (dispatch, getState) => {
		const spotifyWebApi = new Spotify();
		spotifyWebApi.setAccessToken(getState().auth.accessToken);
		const response = await spotifyWebApi.createPlaylist(getState().auth.userId, formValues);

		dispatch({type: "CREATE_PLAYLIST", payload: response});

		history.push("/playlists");
	}
};

export const getPlaylists = () => {
	return async (dispatch, getState) => {
		const spotifyWebApi = new Spotify();
		spotifyWebApi.setAccessToken(getState().auth.accessToken);
		const response = await spotifyWebApi.getUserPlaylists(getState().auth.userId, {limit: 50});		

		dispatch({type: "INDEX_PLAYLISTS", payload: response.items});

		history.push("/playlists"); //redirect to index page ONLY after playlists state has been set
	};
};

export const deletePlaylist = (id) => {
	return async (dispatch, getState) => {
		const spotifyWebApi = new Spotify();
		spotifyWebApi.setAccessToken(getState().auth.accessToken);
		await spotifyWebApi.unfollowPlaylist(id);

		dispatch({type: "DELETE_PLAYLIST", payload: id});
		history.push("/playlists");
	}
}

export const getTracks = (playlist) => {
	return async (dispatch, getState) => {
		const response = await axios.get(playlist.tracks.href, 
		{
			headers: {
				Authorization: "Bearer " + getState().auth.accessToken
			}
		});

		dispatch({type: "INDEX_TRACKS", payload: response.data.items});
	};
};