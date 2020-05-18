import React from "react";
import {connect} from "react-redux";
import {getPlaylists} from "../../actions"

class Playlists extends React.Component{
	
	componentDidMount(){
		this.props.getPlaylists();
	}

	renderPlaylists = () => {
  		return(
  			<h3> render playlists here </h3>
  		);
	}

	render(){
		return(
			<div>
				<h1 className="ui header"> your playlists: </h1>
				<div> {this.renderPlaylists()} </div>
			</div>
		);
	}
}

export default connect(null,{getPlaylists})(Playlists);