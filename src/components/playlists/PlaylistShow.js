import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import {getTracks} from "../../actions";              //action creator
import PlaylistCard from "./PlaylistCard";
import TracksList from "../tracks/TracksList";

class PlaylistShow extends React.Component{
	componentDidMount(){	
    this.props.getTracks(this.props.playlist);
	}

	render(){
    if(!this.props.tracks || !this.props.playlist){
      return(
        <div> LOADING </div>
      )
    }

    let tracks = this.props.tracks;
    let tracksCreatePath = this.props.playlist.id + "/tracks/new";

		return(
      <div className="ui grid">
        <div className="five wide column">
          <PlaylistCard playlist={this.props.playlist}/>
          <div className="ui vertical labeled icon buttons" style={{width: "90%"}}>
            <Link className="ui button">
              <i className="edit icon"></i>
              Edit Info
            </Link>
            <Link className="ui button" to={tracksCreatePath}>
              <i className="plus icon"></i>
              Add Tracks
            </Link>
           <Link className="ui button">
              <i className="edit icon"></i>
              Share
            </Link>
          </div>
        </div>
        <div className="eleven wide column">
          <TracksList tracks={tracks} type="SHOW" playlistId={this.props.playlist.id}/>
        </div>
      </div>
		);
	}
}

function search(idKey, array){
	for(var i = 0; i < array.length; i++){
		if(array[i].id === idKey){
			return array[i];
		}
	}
}

function mapStateToProps(state, ownProps){
	const currPlaylist = search(ownProps.match.params.id, state.playlists);
	return {
    playlist: currPlaylist,
    tracks: state.tracks
  }
}

export default connect(mapStateToProps, {getTracks})(PlaylistShow);