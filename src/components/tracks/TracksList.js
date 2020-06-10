/*  
 *  TracksList renders list that displays tracks with different action buttons dependent on which 
 *  parent component calls it.  PlaylistShow shows TracksList with minus buttons and affects tracks state.
 *  TracksCreate (search page) shows TracksList with plus buttons for searchTracks state on left side, and 
 *  another TracksLisft for addTracks with a minus button on the right side.
 */

import React from "react";
import {connect} from "react-redux";

import {deleteTrack, createAddTracks, deleteSearchTrack, deleteAddTrack, createSearchTrack} from "../../actions";

class TracksList extends React.Component{
	render(){			//render either list for PlaylistShow or list for TracksCreate (search page)
		return(
			<div className="ui segment">
            	<div className="ui relaxed divided list">
              	{this.props.type === "SHOW" ? this.renderShow() : this.renderSearch()}
            	</div>
         	</div>
		);
	}

	renderShow = () => {						//for PlaylistShow page
		if(this.props.tracks.length !== 0){
			return(
				this.props.tracks.map((track) =>

                	<div className="item" key={this.props.collabMode ? track._id : track.track.id}>
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
		}else{
			return(
				<p className="lead" style={{paddingBottom: ".1em", fontSize: "1em"}}>
    				This playlist does not have any tracks yet! If you want to, add some tracks using the button to the left. 
    			</p>
			);
		}
	}

	renderSearch = () => {						//for TracksCreate page where buttons may vary for searchTracks vs. addTracks
		if(this.props.tracks.length !== 0){
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
		}else{
			return(
				<p className="lead" style={{paddingBottom: ".1em", fontSize: "1em"}}>
    				This playlist does not have any tracks yet! If you want to, add some tracks using the button to the left.
    			</p>
			);
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

	modifyArray = (id) => {		//handles state modification behaivor based on type prop of list
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

	search = (idKey, array) =>{
		for(var i = 0; i < array.length; i++){
			if(array[i].id === idKey){
				return array[i];
			}
		}
	}
}

const mapStateToProps = (state, ownProps) => {
	return { 
		searchTracks: state.searchTracks,
		addTracks: state.addTracks,
		collabMode: state.collabMode
	};
}

export default connect(mapStateToProps, {deleteTrack, createAddTracks, deleteSearchTrack, deleteAddTrack, createSearchTrack})(TracksList);