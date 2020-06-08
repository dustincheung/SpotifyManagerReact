/*
 *	This file holds all the action creators that will be called by components.  Action creators will dispatch an action
 *  that will make changes to the state by modifying the redux store.
 */
 
import axios from "axios";
import history from "../history";
import Spotify from 'spotify-web-api-js';

import hashParams from "../utils/hashParams";

//prod and dev uri
const uri = process.env.REACT_APP_BACKEND_URI || 'http://localhost:5000';

//************************************************
//			AUTH STATE ACTION CREATORS
//************************************************

// Handles setting the auth state. Auth userId comes from db, access tokens come from URL params.
// Redux-thunk middleware allows us to return functions with dispatch and getState params, which is 
// essential for async network requests to backend express server or API requests
export const getCurrUser = () => {
	return async (dispatch, getState) => {
		const response = await axios.get(uri + "/api/current_user");
		const params = hashParams();

		let authStateData;
		if(!response.data[0]){		//if there is no user currently in database auth state is false
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

//************************************************
//			PLAYLISTS STATE ACTION CREATORS
//************************************************

// Makes request to spotify api to create a playlist using form values from redux form (form state)
// Dispatches action that will add the new playlist to playlists state
export const createPlaylist = (formValues) => {
	return async (dispatch, getState) => {
		const spotifyWebApi = new Spotify();
		spotifyWebApi.setAccessToken(getState().auth.accessToken);
		const response = await spotifyWebApi.createPlaylist(getState().auth.userId, formValues);

		dispatch({type: "CREATE_PLAYLIST", payload: response});

		history.push("/playlists");
	}
};

// Makes a request to spotify api to get all playlists from a user
// Dispatches action that will change playlists state to the playlists from the response of the spotify api
export const getPlaylists = () => {
	return async (dispatch, getState) => {
		const spotifyWebApi = new Spotify();
		spotifyWebApi.setAccessToken(getState().auth.accessToken);
		const response = await spotifyWebApi.getUserPlaylists(getState().auth.userId, {limit: 50});		

		dispatch({type: "INDEX_PLAYLISTS", payload: response.items});

		history.push("/playlists"); //redirect to index page ONLY after playlists state has been set
	};
};

// Makes a request to spotify api to unfollow a playist given the playlist id
// Dispatches action with payload of playlist id, so that this id can be filtered out of the playlists state
export const deletePlaylist = (id) => {
	return async (dispatch, getState) => {
		const spotifyWebApi = new Spotify();
		spotifyWebApi.setAccessToken(getState().auth.accessToken);
		await spotifyWebApi.unfollowPlaylist(id);

		dispatch({type: "DELETE_PLAYLIST", payload: id});
		history.push("/playlists");
	}
}

// Makes request to spotify api to change playlist details given the id of playlist and the formValues of the
// details being changed. No dispatch b/c redirect will trigger getPlaylists, thus retrieving updated info
export const updatePlaylist = (id, formValues) => {
	return async (dispatch, getState) => {
		const spotifyWebApi = new Spotify();
		spotifyWebApi.setAccessToken(getState().auth.accessToken);
		await spotifyWebApi.changePlaylistDetails(id, formValues);	
		history.push("/playlists");		// no need to update playlists state b/c on redirect all
	}									// playlists will be indexed again from spotify api
}

//************************************************
//			TRACKS STATE ACTION CREATORS
//************************************************

// Makes a spotify api request to playlist's tracks href (attribute found in playlist json object)
// Indexes tracks found in response to the tracks state
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

// Makes a spotify api request passing in the playlist id and an array of track uris (uniform resource identifier)
export const createTracks = (trackUris, playlistId) => {
	return async (dispatch, getState) => {
		const spotifyWebApi = new Spotify();
		spotifyWebApi.setAccessToken(getState().auth.accessToken);
		await spotifyWebApi.addTracksToPlaylist(playlistId, trackUris);

		// no dispatch b/c there is no purpose in adding the tracks to our react state, as soon  
		// as we redirect to playlists show page it will grab tracks through spotify api

		history.push("/playlists/" + playlistId);
	}
}

// Makes a spotify api request to remove tracks given the playlist id and an array of track uri's that you 
// wish to remove (in this case we make an array of one track uri)
export const deleteTrack = (trackId, trackUri, playlistId) => {
	return async (dispatch, getState) => {
		const spotifyWebApi = new Spotify();
		spotifyWebApi.setAccessToken(getState().auth.accessToken);
		await spotifyWebApi.removeTracksFromPlaylist(playlistId, [trackUri]);

		dispatch({type: "DELETE_TRACK", payload: trackId});
		history.push("/playlists/" + playlistId);
	}
}

// The next two set of action creators are used to maintain the state of the two cols that appear
// in the apps dynamic search / track addition component, searchTracks is the array of tracks that
// result from the spotify api search request, and addTracks is the array that contains the tracks 
// that wish to be added.  State is needed b/c when you add tracks to addTracks you have to remove 
// from searchTracks and vice versa

//************************************************
//			SEARCHTRACKS STATE ACTION CREATORS
//************************************************

// Makes a spotify api request giving a search term and array of types to search
// Dispatches action that contains the array of tracks that result from api request
export const getSearchTracks = (formValues) => {
	return async (dispatch, getState) => {
		const spotifyWebApi = new Spotify();
		spotifyWebApi.setAccessToken(getState().auth.accessToken);
		const response = await spotifyWebApi.search(formValues.searchTerm, ['track']);	

		dispatch({type: "INDEX_SEARCHTRACKS", payload: response.tracks.items})
	}
}

// Action creator called when a track is to be deleted from the addTracks state, thus needs
// to be added back to the searchTracks state 
export const createSearchTrack = (trackToDelete) => {
	return {type: "CREATE_SEARCHTRACK", payload: trackToDelete};
}

// Action creator called when a track is to be added to the addTracks state, thus needs
// to be deleted from the searchTracks state 
export const deleteSearchTrack = (id) => {
	return {type: "DELETE_SEARCHTRACK", payload: id};
}

//************************************************
//			ADDTRACKS STATE ACTION CREATORS
//************************************************

// Action creator called when a track from the searchTrack state array, is selected to be added
// thus addTracks state array needs to add the new track
export const createAddTracks = (trackToAdd) => {
	return {type: "CREATE_TRACKSTOADD", payload: trackToAdd};
}

// Action creator called when a track is removed from the addTrack state array
export const deleteAddTrack = (id) => {
	return {type: "DELETE_ADDTRACK", payload: id};
}

// Action creator called when the TracksCreate component's button is clicked confirming the
// array of addTracks to be added to the overall all track state. Both searchTracks and addTracks
// must be cleared to ensure that we start clean for the next time tracks wish to be added
export const clearSearchAddTracks = () => {
	return {type: "CLEAR_TRACKS", payload: []};  //both reducers catch this type
}

//************************************************
//	   COLLABPLAYLISTS STATE ACTION CREATORS
//************************************************

export const getCollabPlaylists = () => {
	return async (dispatch, getState) => {
		const response = await axios.get(uri + "/collabplaylists")
		console.log("GET COLLAB PLAYLIST RESPONSE");
		console.log(response);
		dispatch({type: "GET_COLLAB_PLAYLISTS", payload: response.data})
	}
}