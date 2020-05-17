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
}

export default Playlists;