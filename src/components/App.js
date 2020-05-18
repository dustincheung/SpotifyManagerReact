/*	
 * 	Parent Component, that handles page navigation routing
 */
import React from "react";
import {Router, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";

import {getCurrUser} from "../actions";
import Menu from "./Menu";
import Landing from "./Landing"
import Playlists from "./playlists/Playlists"
import PlaylistShow from "./playlists/PlaylistShow"
import history from "../history";

class App extends React.Component {

	componentDidMount(){
		this.props.getCurrUser();
	}

	render(){
		return(
			<div className="ui container">
				<Router history={history}>
					<div>
						<Menu/>
						<Switch>
							<Route path="/" exact component={Landing}/>
							<Route path="/playlists" exact component={Playlists}/>
							<Route path="/playlists/:id" exact component={PlaylistShow}/>
						</Switch>
					</div>
				</Router>
			</div>
		);
	}
};

export default connect(null,{getCurrUser})(App);