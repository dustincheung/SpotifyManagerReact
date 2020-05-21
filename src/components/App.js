/*	
 * 	Parent Component, that handles page navigation routing
 */
import React from "react";
import {Router, Route, Switch} from "react-router-dom";

import Menu from "./Menu";
import Landing from "./Landing";
import Playlists from "./playlists/Playlists";
import PlaylistCreate from "./playlists/PlaylistCreate";
import PlaylistShow from "./playlists/PlaylistShow";
import history from "../history";

const App = () => {
	return(
		<div className="ui container">
			<Router history={history}>
				<div>
					<Menu/>
					<Switch>
						<Route path="/" exact component={Landing}/>
						<Route path="/playlists" exact component={Playlists}/>
						<Route path="/playlists/new" excact component={PlaylistCreate}/>
						<Route path="/playlists/:id" exact component={PlaylistShow}/>
					</Switch>
				</div>
			</Router>
		</div>
	);
};

export default App;