/*  
 *  PlaylistCard component renders the synopsis card view of a playlist
 */

import React from "react";
import {connect} from "react-redux";

import {deletePlaylist, deleteCollabPlaylist} from "../../actions";
import history from "../../history";

class PlaylistCard extends React.Component {
	
	render(){
		if(!this.props.playlist){
			return(
				<div> LOADING </div>
			);
		}

		return(
			<a className="ui raised card" onClick={this.handleClick}>
       	  		<div className="image">
       	  			{this.renderImage()}
          		</div>
          		<div className="content">
           		 <div className="header">{this.props.playlist.name}</div>
            		<div className="meta">
             		 <span className="date">{!this.props.collabMode ? this.props.playlist.tracks.total : this.props.playlist.tracks.length} tracks</span>
            		</div>
            		{this.renderDescription()}
          		</div>
          		<div className="extra content">
            		{this.renderDelete()}
          		</div>
        	</a>
		);
	}

	handleClick = () => {
		if(!this.props.collabMode){
			history.push("/playlists/" + this.props.playlist.id);
		}else{
			history.push("/collabplaylists/" + this.props.playlist._id);
		}
	}

	//for regular playlists, renders img if available and for collab playlists will render generic img
	renderImage = () => {
		if(!this.props.collabMode && this.props.playlist.images[0]){
			return(
				<img src={this.props.playlist.images[0].url} alt=""/>
			);
		}

		return(
			<img src="/musicicon.png" alt=""/>
		);
	}

	renderDescription = () => {
		if(this.props.playlist.description){
			return(
				<div className="description">
            		{this.props.playlist.description}
            	</div>
			);
		}else{
			if(!this.props.collabMode){
				return(
					<div className="description">
            			This is a {this.props.playlist.public ? "public" : "private"} playlist created by {this.props.playlist.owner.display_name}.
           			</div>
				);	
			}
		}
	}

	renderDelete = () => {
		if(!this.props.collabMode && this.props.currUser === this.props.playlist.owner.id){
			return(
				<button className="ui button" onClick={(event) => this.onDeleteClick(event) } style={{backgroundColor: "white", float: "right"}}>
              		<i className="trash alternate icon"></i>
            	</button>
			);
		}else if(this.props.collabMode && this.checkCollab(this.props.currUser)){
			return(
				<button className="ui button" onClick={(event) => this.onDeleteClick(event) } style={{backgroundColor: "white", float: "right"}}>
              		<i className="trash alternate icon"></i>
            	</button>
			);
		}
	}

	//checks collaborators array in collab playlist for ownership
	checkCollab = (currUser) => {
		let collaborators = this.props.playlist.collaborators;

		if(collaborators[0] === currUser){
			return true;
		}

		return false;
	}

	onDeleteClick = (event) => {
		event.stopPropagation();
		if(!this.props.collabMode){
			this.props.deletePlaylist(this.props.playlist.id);
		}else{
			this.props.deleteCollabPlaylist(this.props.playlist._id);
		}
		
	}
};

const mapStateToProps = (state) => {
	return{
		currUser: state.auth.userId,
		collabMode: state.collabMode
	};
}

export default connect(mapStateToProps,{deletePlaylist, deleteCollabPlaylist})(PlaylistCard);