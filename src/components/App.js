/*	
 * 	Parent Component, that uses react router to handle navigation around the app
 */
 
import React from "react";
import {Router, Route, Switch} from "react-router-dom";

import Menu from "./Menu";
import Landing from "./Landing";
import Playlists from "./playlists/Playlists";
import PlaylistCreate from "./playlists/PlaylistCreate";
import PlaylistShow from "./playlists/PlaylistShow";
import PlaylistEdit from "./playlists/PlaylistEdit";
import TracksCreate from "./tracks/TracksCreate";
import history from "../history";

const App = () => {
	return(
		<div className="ui container">
			<Router history={history}>
				<div>
					<Menu/>
					<Switch>
						<Route path="/" exact component={Landing}/>
						<Route path="/playlists" exact component={(props) => <Playlists {...props} collab={false} />}/>
						<Route path="/playlists/new" exact component={PlaylistCreate}/>
						<Route path="/playlists/:id" exact component={PlaylistShow}/>
						<Route path="/playlists/:id/edit" exact component={PlaylistEdit}/>
						<Route path="/playlists/:id/tracks/new" exact component={TracksCreate}/>
						<Route path="/collabplaylists" exact component={(props) => <Playlists {...props} collab={true} />}/>
					</Switch>
				</div>
			</Router>
		</div>
	);
};

export default App;