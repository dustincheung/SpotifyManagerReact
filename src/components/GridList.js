import React from "react";
import { Grid, Image, Button, Card } from 'semantic-ui-react'
import {Link} from "react-router-dom";

class GridList extends React.Component{
  render(){
    let playlists = this.props.playlists;
    return (
        <Grid columns={3} divided>
          <Grid.Row>
            {playlists.map((playlist) =>
              <Grid.Column key={playlist.id}>
                <Card>
                  <Card.Content>
                    <Image
                      floated='right'
                      size='small'
                      src={playlist.images[0].url}
                    />
                    <h4>{playlist.name}</h4>
                    <Card.Meta>{playlist.tracks.total} tracks</Card.Meta>
                    <Card.Description>
                      {playlists.description}
                    </Card.Description>
                    <div className='ui two buttons'>
                      <Link className="ui button primary" to={"/playlists/" + playlist.id}>
                        Details
                      </Link>
                      <Button basic color='red'>
                        Delete
                      </Button>
                    </div>
                  </Card.Content>
                </Card>          
              </Grid.Column>
            )} 
          </Grid.Row>
        </Grid>
    );
  }
}

export default GridList;