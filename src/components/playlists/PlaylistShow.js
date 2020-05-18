import React from "react";
import {connect} from "react-redux";
import { Card, Icon, Image } from 'semantic-ui-react'

class PlaylistShow extends React.Component{
	componentDidMount(){	
													
	}

	render(){
		return(
			<Card>
    			<Image src={this.props.playlist.images[0].url} wrapped ui={false} />
    			<Card.Content>
      				<Card.Header>{this.props.playlist.name}</Card.Header>
      				<Card.Meta>
        				<span className='date'>{this.props.playlist.tracks.total} tracks</span>
      				</Card.Meta>
      				<Card.Description>
        				This is a {this.props.playlist.public ? "public" : "private"} playlist created by {this.props.playlist.owner.display_name}.
      				</Card.Description>
    				</Card.Content>
   			 		<Card.Content extra>
      					<a>
        					<Icon name='trash alternate'/>
        					Delete this playlist
      					</a>
    			</Card.Content>
  			</Card>
		);
	}
}

function search(idKey, array){
	for(var i = 0; i < array.length; i++){
		if(array[i].id === idKey){
			return array[i];
		}
	}
}

function mapStateToProps(state, ownProps){
	const currPlaylist = search(ownProps.match.params.id, state.playlists);
	return {playlist: currPlaylist}
}

export default connect(mapStateToProps)(PlaylistShow);