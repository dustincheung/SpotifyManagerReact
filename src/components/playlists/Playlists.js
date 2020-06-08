/*	
 * 	Playlist component displays the playlist page for the current user
 */

import React from "react";
import PlaylistGrid from "./PlaylistGrid";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import {getCurrUser, getPlaylists, createPlaylist, getCollabPlaylists} from "../../actions";

class Playlists extends React.Component{
	async componentDidMount(){				//async await is used to ensure access token is set in auth state
		await this.props.getCurrUser();		//before attempting to use it in spotify api request in getPlaylist
		
		if(!this.props.collab){
			this.props.getPlaylists();
		}else{
			this.props.getCollabPlaylists();
		}										
	}

	render(){
		if(!this.props.playlists){
			return <div>LOADING</div>;
		}

		return(
			<div>
  				<div className="ui grid">
  					{this.renderHeading()}
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
  					{this.renderGrid()}
  				</div>
			</div>
			
		);
	}

	//renders different heading based on if its spotify playlist or collab playlists page
	renderHeading = () => {
		if(!this.props.collab){
			return(
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
			);
		}else{
			return(
				<div className="thirteen wide column">
  					<h1 className="display-5" >
						Collab Playlists Page
					</h1>
    				<div>
    					<p className="lead" style={{paddingBottom: "1.2em", fontSize: "1.5em"}}>
    						Hi {this.props.authId}, you can collaborate on playlists here!
    					</p>
    				</div>
  				</div>
			);
		}		
	}

	//renders different grid based on if its spotify playlist or collab playlists page
	renderGrid = () => {
		if(!this.props.collab){
			return(
				<PlaylistGrid playlists={this.props.playlists} collab={false}/>
			);
		}else{
			return(
				<PlaylistGrid playlists={this.props.collabPlaylists} collab={true}/>
			);
		}
	}
}

const mapStateToProps = (state) => {
	if(state.auth){
		return {
			authId: state.auth.userId,
			playlists: state.playlists,
			collabPlaylists: state.collabPlaylists
		};	
	}else{
		return {
			authId: null
		};
	}
}

export default connect(mapStateToProps, {getCurrUser, getPlaylists, createPlaylist, getCollabPlaylists})(Playlists);