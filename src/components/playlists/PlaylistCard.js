/*  
 *  PlaylistCard component renders the synopsis card view of a playlist
 */

import React from "react";
import {connect} from "react-redux";

import {deletePlaylist} from "../../actions";
import history from "../../history";

class PlaylistCard extends React.Component {
	
	render(){
		if(!this.props.playlist){
			return(
				<div> LOADING </div>
			);
		}

		return(
			<a className="ui raised card" onClick={() => history.push("/playlists/" + this.props.playlist.id)}>
       	  		<div className="image">
       	  			{this.renderImage()}
          		</div>
          		<div className="content">
           		 <div className="header">{this.props.playlist.name}</div>
            		<div className="meta">
             		 <span className="date">{this.props.playlist.tracks.total} tracks</span>
            		</div>
            		{this.renderDescription()}
          		</div>
          		<div className="extra content">
            		{this.renderDelete()}
          		</div>
        	</a>
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
			return(
				<div className="description">
            		This is a {this.props.playlist.public ? "public" : "private"} playlist created by {this.props.playlist.owner.display_name}.
           		</div>
			);
		}
	}

	renderDelete = () => {
		if(this.props.currUser === this.props.playlist.owner.id){
			return(
				<button className="ui button" onClick={(event) => this.onDeleteClick(event) } style={{backgroundColor: "white", float: "right"}}>
              		<i className="trash alternate icon"></i>
            	</button>
			);
		} 
	}

	renderImage =() => {
		if(this.props.playlist.images[0]){
			return(
				<img src={this.props.playlist.images[0].url} alt=""/>
			);
		}

		return(
			<img src="/musicicon.png" alt=""/>
		);
	}

	onDeleteClick = (event) => {
		event.stopPropagation();
		this.props.deletePlaylist(this.props.playlist.id)
	}
};

const mapStateToProps = (state) => {
	return{
		currUser: state.auth.userId
	};
}

export default connect(mapStateToProps,{deletePlaylist})(PlaylistCard);