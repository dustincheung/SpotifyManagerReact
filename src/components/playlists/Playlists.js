import React from "react";
import GridList from "../GridList";
import {connect} from "react-redux";
import { Header } from 'semantic-ui-react';

import {getPlaylists} from "../../actions";

class Playlists extends React.Component{
	componentDidMount(){	
		this.props.getPlaylists();											
	}

	render(){
		return(
			<div>
				<Header as='h1'>
    				Playlists Page
    				<Header.Subheader>
      					Hi {this.props.authId}, you can view and manage your playlists here.
      				</Header.Subheader>
  				</Header>
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

export default connect(mapStateToProps, {getPlaylists})(Playlists);