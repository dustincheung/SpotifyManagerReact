/*  
 *  PlaylistGrid component renders the row of PlaylistCard components
 */

import React from "react";

import PlaylistCard from "./PlaylistCard";

class PlaylistGrid extends React.Component{
  render(){
    let playlists = this.props.playlists;
    return (
      <div className="ui four cards">
       {playlists.map((playlist) =>
          <PlaylistCard playlist={playlist} key={playlist.id} collab={this.props.collab}/>
        )} 
      </div>
    );
  }
}

export default PlaylistGrid;    