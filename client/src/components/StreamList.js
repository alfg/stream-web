import React from 'react'
import './StreamList.css';

export default class extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render () {
    console.log(this.props);
    const streamItems = this.props.streams.map((v, i, arr) => {
      return (
        <StreamItem key={i} />
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
  render () {
    return (
        <div>
          <a className="Playlist four columns" href="#">
            <div className="PlaylistItem">
              <img src="http://placehold.it/200x200" />
              <h5>Stream One</h5>
            </div>
          </a>
        </div>
    )
  }
}
