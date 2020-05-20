import React from "react";
import {connect} from "react-redux";

import {deletePlaylist} from "../../actions";
import history from "../../history";

class TrackCard extends React.Component {
	
	renderDelete(){
		console.log(this.props.currUser + "=" + this.props.playlist.owner.id);
		if(this.props.currUser === this.props.playlist.owner.id){
			return(
				<button className="fluid ui button" onClick={() => this.props.deletePlaylist(this.props.playlist.id)} style={{backgroundColor: "white"}}>
              		<i className="trash alternate icon"></i>
              		Delete this playlist
            	</button>
			);
		} 
	}

	render(){
		if(!this.props.playlist){
			return(
				<div> LOADING </div>
			);
		}

		return(
			<a className="ui raised card" onClick={() => history.push("/playlists/" + this.props.playlist.id)}>
       	  		<div className="image">
            		<img src={this.props.playlist.images[0].url} alt=""/>
          		</div>
          		<div className="content">
           		 <div className="header">{this.props.playlist.name}</div>
            		<div className="meta">
             		 <span className="date">{this.props.playlist.tracks.total} tracks</span>
            		</div>
            		<div className="description">
            		  This is a {this.props.playlist.public ? "public" : "private"} playlist created by {this.props.playlist.owner.display_name}.
            		</div>
          		</div>
          		<div className="extra content">
            		{this.renderDelete()}
          		</div>
        	</a>
		);
	}
};

const mapStateToProps = (state) => {
	return{
		currUser: state.auth.userId
	};
}

export default connect(mapStateToProps,{deletePlaylist})(TrackCard);
