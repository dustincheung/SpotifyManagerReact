//file where we combine reducers
import {combineReducers} from "redux";

import authReducer from "./authReducer";

export default combineReducers({
	auth: authReducer
});