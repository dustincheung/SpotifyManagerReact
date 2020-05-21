import React from "react";
import {connect} from "react-redux";

import {getTracks} from "../../actions";              //action creator
import PlaylistCard from "./PlaylistCard";

class PlaylistShow extends React.Component{
	componentDidMount(){	
    this.props.getTracks(this.props.playlist);
	}

	render(){
    if(!this.props.tracks){
      return(
        <div> LOADING </div>
      )
    }

    let tracks = this.props.tracks;

		return(
      <div className="ui grid">
        <div className="five wide column">
          <PlaylistCard playlist={this.props.playlist}/>
        </div>
        <div className="eleven wide column">
          <div className="ui segment">
            <div className="ui relaxed divided list">
              {tracks.map((track) =>
                <div className="item" key={track.track.id}>
                  <div className="content">
                    <div className="header">{track.track.name}</div>
                    By {track.track.artists[0].name}
                  </div>
                </div>
              )}
              <div className="item">
                <div className="ui vertical fluid animated button">
                  <div className="hidden content"> add track</div>
                  <div className="visible content">
                    <i className="plus icon"></i>
                  </div>      
                </div>          
              </div>
            </div>
          </div>
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