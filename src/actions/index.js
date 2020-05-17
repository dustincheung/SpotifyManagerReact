import axios from "axios";
import history from "../history";


export const getCurrUser = () => {
	return async (dispatch) => {
		console.log("GET REQUEST:" + process.env.REACT_APP_BACKEND_URI + "/api/current_user");
		const response = await axios.get("/api/current_user");
		console.log("action creator payload:")
		console.log(response.data[0]);

		dispatch({type: "GET_CURR_USER", payload: response.data[0]});

		//history.push("/playlists"); //redirect to index page
	};
};