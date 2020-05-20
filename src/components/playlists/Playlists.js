import React from "react";
import GridList from "../GridList";
import {connect} from "react-redux";

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
				<div>
					<h1 className="ui header">
						Playlists Page
					</h1>
    				<div>
    					<h3 className="ui header" style={{paddingBottom: "25px"}}>
    						Hi {this.props.authId}, you can view and manage your playlists here.
    					</h3>
    				</div>
  				</div>
  				<div> 
  					<GridList playlists={this.props.playlists}/> 
  				</div>
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