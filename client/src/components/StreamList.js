import React from 'react';
import { Link } from 'react-router';
import './StreamList.css';

export default class extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render () {
    const streamItems = this.props.streams.map((v, i, arr) => {
      console.log(v);
      return (
        <StreamItem key={i} {...v} />
      )
    });

    return (
      <div className="Content twelve columns">
        {streamItems}
      </div>
    )
  }
}

class StreamItem extends React.Component {

  fallbackImage(e) {
    e.target.src = 'http://placehold.it/320x180?text=No+Preview'
  }

  render () {
    const { title, stream_name, thumbnail } = this.props;
    return (
        <div>
          <Link className="Playlist four columns" to={`/live/${stream_name}`}>
            <div className="PlaylistItem">
              <img src={thumbnail} onError={this.fallbackImage} />
              <h5>{title}</h5>
            </div>
          </Link>
        </div>
    )
  }
}
