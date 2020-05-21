import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import AuthComponent from "./AuthComponent";
class Menu extends React.Component {
	renderUserMenu(){
		if(this.props.currUser){
			return(
				<Link to="/playlists" className="item">
					Playlists
				</Link>
			);
		}
	}

	render(){
		return (
			<div className="ui secondary pointing menu" style={{padding: "5px"}}>
  				<Link to="/" className=" active item">
					<i className="spotify icon"></i> SpotifyManager
				</Link>
				{this.renderUserMenu()}
  				<div className="right menu">
    				<AuthComponent/>
  				</div>
			</div>
		);
	}
}

function mapStateToProps(state){
	if(state.auth){
		return {
			currUser: state.auth.userId
		};
	}
}
export default connect(mapStateToProps)(Menu);