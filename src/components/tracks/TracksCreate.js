/*  
 *  TracksCreate renders the TracksForm search input, searchTracks track list, and addTracks track list.
 * 	This is the component that allows a user to continually modify (add or remove) the tracks that a user wishes
 *  to add.
 */

import React from "react";
import {connect} from "react-redux";

import TracksForm from "./TracksForm";
import TracksList from "./TracksList";
import {getSearchTracks, createTracks, clearSearchAddTracks} from "../../actions";

class TracksCreate extends React.Component{
	
	render(){
		return(
			<div className="ui grid">
    			<div className="sixteen wide column">
    				<TracksForm onChange={this.onChange}/>
    			</div>
  				<div className="eight wide column">
  					{this.renderSearchTracks()}
  				</div>
  				<div className="eight wide column">
  					{this.renderAddTracks()}
  				</div>
			</div>
		);
	}

	onChange = (formValues) => {
		if(formValues){
			this.props.getSearchTracks(formValues);
		}
	}

	renderSearchTracks = () => {
		if(this.props.searchTracks.length !== 0){
			return(
				<div>
					<p className="lead" style={{paddingBottom: ".1em", fontSize: "1em"}}>
    				search results: 
    				</p>
  					<TracksList tracks={this.props.searchTracks} type="SEARCH_ADD"/>
				</div>
			);
		}
	}

	renderAddTracks = () => {
		if(this.props.addTracks.length !== 0){
			return(
				<div>
					<p className="lead" style={{paddingBottom: ".1em", fontSize: "1em"}}>
    					tracks to be added: 
    				</p>
  					<TracksList tracks={this.props.addTracks} type="SEARCH_DELETE"/>
  					<button className="fluid ui button" onClick={this.onButtonClick}>add tracks</button>
				</div>
			);
		}
	}

	onButtonClick = () => {
		//need to pull an array of uri's out of the array of track objects b/c that is what spotify api requires
		const trackUriArrays = this.getUriArray(this.props.addTracks);
		this.props.createTracks(trackUriArrays, this.props.playlistId);
		this.props.clearSearchAddTracks();	//ensures that we clear searchTracks and addTracks before a new search
	}

	getUriArray = (array) => {
		let uriArray = [];
		for(var i =0; i < array.length; i++){
			uriArray.push(array[i].uri);
		}

		return uriArray;
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		playlistId: ownProps.match.params.id,	//current playlist (that is gettin tracks added to) pulled from url path
		searchTracks: state.searchTracks,		//tracks found from spotify api search request
		addTracks: state.addTracks              //tracks that wish to be added by the user
	};
}

export default connect(mapStateToProps, {getSearchTracks, createTracks, clearSearchAddTracks})(TracksCreate);