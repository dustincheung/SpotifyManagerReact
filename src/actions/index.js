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

// Makes request to spotify api to create a playlist using form values from redux form (form state)
// Dispatches action that will add the new playlist to playlists state
export const createPlaylist = (formValues) => {
	return async (dispatch, getState) => {
		const spotifyWebApi = new Spotify();
		spotifyWebApi.setAccessToken(getState().auth.accessToken);
		const response = await spotifyWebApi.createPlaylist(getState().auth.userId, formValues);

		dispatch({type: "CREATE_PLAYLIST", payload: response});

		//for saving a collabPlaylist (creating spotify playlist and adding tracks) this ensures we
		//do not redirect to /playlists (collabMode = false) before adding tracks to that playlist
		if(!getState().collabMode){
			history.push("/playlists");
		}
		
	}
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
		
		if(!getState().collabMode){
			const response = await axios.get(playlist.tracks.href, 
				{
					headers: {
						Authorization: "Bearer " + getState().auth.accessToken
				}
			});

			dispatch({type: "INDEX_TRACKS", payload: response.data.items});

		}else{
			const response = await axios.get(uri + "/collabplaylists/" + playlist._id + "/tracks");

			dispatch({type: "INDEX_TRACKS", payload: response.data});
		}
		
	};
};

// Makes a spotify api request passing in the playlist id and an array of track uris (uniform resource identifier)
export const createTracks = (tracks, playlistId) => {
	return async (dispatch, getState) => {
		//need to pull an array of uri's out of the array of track objects b/c that is what spotify api requires
		let trackUris;

		if(!getState().collabMode){
			//adds tracks from addTracks state to a spotify playlist
			trackUris = getUrisAddTracks(tracks);
		}else{
			//add tracks from track state when "saving" a collabPlaylist
			trackUris = getUrisTracks(tracks);
		}
		
		const spotifyWebApi = new Spotify();
		spotifyWebApi.setAccessToken(getState().auth.accessToken);
		console.log("playlistId: " + playlistId);
		console.log("trackUris: " + trackUris);
		await spotifyWebApi.addTracksToPlaylist(playlistId, trackUris);

		// no dispatch b/c as soon as we redirect to playlists show page it will grab tracks through spotify api
		// if add tracks in reg mode redirect to show, else you are saving a collabPlaylist so redirect to index
		if(!getState().collabMode){
			history.push("/playlists/" + playlistId);
		}else{
			history.push("/playlists");
		}
		
	}
}

// Helper method to pull out array of track uri's from addTracks state (used when adding tracks to spotify playlist)
const getUrisAddTracks = (addTracks) => {
	let uriArray = [];
	
	for(let i = 0; i < addTracks.length; i++){
		uriArray.push(addTracks[i].uri);
	}

	return uriArray;
}

// Helper method to pull out array of track uri's from tracks state (used in saving collabPlayist and its tracks)
const getUrisTracks = (tracks) => {
	console.log("IN GET URIS TRACKS");
	let uriArray = [];
	
	for(let i = 0; i < tracks.length; i++){
		console.log(JSON.stringify(tracks[i]));
		uriArray.push(tracks[i].track.uri);
	}

	return uriArray;
}

// Makes a request to SpotifyManagerBackend to create tracks for a collabPlaylist
export const createCollabTracks = (tracks, playlistId) => {
	return async (dispatch, getState) => {
		//pass tracks to be added to collabPlaylist and also the collabortator id
		const collaborator = getState().auth.userId;
		const collabTracks = getState().collabMode ? formatTracksFromAddTracks(tracks) : formatTracksFromTracks(tracks);

		await axios.post(uri + "/collabplaylists/" + playlistId + "/tracks", {collaborator, collabTracks});

		if(!getState().collabMode){
			history.push("/collabplaylists");
		}else{
			history.push("/collabplaylists/" + playlistId);
		}
	}
}

// Helper method to format tracks from addTracks state into the array of custom track objects 
// that my collabPlaylist schema will use
const formatTracksFromAddTracks = (tracksArray) => {
	let collabTracks = [];

	for(let i = 0; i < tracksArray.length; i++){
		let collabTrack = {
			track: {
				name: tracksArray[i].name,
				uri: tracksArray[i].uri,
				artists: [
					{
						name: tracksArray[i].artists[0].name
					}
				]
			}
		}

		collabTracks.push(collabTrack);
	}
	return collabTracks;
}

// Helper method to format tracks from tracks state into the array of custom track objects 
// that my collabPlaylist schema will use
const formatTracksFromTracks = (tracksArray) => {
	let collabTracks = [];

	for(let i = 0; i < tracksArray.length; i++){
		let collabTrack = {
			track: {
				name: tracksArray[i].track.name,
				uri: tracksArray[i].track.uri,
				artists: [
					{
						name: tracksArray[i].track.artists[0].name
					}
				]
			}
		}

		collabTracks.push(collabTrack);
	}
	return collabTracks;
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

export const deleteCollabTrack = (id, trackName) => {
	return async(dispatch, getState) => {
		const response = await axios.delete(uri + "/collabplaylists/" + id + "/tracks/" + trackName + "/delete");

		//instead of using type "DELETE_TRACKS" and needing to filter out tracks state just force a re-index with 
		//the response of our request, thus updating our tracks state without the deleted track
		dispatch({type: "INDEX_TRACKS", payload: response.data})

		history.push("/collabplaylists/" + id);
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

		dispatch({type: "INDEX_SEARCHTRACKS", payload: response.tracks.items});
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

export const startCollabMode = () => {
	return {type: "COLLAB_START", payload: true};
}

export const stopCollabMode = () => {
	return {type: "COLLAB_STOP", payload: false};
}

export const getCollabPlaylists = () => {
	return async (dispatch, getState) => {
		const response = await axios.get(uri + "/collabplaylists")
		dispatch({type: "INDEX_COLLAB_PLAYLISTS", payload: response.data});
		
		history.push("/collabplaylists");
	}
}

export const createCollabPlaylist = (formValues) => {
	return async (dispatch, getState) => {
		//packages up formvalues and userId into a body obj and passes it with post req
		const body = {
			name: formValues.name,
			description: formValues.description,
			collaborators: [getState().auth.userId]
		}

		const response = await axios.post(uri + "/collabplaylists", body);
		//takes response of request and updates redux store
		dispatch({type: "CREATE_COLLAB_PLAYLIST", payload: response.data});

		//do not redirect yet if called from share playlist in regular mode
		if(getState().collabMode){
			history.push("/collabplaylists");
		}
	}
}

export const updateCollabPlaylist = (id, formValues) => {
	return async (dispatch, getState) => {
		const response = await axios.patch(uri + "/collabplaylists/" + id, formValues);

		history.push("/collabplaylists");
	}

}

export const deleteCollabPlaylist = (id) => {
	return async (dispatch, getState) => {
		//delete request with id passed as param in url
		const response = await axios.delete(uri + "/collabplaylists/" + id + "/delete");

		dispatch({type: "DELETE_COLLAB_PLAYLIST", payload: id});

		history.push("/collabplaylists")
	}
}


