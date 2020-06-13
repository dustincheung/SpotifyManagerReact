/*  
 *  PlaylistShow renders the playlist card, playlist's tracks, and playlist operations buttons (edit, add tracks, share)
 */

import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
   
import PlaylistCard from "./PlaylistCard";
import TracksList from "../tracks/TracksList";
import {createPlaylist, createCollabPlaylist, getTracks, createTracks, createCollabTracks} from "../../actions";  

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
            <Link className="ui button" to={tracksCreatePath}>
              <i className="plus icon"></i>
              Add Tracks
            </Link>
            <Link className="ui button" to={playlistEditPath}>
              <i className="edit icon"></i>
              Edit Info
            </Link>
            {this.renderShareOrSaveButton()}
          </div>
        </div>
        <div className="eleven wide column">
          <TracksList tracks={tracks} type="SHOW" playlistId={!this.props.collabMode ? this.props.playlist.id : this.props.playlist._id}/>  
        </div>
      </div>
		);
	}

  renderShareOrSaveButton = () => {
    if(!this.props.collabMode){
      return(
        <button className="ui button" onClick={(event) => {this.onShareClick(event)}}>
          <i className="edit icon"></i>
          Share to Collaborate
        </button> 
      );
    }else{
      return(
        <button className="ui button" onClick={(event) => {this.onSaveClick(event)}}>
          <i className="save icon"></i>
          Save to your Playlists
        </button> 
      );
    }
  }

  //called when sharing an actual spotify playlist to a collabPlaylist, it consists of creating
  //collabPlaylist and adding tracks to this collabPlaylist
  onShareClick = async (event) => {
    await this.props.createCollabPlaylist({name: this.props.playlist.name, description: this.props.playlist.description});
    
    let collabPlaylists = this.props.collabPlaylists;
    await this.props.createCollabTracks(this.props.tracks, collabPlaylists[collabPlaylists.length -1]._id);
  }

  //called when saving a collabPlaylist to an actual spotify playlist, it consists of creating
  //spotify playlist and adding tracks to this spotify playlist
  onSaveClick = async (event) => {
    await this.props.createPlaylist({name: this.props.playlist.name, description: this.props.playlist.description});
    
    let playlists = this.props.playlists;
    await this.props.createTracks(this.props.tracks, playlists[playlists.length - 1].id);
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
    playlists: state.playlists,
    collabPlaylists: state.collabPlaylists,
    tracks: state.tracks,
    collabMode: state.collabMode
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

export default connect(mapStateToProps, {createPlaylist, createCollabPlaylist, getTracks, createTracks, createCollabTracks})(PlaylistShow);