/*  
 *  PlaylistCreate renders FormDisplayCard and playlist form to create a new playlist
 */

import React from "react";
import {connect} from "react-redux";

import PlaylistForm from "./PlaylistForm";
import FormDisplayCard from "./FormDisplayCard";
import {createPlaylist, createCollabPlaylist} from "../../actions";

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
		if(!this.props.collabMode){
			this.props.createPlaylist(formValues); 
		}else{
			this.props.createCollabPlaylist(formValues); 
		}
		
	}
}

const mapStateToProps = (state) => {
	return{
		collabMode: state.collabMode
	};
}

export default connect(mapStateToProps,{createPlaylist, createCollabPlaylist})(PlaylistCreate);