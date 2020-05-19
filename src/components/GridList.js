import React from "react";
import { Card, Icon, Image } from 'semantic-ui-react';

import history from "../history";

class GridList extends React.Component{
  render(){
    let playlists = this.props.playlists;
    return (
      <Card.Group itemsPerRow={4}>
       {playlists.map((playlist) =>
          <Card key={playlist.id} className="ui raised card" onClick={() => history.push("/playlists/" + playlist.id)}>
            <Image src={playlist.images[0].url} wrapped ui={false} />
            <Card.Content>
              <Card.Header>{playlist.name}</Card.Header>
              <Card.Meta>
                <span className='date'>{playlist.tracks.total} tracks</span>
              </Card.Meta>
              <Card.Description>
                This is a {playlist.public ? "public" : "private"} playlist created by {playlist.owner.display_name}.
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Icon name='trash alternate'/>
            </Card.Content>
          </Card>
        )} 
      </Card.Group>
    );
  }
}

export default GridList;    