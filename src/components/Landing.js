/*	
 * 	Landing Page Component, functional component that displays title text  
 *  and has anchor tag that kicks off OAuth backend flow
 */

import React from "react";

const Landing = () => {
	const uri = process.env.REACT_APP_BACKEND_URI || 'http://localhost:5000';
	const loginPath = uri + "/login";
	
	return(
		<div>
			<h1 className="display-4" style={{fontSize: "7em", textAlign: "center", marginTop: "1.5em"}}>SpotifyManager</h1>
    		<p className="lead" style={{fontSize: "1.5em", textAlign: "center"}}>A place to manage, share, and collaborate on your playlists.</p>
			<div style={{textAlign: "center"}}>
				<a className="ui vertical animated button" href={loginPath}> 
					<div className="hidden content">
  						right this way!
  					</div>
  					<div className="visible content">
    					sign into spotify 
  					</div>
				</a>
			</div>
		</div>	
	);
}

export default Landing;