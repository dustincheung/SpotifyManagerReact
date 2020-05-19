import React from "react";
import {Link} from "react-router-dom";

import AuthComponent from "./AuthComponent";
const Menu = () => {
	return (

		<div className="ui secondary pointing menu" style={{padding: "5px"}}>
  			<Link to="/" className=" active item">
				SpotifyManager
			</Link>
  			<div className="right menu">
    			<AuthComponent/>
  			</div>
		</div>
	);
};

export default Menu;