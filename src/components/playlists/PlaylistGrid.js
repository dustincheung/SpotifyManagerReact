/*  
 *  PlaylistGrid component renders the row of PlaylistCard components
 */

import React from "react";
import {connect} from "react-redux";

import PlaylistCard from "./PlaylistCard";

class PlaylistGrid extends React.Component{
  render(){
    let playlists = this.props.playlists;
    return (
      <div className="ui four cards">
       {playlists.map((playlist) =>
          <PlaylistCard playlist={playlist} key={this.props.collabMode ? playlist._id : playlist.id}/>
        )} 
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    collabMode: state.collabMode
  };
}

export default connect(mapStateToProps)(PlaylistGrid);    