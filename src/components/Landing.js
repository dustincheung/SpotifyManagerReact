import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import {getPlaylists} from "../actions";

class Landing extends React.Component {

	onButtonClick = () => {
		this.props.getPlaylists();
	}

	render(){
		
		if(this.props.authId){
			return(
				<div>
					<h1 className="ui header"> hello {this.props.authId}, </h1>
					<h2 className="ui header"> welcome to your playlist manager. </h2>
					<button className="ui button" onClick={this.onButtonClick}> check out your playlists </button>
				</div>
			);
		} else {
			return(
				<div>
					<h1 className="ui header"> welcome to playlist managager, </h1>
					<h2 className="ui header"> please sign in to manage your playlists. </h2>
				</div>
			);
		}
	}
}

function mapStateToProps(state){
	switch(state.auth){
		case null:
			return null;	
		default:
			return {authId: state.auth.userId};
	}
} 

export default connect(mapStateToProps,{getPlaylists})(Landing);