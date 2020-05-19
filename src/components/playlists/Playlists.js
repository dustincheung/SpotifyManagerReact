import React from "react";
import GridList from "../GridList";
import {connect} from "react-redux";
import { Header } from 'semantic-ui-react';

import {getCurrUser} from "../../actions";
import {getPlaylists} from "../../actions";

class Playlists extends React.Component{
	async componentDidMount(){								//async await is used to ensure access token is set in auth state
		await this.props.getCurrUser();						//before attempting to use it in spotify api request in getPlaylist
		this.props.getPlaylists();											
	}

	render(){
		if(!this.props.playlists){
			return <div>LOADING</div>;
		}

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
	if(state.auth){
		return {
			authId: state.auth.userId,
			playlists: state.playlists
		};	
	}else{
		return null;
	}
}

export default connect(mapStateToProps, {getCurrUser, getPlaylists})(Playlists);