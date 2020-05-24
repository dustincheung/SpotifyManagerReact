/*  
 *  PlaylistCreate renders FormDisplayCard and playlist form to create a new playlist
 */

import React from "react";
import {connect} from "react-redux";

import PlaylistForm from "./PlaylistForm";
import FormDisplayCard from "./FormDisplayCard";
import {createPlaylist} from "../../actions";

class PlaylistCreate extends React.Component{

	render(){
		return(
			<div className="ui grid">
        		<div className="five wide column">
          			<FormDisplayCard/>
        		</div>
        		<div className="eleven wide column">
          			<div>
						<h3> Create a Playlist </h3>
						<PlaylistForm onSubmit={this.onSubmit}/>
					</div>
        		</div>
      		</div>
		);
	}

	onSubmit = (formValues) =>{
		this.props.createPlaylist(formValues); //calls action creator that will make post request
	}
}

export default connect(null,{createPlaylist})(PlaylistCreate);