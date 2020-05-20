import React from "react";

import history from "../../history";

const TrackCard = (props) => {
	return(
		<a className="ui raised card" onClick={() => history.push("/playlists/" + props.playlist.id)}>
       	  <div className="image">
            <img src={props.playlist.images[0].url} alt=""/>
          </div>
          <div className="content">
            <div className="header">{props.playlist.name}</div>
            <div className="meta">
              <span className="date">{props.playlist.tracks.total} tracks</span>
            </div>
            <div className="description">
              This is a {props.playlist.public ? "public" : "private"} playlist created by {props.playlist.owner.display_name}.
            </div>
          </div>
          <div className="extra content">
            <button className="fluid ui button" style={{backgroundColor: "white"}}>
              <i className="trash alternate icon"></i>
              Delete this playlist
            </button>
          </div>
        </a>
	);
};

export default TrackCard;
