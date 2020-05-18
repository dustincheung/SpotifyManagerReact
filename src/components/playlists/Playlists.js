import React from "react";
import GridList from "../GridList";
import {connect} from "react-redux";
import {getPlaylists} from "../../actions"

class Playlists extends React.Component{

	render(){
		return(
			<div>
				<h1 className="ui header"> Hi {this.props.authId}, here are your playlists: </h1>
				<div> <GridList playlists={this.props.playlists}/> </div>
			</div>
		);
	}
}

function mapStateToProps(state){
	return {
		authId: state.auth.userId,
		playlists: state.playlists
	};
}

export default connect(mapStateToProps,{getPlaylists})(Playlists);