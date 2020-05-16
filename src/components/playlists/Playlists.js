import React from "react";

class Playlists extends React.Component{
	
	componentDidMount(){
		
	}

	renderPlaylists = () => {
  		return(
  			<h3> render playlists here </h3>
  		);
	}

	render(){
		return(
			<div>
				<h1 className="ui header"> your playlists: </h1>
				<div> {this.renderPlaylists()} </div>
			</div>
		);
	}

	getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
        	q = window.location.hash.substring(1);
        // eslint-disable-next-line
        while ( e = r.exec(q)) {
        	hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
    }
}

export default Playlists;