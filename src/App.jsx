import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Profile from './Profile';
import Gallery from './Gallery';


class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            query: '',
            artist: null,
            tracks: null
        }
    }

    search(){
        const baseUrl = 'https://api.spotify.com/v1/search?';
        const topTracksUrl = 'https://api.spotify.com/v1/artists';
        const accesToken = '';
        let fetchUrl = `${baseUrl}q=${this.state.query}&type=artist&limit=1`;

        fetch(fetchUrl, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accesToken
            }
        })
        .then(response => response.json())
        .then(json => {
            const artist = json.artists.items[0];
            fetchUrl = `${topTracksUrl}/${artist.id}/top-tracks?country=AR&`;

            fetch(fetchUrl, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + accesToken
                }
            })
            .then(response => response.json())
            .then(json => {
                const { tracks } = json;
                this.setState({tracks});
                this.setState({artist});
            })
        })
    }

    render(){
        return(
            <div className="App">
                <div className="App-title">Music Master</div>
                <FormGroup>
                    <InputGroup>
                        <FormControl
                            type="text"
                            placeholder="Search for an Artist"
                            value={this.state.query}
                            onChange={event => {this.setState({query: event.target.value})}}
                            onKeyPress={event => {
                                if(event.key === 'Enter')this.search();
                            }}
                        />
                        <InputGroup.Addon onClick={() => this.search()}>
                            <Glyphicon glyph="search"></Glyphicon>
                        </InputGroup.Addon>
                    </InputGroup>
                </FormGroup>
                {
                    this.state.artist !== null
                    ?   <div>
                            <Profile
                                artist={this.state.artist}
                            />
                            <Gallery
                                tracks = {this.state.tracks}
                            />
                        </div>
                    :   <div></div>
                }
            </div>
        )
    }
}

export default App;