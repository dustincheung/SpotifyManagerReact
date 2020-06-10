/*  
 *  PlaylistShow renders the playlist card, playlist's tracks, and playlist operations buttons (edit, add tracks, share)
 */

import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
   
import PlaylistCard from "./PlaylistCard";
import TracksList from "../tracks/TracksList";
import {getTracks} from "../../actions";  

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
    let tracksCreatePath;
    let playlistEditPath ;
    
    if(!this.props.collabMode){
      tracksCreatePath = this.props.playlist.id + "/tracks/new";
      playlistEditPath = this.props.playlist.id + "/edit";
    }else{
      tracksCreatePath = this.props.playlist._id + "/tracks/new";
      playlistEditPath = this.props.playlist._id + "/edit";
    }

		return(
      <div className="ui grid">
        <div className="five wide column">
          <PlaylistCard playlist={this.props.playlist}/>
          <div className="ui vertical labeled icon buttons" style={{width: "90%"}}>
            <Link className="ui button" to={playlistEditPath}>
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

const searchForPlaylist = (idKey, array) => {
	for(var i = 0; i < array.length; i++){
		if(array[i].id === idKey){
			return array[i];
		}
	}
}

const searchForCollabPlaylist = (idKey, array) => {
  for(var i = 0; i < array.length; i++){
    if(array[i]._id === idKey){
      return array[i];
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  let currPlaylist;

  if(!state.collabMode){
    currPlaylist = searchForPlaylist(ownProps.match.params.id, state.playlists);
  }else{
    currPlaylist = searchForCollabPlaylist(ownProps.match.params.id, state.collabPlaylists);
  }
	
	return {
    playlist: currPlaylist,
    tracks: state.tracks,
    collabMode: state.collabMode
  }
}

export default connect(mapStateToProps, {getTracks})(PlaylistShow);