import axios from "axios";
import history from "../history";


export const getCurrUser = () => {

	return async (dispatch) => {
		const uri = process.env.REACT_APP_BACKEND_URI || 'http://localhost:5000';
		const response = await axios.get(uri + "/api/current_user");
		console.log("action creator payload:")
		console.log(response.data[0]);

		dispatch({type: "GET_CURR_USER", payload: response.data[0]});

		//history.push("/playlists"); //redirect to index page
	};
};