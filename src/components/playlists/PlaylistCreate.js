import React from "react";
import {connect} from "react-redux";

import {createPlaylist} from "../../actions";
import PlaylistForm from "./PlaylistForm";
import FormDisplayCard from "./FormDisplayCard";

class PlaylistCreate extends React.Component{
	
	onSubmit = (formValues) =>{
		this.props.createPlaylist(formValues); //calls action creator that will make post request
	}

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
}

export default connect(null,{createPlaylist})(PlaylistCreate);