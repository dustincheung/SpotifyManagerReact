/*  
 *  FormDisplayCard renders the dynamically changing playlist card as the user edits formvalues
 */

import React from "react";
import {connect} from "react-redux";

class FormDisplayCard extends React.Component {
	render(){
		if(!this.props.form){
			return(
				<div> LOADING </div>
			);
		}

		return(
			<a className="ui raised card">
       	  		<div className="image">
       	  			{this.renderImage()}
          		</div>
          		<div className="content">
           		 <div className="header">{this.renderName()}</div>
            		<div className="description">
            		  {this.renderDescription()}
            		</div>
          		</div>
        	</a>
		);
	}

	renderImage = () => {
		if(!this.props.collabMode && this.props.playlist && this.props.playlist.images.length !== 0){
			return(
				<img src={this.props.playlist.images[0].url} alt=""/>
			);
		}else{
			return(
				<img src="/musicicon.png" alt=""/>
			);
		}
	}
	
	renderName = () => {
		if(this.props.form.values && this.props.form.values.name){
			return this.props.form.values.name;
		}

		return "Playlist Name";
	}

	renderDescription = () => {
		if(this.props.form.values && this.props.form.values.description){
			return this.props.form.values.description;
		}

			return "Playlist Description";
	}
};

const mapStateToProps = (state) => {
	return{
		form: state.form.PlaylistForm,
		collabMode: state.collabMode
	};
}

export default connect(mapStateToProps)(FormDisplayCard);