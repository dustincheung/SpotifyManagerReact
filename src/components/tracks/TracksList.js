import React from "react";
import {connect} from "react-redux";

import {deleteTrack, createAddTracks, deleteSearchTrack, deleteAddTrack, createSearchTrack} from "../../actions";

class TracksList extends React.Component{
	//let tracksToAdd = [];								TODO: WHERE CAN I DECLARE VARS IN JS CLASS??????

	search = (idKey, array) =>{
		for(var i = 0; i < array.length; i++){
			if(array[i].id === idKey){
				return array[i];
			}
		}
	}

	modifyArray = (id) => {	
		if(this.props.type === "SEARCH_ADD"){
			const trackToAdd = this.search(id, this.props.searchTracks);
			this.props.createAddTracks(trackToAdd);	//add to right col (addTracks)
			this.props.deleteSearchTrack(id);       //but also remove from left col (searchTracks)
		}else{
			const trackToDelete = this.search(id, this.props.addTracks);
			
			this.props.deleteAddTrack(id);
			this.props.createSearchTrack(trackToDelete);
		}
	}

	renderButton = (id) => {
		if(this.props.type === "SEARCH_ADD"){	//track list that appears in the tracks create (search track feature left col)
 			return(
 				<div className="tiny ui animated button" onClick={() => this.modifyArray(id)} style={{float: "right"}}>
   					<div className="visible content">
   						<i className="plus icon"></i>
   					</div>
   					<div className="hidden content">
     					add
   					</div>
 				</div>
 			);
 		}else{	//track list that appears in the tracks create (search track feature right col)				
 			return(
 				<div className="tiny ui animated button" onClick={() => this.modifyArray(id)} style={{float: "right"}}>
   					<div className="visible content">
   						<i className="minus icon"></i>
   					</div>
   					<div className="hidden content">
     					delete
   					</div>
 				</div>
 			);
 		}
	}

	renderSearch = () => {
		if(this.props.tracks){
			return(
				this.props.tracks.map((track) =>
                	<div className="item" key={track.id}>
                  		<div className="content">
                    		<div className="header">{track.name}</div>
                    		By {track.artists[0].name}
                    		{this.renderButton(track.id)}
                  		</div>
                	</div>
            	)
			);
		}
	}

	renderShow = () => {
		if(this.props.tracks){
			return(
				this.props.tracks.map((track) =>
                	<div className="item" key={track.track.id}>
                  		<div className="content">
                    		<div className="header">{track.track.name}</div>
                    		By {track.track.artists[0].name}
                    		<div className="tiny ui animated button" onClick={() => this.props.deleteTrack(track.track.id, track.track.uri, this.props.playlistId)} style={{float: "right"}}>
   								<div className="visible content">
   									<i className="minus icon"></i>
   								</div>
   								<div className="hidden content">
     								delete
   								</div>
 							</div>
                  		</div>
                	</div>
            	)
			);
		}
	}

	render(){
		return(
			<div className="ui segment">
            	<div className="ui relaxed divided list">
              	{this.props.type === "SHOW" ? this.renderShow() : this.renderSearch()}
            	</div>
         	</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		//playlistId: ownProps.match.params.id, 
		searchTracks: state.searchTracks,
		addTracks: state.addTracks
	};
}
export default connect(mapStateToProps, {deleteTrack, createAddTracks, deleteSearchTrack, deleteAddTrack, createSearchTrack})(TracksList);