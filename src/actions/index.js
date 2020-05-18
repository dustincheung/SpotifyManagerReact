import axios from "axios";
import history from "../history";
import hashParams from "../utils/hashParams";
import Spotify from 'spotify-web-api-js';

// Action creator that handles setting the auth state. 
// Auth userId comes from db, access tokens come from URL params.
export const getCurrUser = () => {
	return async (dispatch) => {
		const uri = process.env.REACT_APP_BACKEND_URI || 'http://localhost:5000';
		const response = await axios.get(uri + "/api/current_user");
		const params = hashParams();

		let authStateData;
		if(!response.data[0]){							//if there is no user currently in database auth state is false
			authStateData = false;
		}else{
			authStateData = {
				userId: response.data[0].userId,
				accessToken: params.access_token,
				refreshToken: params.refresh_token 
			}
		}

		console.log(authStateData);

		dispatch({type: "GET_CURR_USER", payload: authStateData});

		//history.push("/playlists"); //redirect to index page
	};
};

export const getPlaylists = () => {
	return async (dispatch, getState) => {
		const spotifyWebApi = new Spotify();
		spotifyWebApi.setAccessToken(getState().auth.accessToken);
		const response = await spotifyWebApi.getUserPlaylists(getState().auth.userId, {limit: 50});		
		console.log("RESPONSE");
		console.log(response);
		dispatch({type: "INDEX_PLAYLISTS", payload: response.items});

		history.push("/playlists"); //redirect to index page ONLY after playlists state has been set
	};
};