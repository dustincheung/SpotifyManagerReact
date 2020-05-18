import React from "react";
import GridList from "../GridList";
import {connect} from "react-redux";
import {getPlaylists} from "../../actions"

class Playlists extends React.Component{
	
	componentDidMount(){
		this.props.getPlaylists();
	}

	render(){
		return(
			<div>
				<h1 className="ui header"> Hi {this.props.authId}, here are your playlists: </h1>
				<div> <GridList/> </div>
			</div>
		);
	}
}

function mapStateToProps(state){
	return {authId: state.auth.userId};
}

export default connect(mapStateToProps,{getPlaylists})(Playlists);