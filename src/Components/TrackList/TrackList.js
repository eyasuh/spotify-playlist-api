import React from 'react';
import Track from '../Track/Track';
import './TrackList.css';

class TrackList extends React.Component {
    render() {
        let track = this.props.tracks.map(track => {
            return <Track
                track={track}
                key={track.id}
                onAdd={this.props.onAdd}
                isRemoval={this.props.isRemoval}
                onRemove={this.props.onRemove}
            /> 
        });
        return (
            <div className="TrackList">
                {/* <!-- You will add a map method that renders a set of Track components  --> */}
                {track}
            </div>
        );
    }
}

export default TrackList; 