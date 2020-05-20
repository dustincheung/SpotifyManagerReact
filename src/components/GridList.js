import React from "react";

import TrackCard from "./tracks/TrackCard";

class GridList extends React.Component{
  render(){
    let playlists = this.props.playlists;
    return (
      <div className="ui four cards">
       {playlists.map((playlist) =>
          <TrackCard playlist={playlist} key={playlist.id}/>
        )} 
      </div>
    );
  }
}

export default GridList;    