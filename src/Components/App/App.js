import React from 'react';
import './App.css';
import SearchBar from "../SearchBar/SearchBar";
import Playlist from '../Playlist/Playlist';
import SearchResults from '../SearchResults/SearchResults';

import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        // {
        //   name: 'name',
        //   artist: 'artist',
        //   album: 'album',
        //   id: 1
        // },
        // {
        //   name: 'name2',
        //   artist: 'artist2',
        //   album: 'album2',
        //   id: 2
        // },
        // {
        //   name: 'name3',
        //   artist: 'artist3',
        //   album: 'album3',
        //   id: 3
        // }
      ],
      playlistName: 'My Playlist',
      playlistTracks: [
        // {
        //   name: 'name',
        //   artist: 'artist',
        //   album: 'album',
        //   id: 4
        // },
        // {
        //   name: 'name',
        //   artist: 'artist',
        //   album: 'album',
        //   id: 5
        // }
      ]
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    tracks.push(track);
    this.setState({ playlistTracks: tracks });
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    let newSetOfTracks = tracks.filter(filteredTrack => filteredTrack.id !== track.id);

    this.setState({ playlistTracks: newSetOfTracks });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  savePlaylist() {
    let trackUris = this.state.playlistTracks.map(track => track.uri);
    // console.log(trackUris);
    let newPlaylistName = this.state.playlistName;
    Spotify.savePlayList(this.state.playlistName, trackUris).then(() => {
      this.setState({
        playlistName: newPlaylistName,
        playlistTracks: []
      })
    })
  }

  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({ searchResults: searchResults })
    })
  }

  render() {
    return (
      <div>
        <h1>Sup<span className="highlight">erSo</span>aker</h1>
        <div className="App">
          {/*<!-- Add a SearchBar component -->*/}
          <SearchBar onSearch={this.search} />

          <div className="App-playlist">
            {/* <!-- Add a SearchResults component --> */}
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            {/* <!-- Add a Playlist component --> */}
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              removeTrack={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
