import React from "react";

import PlaylistCard from "./playlists/PlaylistCard";

class GridList extends React.Component{
  render(){
    let playlists = this.props.playlists;
    return (
      <div className="ui four cards">
       {playlists.map((playlist) =>
          <PlaylistCard playlist={playlist} key={playlist.id}/>
        )} 
      </div>
    );
  }
}

export default GridList;    