/*
 *	React component that requests express server backend login path.  This will trigger OAuth backend
 *  flow to begin.  It also determines wheter to show "sign in" or "sign out" based on auth state
 */
 
import React from "react";
import {connect} from "react-redux";


class AuthComponent extends React.Component{

	render(){
		const uri = process.env.REACT_APP_BACKEND_URI || 'http://localhost:5000';
		switch(this.props.auth){
			case null:
			case false:
				const loginPath = uri + "/login";
				return <a className="ui teal button" href={loginPath}> sign into spotify </a>;
			default:
				const logoutPath = uri + "/api/logout";
				return <a className="ui teal button" href={logoutPath}> sign out </a>;
		}
	}
}

const mapStateToProps = (state) => {
	return {auth: state.auth};
}

export default connect(mapStateToProps)(AuthComponent);