import React from "react";
import {connect} from "react-redux";

class FormDisplayCard extends React.Component {

	renderName(){
		if(this.props.form.values && this.props.form.values.name){
			return this.props.form.values.name;
		}

		return "Playlist Name";
	}

	renderDescription(){
		if(this.props.form.values && this.props.form.values.description){
			return this.props.form.values.description;
		}

			return "Playlist Description";
	}

	render(){
		if(!this.props.form){
			return(
				<div> LOADING </div>
			);
		}

		return(
			<a className="ui raised card">
       	  		<div className="image">
       	  			<img src="/musicicon.png" alt=""/>
          		</div>
          		<div className="content">
           		 <div className="header">{this.renderName()}</div>
            		<div className="meta">
             		 <span className="date"> 0 tracks </span>
            		</div>
            		<div className="description">
            		  {this.renderDescription()}
            		</div>
          		</div>
        	</a>
		);
	}
};

const mapStateToProps = (state) => {
	return{
		form: state.form.PlaylistForm
	};
}

export default connect(mapStateToProps)(FormDisplayCard);