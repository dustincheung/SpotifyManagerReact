import React from "react";
import {connect} from "react-redux";


class AuthComponent extends React.Component{

	render(){
		const uri = process.env.REACT_APP_BACKEND_URI || 'http://localhost:5000';
		switch(this.props.auth){
			case null:
				return null; //still loading return nothing
			case false:
				const loginPath = uri + "/login";
				return <a className="ui teal button" href={loginPath}> sign into spotify </a>;
			default:
				const logoutPath = uri + "/api/logout";
				return <a className="ui teal button" href={logoutPath}> sign out </a>;
		}
	}
}

function mapStateToProps(state){
	return {auth: state.auth};
}

export default connect(mapStateToProps)(AuthComponent);