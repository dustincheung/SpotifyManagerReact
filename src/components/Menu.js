/*	
 * 	Menu Component that is always visible and routes to landing and playlists component
 */

import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import AuthComponent from "./AuthComponent";
import {startCollabMode, stopCollabMode} from "../actions";

class Menu extends React.Component {
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

	renderUserMenu = () => {
		if(this.props.currUser){
			return(
				<div>
					<Link to="/playlists" onClick={this.props.stopCollabMode} className="item" style={{float: "left"}}>
						Playlists
					</Link>
					<Link to="/collabplaylists" onClick={this.props.startCollabMode} className="item">
						Collaborate
					</Link>
				</div>
			);
		}
	}
}

const mapStateToProps = (state) => {
	if(state.auth){
		return {
			currUser: state.auth.userId
		};
	}else{
		return {
			currUser: null
		};
	}
}

export default connect(mapStateToProps, {startCollabMode, stopCollabMode})(Menu);