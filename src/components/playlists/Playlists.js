/*	
 * 	Playlist component displays the playlist page for the current user
 */

import React from "react";
import PlaylistGrid from "./PlaylistGrid";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import {getCurrUser, getPlaylists, createPlaylist} from "../../actions";

class Playlists extends React.Component{
	async componentDidMount(){				//async await is used to ensure access token is set in auth state
		await this.props.getCurrUser();		//before attempting to use it in spotify api request in getPlaylist
		this.props.getPlaylists();											
	}

	render(){
		if(!this.props.playlists){
			return <div>LOADING</div>;
		}

		return(
			<div>
  				<div className="ui grid">
  					<div className="thirteen wide column">
  						<h1 className="display-5" >
							Playlists Page
						</h1>
    					<div>
    						<p className="lead" style={{paddingBottom: "1.2em", fontSize: "1.5em"}}>
    							Hi {this.props.authId}, you can view and manage your playlists here.
    						</p>
    					</div>
  					</div>
 					<div className="three wide column">
 						<Link className="ui vertical animated button" style={{float: "right", marginTop: "2.5em"}} to="/playlists/new">
  							<div className="hidden content">
  								<i className="plus icon"></i>
  							</div>
  							<div className="visible content">
    							create a playlist
  							</div>
						</Link>
 					</div>
				</div>
  				<div> 
  					<PlaylistGrid playlists={this.props.playlists}/> 
  				</div>
			</div>
			
		);
	}
}

const mapStateToProps = (state) => {
	if(state.auth){
		return {
			authId: state.auth.userId,
			playlists: state.playlists
		};	
	}else{
		return {
			authId: null
		};
	}
}

export default connect(mapStateToProps, {getCurrUser, getPlaylists, createPlaylist})(Playlists);