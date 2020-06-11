/*  
 *  PlaylistEdit renders form to allow a user to update the playlist and also displays dynamically changing FormDisplayCard
 */

import React from "react";
import {connect} from "react-redux";

import PlaylistForm from "./PlaylistForm";
import FormDisplayCard from "./FormDisplayCard";
import {updatePlaylist, updateCollabPlaylist} from "../../actions";

class PlaylistEdit extends React.Component{
	render(){
		if(!this.props.playlist){
			return(
				<div> LOADING </div>
			);
		}

		return(
			<div className="ui grid">
        		<div className="five wide column">
          			<FormDisplayCard playlist={this.props.playlist}/>
        		</div>
        		<div className="eleven wide column">
          			<div>
						<h3> Edit a Playlist: </h3>
						<PlaylistForm onSubmit={this.onSubmit} initialValues={{name: this.props.playlist.name, description: this.props.playlist.description}}/>
					</div>
        		</div>
      		</div>
		);
	}

	onSubmit = (formValues) =>{
		if(!this.props.collabMode){
			this.props.updatePlaylist(this.props.playlist.id, formValues);
		}else{
			this.props.updateCollabPlaylist(this.props.playlist._id, formValues);
		}
		
	}
}

const mapStateToProps = (state, ownProps) => {
	let currPlaylist;

	if(!state.collabMode){
		currPlaylist = findPlaylist(ownProps.match.params.id, state.playlists);
	}else{
		currPlaylist = findCollabPlaylist(ownProps.match.params.id, state.collabPlaylists);
	}
	
	return{
		playlist: currPlaylist,
		collabMode: state.collabMode
	}
}

const findPlaylist = (idKey, array) => {
	for(var i = 0; i < array.length; i++){
		if(array[i].id === idKey){
			return array[i];
		}
	}
}

const findCollabPlaylist = (idKey, array) => {
	for(var i = 0; i < array.length; i++){
		if(array[i]._id === idKey){
			return array[i];
		}
	}
}
export default connect(mapStateToProps, {updatePlaylist, updateCollabPlaylist})(PlaylistEdit);