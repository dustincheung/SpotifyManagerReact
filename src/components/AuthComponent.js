import React from "react";
import {connect} from "react-redux";


class AuthComponent extends React.Component{

	render(){
		switch(this.props.auth){
			case null:
				return null; //still loading return nothing
			case false:
				return <a className="ui teal button" href="/login"> sign into spotify </a>;
			default:
				return <a className="ui teal button" href="/api/logout"> sign out </a>;
		}
	}
}

function mapStateToProps(state){
	return {auth: state.auth};
}

export default connect(mapStateToProps)(AuthComponent);